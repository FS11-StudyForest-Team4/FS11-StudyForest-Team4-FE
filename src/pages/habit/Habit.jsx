import React, { useEffect, useState } from 'react';
import styles from './habit.module.css';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ONE_MINUTE_MS = 60 * 1000;

function Habit() {
  //현재 시간을 저장하는 state
  const [now, setNow] = useState(new Date());

  //시계
  useEffect(() => {
    const clock = setInterval(() => {
      setNow(new Date());
    }, ONE_MINUTE_MS); //1000(1초)에서 60000(1분)으로 변경, 매직넘버 대신 상수 사용

    return () => clearInterval(clock);
  }, []);

  //시계모양
  const timeString = dayjs(now).format('YYYY-MM-DD A hh:mm'); //dayjs 사용

  // 나중에 습관 목록을 새로 만들기
  const [habits, setHabits] = useState([
    { id: 1, name: '미라클모닝 6시 기상', completed: true },
    { id: 2, name: '아침 챙겨 먹기', completed: true },
    { id: 3, name: 'React 스터디 책 1챕터 읽기', completed: false },
    { id: 4, name: '스트레칭', completed: false },
    { id: 5, name: '영양제 챙겨 먹기', completed: false },
    { id: 6, name: '사이드 프로젝트', completed: false },
    { id: 7, name: '물 2L 먹기', completed: false },
  ]);

  return (
    <div className={styles.habitPage}>
      {' '}
      {/* css modules 사용*/}
      {/* 메인 컨텐츠 박스 */}
      {/* frame 2609450 */}
      <div className={styles.mainWrapper}>
        {/* frame 26094508 */}
        <header className={styles.habitTopSection}>
          <div className={styles.headerTop}>
            {/* frame 2609451 */}
            <div className={styles.headerTopRow}>
              <h1>
                <span className={styles.nickname}>연우</span>의 개발공장
              </h1>
              {/* Frame 2609450 */}
              <div className={styles.btnGroup}>
                {/* Frame 2609447 */}
                <button className={styles.headerTopBtnToday}>
                  오늘의 집중
                  <img
                    src="src/assets/images/arrow Vector.png"
                    alt=""
                    className={styles.iconArrow}
                  />
                </button>
                {/* Frame 2609447 */}
                <button className={styles.headerTopBtnHome}>
                  홈{' '}
                  <img
                    src="src/assets/images/arrow Vector.png"
                    alt=""
                    className={styles.iconArrow}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* frame 2609455 */}
          <div className={styles.timeBox}>
            <p className={styles.timeLabel}>현재 시간</p>
            <div className={styles.timeDisplay}>{timeString}</div>
          </div>
        </header>

        {/* frame 2609478 */}
        <main className={styles.habitListCard}>
          {/* group33608 */}
          <div className={styles.listHeader}>
            <h2>오늘의 습관</h2>
            <button className={styles.editLink}>목록 수정</button>
          </div>

          {/* frame 2609498 */}
          <div className={styles.habitList}>
            {habits.map((habit) => (
              <button
                key={habit.id}
                className={clsx(
                  styles.habitItem,
                  habit.completed && styles.completed,
                )}
              >
                {' '}
                {/* 레이어: chip */}
                {habit.name}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Habit;
