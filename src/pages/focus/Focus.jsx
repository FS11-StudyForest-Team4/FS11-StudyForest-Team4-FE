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
    toast('🎉 50포인트를 획득했습니다!', {
      className: styles['toast-completed'],
    });
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
    toast('🚨 집중이 중단되었습니다.', { className: styles['toast-paused'] });
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
        <div className={styles['start-time-tag']}>
          <svg
            className={styles['start-time-tag-icon']}
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.10323 10.5749C2.10323 6.63984 5.2932 3.44987 9.22823 3.44987C13.1633 3.44987 16.3532 6.63984 16.3532 10.5749C16.3532 14.5099 13.1633 17.6999 9.22823 17.6999C5.2932 17.6999 2.10323 14.5099 2.10323 10.5749ZM3.29073 10.5749C3.29073 13.8541 5.94904 16.5124 9.22823 16.5124C10.803 16.5124 12.3132 15.8868 13.4267 14.7733C14.5402 13.6598 15.1657 12.1496 15.1657 10.5749C15.1657 7.29567 12.5074 4.63737 9.22823 4.63737C5.94904 4.63737 3.29073 7.29567 3.29073 10.5749Z"
              fill="#414141"
            />
            <path
              d="M7.36782 7.55862C7.13387 7.34062 6.76931 7.34706 6.5432 7.57316C6.31709 7.79927 6.31066 8.16384 6.52865 8.39778L8.63448 10.5036V13.7415C8.63448 14.0695 8.90031 14.3353 9.22823 14.3353C9.55615 14.3353 9.82198 14.0695 9.82198 13.7415V10.2582C9.82185 10.1008 9.7592 9.94986 9.64782 9.83862L7.36782 7.55862Z"
              fill="#414141"
            />
            <path
              d="M16.7728 4.63737C15.7954 3.33389 14.4972 2.30566 13.0045 1.65278C12.8588 1.58675 12.6926 1.58228 12.5436 1.6404C12.3946 1.69852 12.2753 1.8143 12.2128 1.96153C12.1445 2.10692 12.1388 2.274 12.1972 2.42367C12.2555 2.57335 12.3728 2.69248 12.5216 2.7532C13.8254 3.32687 14.9596 4.22659 15.8149 5.3657C15.927 5.51521 16.103 5.6032 16.2899 5.6032C16.4185 5.60378 16.5436 5.56205 16.6462 5.48445C16.778 5.39096 16.8661 5.24776 16.89 5.08789C16.9139 4.92803 16.8716 4.76534 16.7728 4.63737Z"
              fill="#414141"
            />
            <path
              d="M2.63365 5.34987C3.48895 4.21075 4.62314 3.31104 5.92698 2.73737C6.07572 2.67665 6.193 2.55752 6.25138 2.40784C6.30975 2.25816 6.30409 2.09108 6.23573 1.9457C6.17322 1.79847 6.05396 1.68268 5.90494 1.62456C5.75592 1.56645 5.58975 1.57091 5.44407 1.63695C3.95243 2.29542 2.65686 3.32915 1.68365 4.63737C1.51264 4.89228 1.56413 5.23551 1.8024 5.42903C1.9049 5.50663 2.03009 5.54836 2.15865 5.54778C2.33883 5.55741 2.51361 5.48459 2.63365 5.34987Z"
              fill="#414141"
            />
          </svg>
          <div className={styles['start-time-tag-time']}>
            {setTimeFormat(START_TIME)}
          </div>
        </div>
      ) : (
        <div className={styles['start-time-tag-placeholder']}>
          <div className={styles['start-time-tag-time']}>
            {setTimeFormat(START_TIME)}
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
