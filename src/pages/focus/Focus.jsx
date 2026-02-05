import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Focus.module.css';
import pause_ic from '#assets/images/focus_img/pause_ic.png';
import play_ic from '#assets/images/focus_img/play_ic.png';
import reset_ic from '#assets/images/focus_img/reset_ic.png';
import stop_ic from '#assets/images/focus_img/stop_ic.png';
import timer_ic from '#assets/images/focus_img/timer_ic.png';
import { focusService } from '@/api';

const DEFAULT_TIME = 0;
const TO_SECONDS = 60;
const EVERY_TEN_MINUTES = 10;
const DEFAULT_POINT = 3;

function setTimeFormat(seconds) {
  const sign = seconds < 0 ? '-' : '';
  const abs = Math.abs(seconds);

  const mm = String(Math.floor(abs / TO_SECONDS)).padStart(2, '0');
  const ss = String(abs % TO_SECONDS).padStart(2, '0');

  return `${sign}${mm}:${ss}`;
}

const Focus = ({ studyId }) => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME); // 초 단위 (0 밑으로도 내려감)
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [seconds, setSeconds] = useState(DEFAULT_TIME);
  const isOver = timeLeft < 0;

  const minuteOptions = [1, 5, 10, 15, 20, 30, 40, 50, 60];

  useEffect(() => {
    if (!isRunning) return; // 작동 x -> 종료
    if (isPaused) return; // 일시정지 o -> 종료

    const time = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [isRunning, isPaused]); // isRunning, isPaused 상태 바뀔때 동작

  // 포인트 계산 함수
  const calcPoint = (time) => {
    // 실제, 10분마다 +1
    const minutes = Math.floor(time / TO_SECONDS);
    const bonus = Math.floor(minutes / EVERY_TEN_MINUTES);

    // 테스트용, 10초마다 +1
    //const bonus = Math.floor(time / 10);

    return bonus + DEFAULT_POINT;
  };

  // 시간 끝나고 세션 완료하면 complete 호출
  useEffect(() => {
    if (!isOver) return;
    if (!focusId) return;

    const fetchData = async () => {
      try {
        const earnedPoint = calcPoint(seconds);
        await focusService.completeFocus(focusId, earnedPoint);
        console.log('세션이 완료되었습니다!');
        toast(`🎉 ${earnedPoint}포인트를 획득했습니다!`, {
          className: styles['toastCompleted'],
        });
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchData();
  }, [isOver, focusId, seconds]);

  // 일시정지 버튼
  useEffect(() => {
    if (isPaused) {
      toast('🚨 집중이 중단되었습니다.', { className: styles['toastPaused'] });
    } else {
      toast.dismiss();
    }
  }, [isPaused]);

  // 시간 선택 함수
  const handleSeconds = (option) => {
    const minute = Number(option.target.value);
    setMinutes(minute);
    const second = minute * TO_SECONDS;
    setSeconds(second);
    setTimeLeft(second);
    setIsTimePickerOpen(false);
  };

  // start 버튼
  const handleStart = async () => {
    if (seconds <= DEFAULT_TIME) return;
    try {
      const data = await focusService.createFocus(studyId);
      setFocusId(data.id);
      setTimeLeft(seconds);
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
    setTimeLeft(DEFAULT_TIME);
  };

  const handlePause = () => {
    // pause 버튼입니다.
    setIsPaused((prev) => !prev); //누르면 일시정지 <-> 재개
    // setIsPaused(true);
  };

  const handleReset = () => {
    // reset 버튼
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(DEFAULT_TIME);
  };

  return (
    <div className={styles.timerWrapper}>
      <p className={styles.timerTitle}>오늘의 집중</p>
      <div
        className={styles.startTimeTagWrapper}
        onClick={() => {
          if (isRunning) return;
          setIsTimePickerOpen((prev) => !prev);
        }}
      >
        <div className={styles.startTimeTag}>
          <img
            className={styles.timerIcon}
            src={timer_ic}
            alt="timer_icon.png"
          />
          <div className={styles.startTimeTagTime}>
            {setTimeFormat(seconds)}
          </div>
        </div>
        {isTimePickerOpen && !isRunning && (
          <div onClick={(e) => e.stopPropagation()}>
            <select value={minutes} onChange={handleSeconds}>
              <option value={0}>분 선택</option>
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {m}분
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div
        className={`${styles.timer} ${timeLeft < 0 ? styles.timeOver : timeLeft <= 10 && timeLeft > 0 ? styles.timeWarning : ''}`}
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
          disabled={(isRunning && !isOver) || seconds <= 0}
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
