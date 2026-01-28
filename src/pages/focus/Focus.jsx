import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Focus.module.css';
import pause_ic from '#assets/images/focus_img/pause_ic.png';
import play_ic from '#assets/images/focus_img/play_ic.png';
import reset_ic from '#assets/images/focus_img/reset_ic.png';
import stop_ic from '#assets/images/focus_img/stop_ic.png';
import timer_ic from '#assets/images/focus_img/timer_ic.png';

const START_TIME = 20; // 테스트를 위하여 20초로 설정했습니다. 이후 25*60으로 바꾸면 25분으로 설정됩니다.

function setTimeFormat(seconds) {
  const sign = seconds < 0 ? '-' : '';
  const abs = Math.abs(seconds);

  const mm = String(Math.floor(abs / 60)).padStart(2, '0');
  const ss = String(abs % 60).padStart(2, '0');

  return `${sign}${mm}:${ss}`;
}

const Focus = () => {
  const [timeLeft, setTimeLeft] = useState(START_TIME); // 초 단위 (0 밑으로도 내려감)
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isOver = timeLeft <= 0;

  useEffect(() => {
    if (!isRunning) return; // 작동 x -> 종료
    if (isPaused) return; // 일시정지 o -> 종료

    const time = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [isRunning, isPaused]); // isRunning, isPaused 상태 바뀔때 동작

  useEffect(() => {
    if (!isOver) return;

    console.log('세션이 완료되었습니다!');
    toast('🎉 50포인트를 획득했습니다!', {
      className: styles['toast-completed'],
    });
  }, [isOver]);

  useEffect(() => {
    if (isPaused) {
      toast('🚨 집중이 중단되었습니다.', { className: styles['toast-paused'] });
    } else {
      toast.dismiss();
    }
  }, [isPaused]);

  const handleStart = () => {
    // start 버튼
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    // stop 버튼
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(START_TIME);
  };

  const handlePause = () => {
    // pause 버튼
    //setIsPaused((prev) => !prev); 누르면 일시정지 <-> 재개
    setIsPaused(true);
  };

  const handleReset = () => {
    // reset 버튼
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(START_TIME);
  };

  return (
    <div className={styles['timer-wrapper']}>
      <p className={styles['timer-title']}>오늘의 집중</p>
      {isRunning || isOver ? (
        <div className={styles['start-time-tag-wrapper']}>
          <div className={styles['start-time-tag']}>
            <img
              className={styles['timer-icon']}
              src={timer_ic}
              alt="timer_icon.png"
            />
            <div className={styles['start-time-tag-time']}>
              {setTimeFormat(START_TIME)}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['start-time-tag-wrapper-placeholder']}>
          <div className={styles['start-time-tag-placeholder']}>
            <div className={styles['start-time-tag-time']}>
              {setTimeFormat(START_TIME)}
            </div>
          </div>
        </div>
      )}
      <div
        className={`${styles.timer} ${timeLeft < 0 ? styles['time-over'] : timeLeft <= 10 ? styles['time-warning'] : ''}`}
      >
        {setTimeFormat(timeLeft)}
      </div>

      <div className={styles['timer-button-wrapper']}>
        <button
          type="button"
          className={`${styles['timer-pause-button']} ${
            !(isRunning && !isOver) ? styles['hidden'] : ''
          }`}
          onClick={handlePause}
        >
          <img className={styles['pause-icon']} src={pause_ic} />
        </button>

        <button
          type="button"
          className={styles['timer-start-button']}
          disabled={isRunning && !isOver}
          onClick={isOver ? handleStop : handleStart}
        >
          {isOver ? (
            <>
              <img
                className={styles['img-stop-icon']}
                src={stop_ic}
                alt="stop_icon.png"
              />
              <p>Stop</p>
            </>
          ) : (
            <>
              <img
                className={styles['img-play-icon']}
                src={play_ic}
                alt="play_icon.png"
              />
              <p>Start!</p>
            </>
          )}
        </button>

        <button
          type="button"
          className={`${styles['timer-reset-button']} ${
            !(isRunning && !isOver) ? styles['hidden'] : ''
          }`}
          onClick={handleReset}
        >
          <img className={styles['reset-icon']} src={reset_ic} />
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        closeOnClick={false}
        closeButton={false}
      />
    </div>
  );
};

export default Focus;
