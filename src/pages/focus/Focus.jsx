import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Focus.module.css';
import pause_ic from '#assets/images/focus_img/pause_ic.png';
import play_ic from '#assets/images/focus_img/play_ic.png';
import reset_ic from '#assets/images/focus_img/reset_ic.png';
import stop_ic from '#assets/images/focus_img/stop_ic.png';
import timer_ic from '#assets/images/focus_img/timer_ic.png';
import { getFocus, createFocus, completeFocus } from '@/api/focusService';
import { useLocation } from 'react-router';

const START_TIME = 20; // 테스트를 위하여 20초로 설정했습니다. 이후 25*60으로 바꾸면 25분으로 설정됩니다.

function setTimeFormat(seconds) {
  const sign = seconds < 0 ? '-' : '';
  const abs = Math.abs(seconds);

  const mm = String(Math.floor(abs / 60)).padStart(2, '0');
  const ss = String(abs % 60).padStart(2, '0');

  return `${sign}${mm}:${ss}`;
}

const Focus = () => {
  const location = useLocation();
  const studyId = location.state?.studyId; // 테스트용
  const [timeLeft, setTimeLeft] = useState(START_TIME); // 초 단위 (0 밑으로도 내려감)
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const isOver = timeLeft <= 0;

  useEffect(() => {
    if (!isRunning) return; // 작동 x -> 종료
    if (isPaused) return; // 일시정지 o -> 종료

    const time = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [isRunning, isPaused]); // isRunning, isPaused 상태 바뀔때 동작

  // 시간 끝나고 세션 완료하면 complete 호출
  useEffect(() => {
    if (!isOver) return;
    if (!focusId) return;

    const fetchData = async () => {
      try {
        await completeFocus(focusId);
        console.log('세션이 완료되었습니다!');
        toast('🎉 50포인트를 획득했습니다!', {
          className: styles['toastCompleted'],
        });
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchData();
  }, [isOver, focusId]);

  // 일시정지 버튼
  useEffect(() => {
    if (isPaused) {
      toast('🚨 집중이 중단되었습니다.', { className: styles['toastPaused'] });
    } else {
      toast.dismiss();
    }
  }, [isPaused]);

  // start 버튼
  const handleStart = async () => {
    try {
      const data = await createFocus(studyId);
      setFocusId(data.id);
      setIsRunning(true);
      setIsPaused(false);
    } catch (error) {
      console.error('error: ', error);
    }
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
    <div className={styles.timerWrapper}>
      <p className={styles.timerTitle}>오늘의 집중</p>
      {isRunning || isOver ? (
        <div className={styles.startTimeTagWrapper}>
          <div className={styles.startTimeTag}>
            <img
              className={styles.timerIcon}
              src={timer_ic}
              alt="timer_icon.png"
            />
            <div className={styles.startTimeTagTime}>
              {setTimeFormat(START_TIME)}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.startTimeTagWrapperPlaceholder}>
          <div className={styles.startTimeTagPlaceholder}>
            <div className={styles.startTimeTagTime}>
              {setTimeFormat(START_TIME)}
            </div>
          </div>
        </div>
      )}
      <div
        className={`${styles.timer} ${timeLeft < 0 ? styles.timeOver : timeLeft <= 10 ? styles.timeWarning : ''}`}
      >
        {setTimeFormat(timeLeft)}
      </div>

      <div className={styles.timerButtonWrapper}>
        <button
          type="button"
          className={`${styles.timerPauseButton} ${
            !(isRunning && !isOver) ? styles.hidden : ''
          }`}
          onClick={handlePause}
        >
          <img className={styles.pauseIcon} src={pause_ic} />
        </button>

        <button
          type="button"
          className={styles.timerStartButton}
          disabled={isRunning && !isOver}
          onClick={isOver ? handleStop : handleStart}
        >
          {isOver ? (
            <>
              <img
                className={styles.imgStopIcon}
                src={stop_ic}
                alt="stop_icon.png"
              />
              <p>Stop</p>
            </>
          ) : (
            <>
              <img
                className={styles.imgPlayIcon}
                src={play_ic}
                alt="play_icon.png"
              />
              <p>Start!</p>
            </>
          )}
        </button>

        <button
          type="button"
          className={`${styles.timerResetButton} ${
            !(isRunning && !isOver) ? styles.hidden : ''
          }`}
          onClick={handleReset}
        >
          <img className={styles.resetIcon} src={reset_ic} />
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
