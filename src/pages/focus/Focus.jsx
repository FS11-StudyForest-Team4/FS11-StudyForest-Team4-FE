import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Focus.module.css';
import pause_ic from './pause_ic.png';
import reset_ic from './reset_ic.png';

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
    toast('🎉 50포인트를 획득했습니다!');
  }, [isOver]);

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
    toast('🚨 집중이 중단되었습니다.');
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
      <div
        className={`${styles.timer} ${timeLeft < 0 ? styles.timeOver : timeLeft <= 10 ? styles.timeWarning : ''}`}
      >
        {setTimeFormat(timeLeft)}
      </div>

      <div className={styles.timerButtonWrapper}>
        {isRunning && !isOver ? (
          <>
            <button
              type="button"
              className={styles.timerPauseButton}
              onClick={handlePause}
            >
              <img className={styles.pauseIcon} src={pause_ic} />
            </button>
          </>
        ) : (
          <div className={styles.timerButtonPlaceholder} />
        )}
        <button
          type="button"
          className={styles.timerStartButton}
          disabled={isRunning && !isOver}
          onClick={isOver ? handleStop : handleStart}
        >
          {isOver ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <circle
                  cx="17.6004"
                  cy="17.6002"
                  r="13.86"
                  stroke="white"
                  stroke-width="3.08"
                />
                <rect
                  x="12"
                  y="12"
                  width="11"
                  height="11"
                  rx="3"
                  fill="white"
                />
              </svg>{' '}
              <p>Stop</p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M32.9409 19.5194C34.6258 20.4017 34.6258 22.8134 32.9409 23.6957L15.04 33.0694C13.4706 33.8913 11.5894 32.7529 11.5894 30.9812L11.5894 12.2339C11.5894 10.4623 13.4706 9.32387 15.04 10.1457L32.9409 19.5194Z"
                  fill="white"
                />
              </svg>
              <p>Start!</p>
            </>
          )}
        </button>

        {isRunning && !isOver ? (
          <button
            type="button"
            className={styles.timerResetButton}
            onClick={handleReset}
          >
            <img className={styles.resetIcon} src={reset_ic} />
          </button>
        ) : (
          <div className={styles.timerButtonPlaceholder} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Focus;
