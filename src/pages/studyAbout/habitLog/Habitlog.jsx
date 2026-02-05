import { Fragment, useEffect, useState, useMemo } from 'react';

import styles from './Habitlog.module.css';
import { habitlogService, habitService } from '@/api/';
import {
  stickerEmpty,
  sticker01,
  sticker02,
  sticker03,
  sticker04,
  sticker05,
  sticker06,
  sticker07,
  sticker08,
  sticker09,
  sticker10,
  sticker11,
  sticker12,
  sticker13,
  sticker14,
  sticker15,
  sticker16,
  sticker17,
  sticker18,
} from '@/assets/icons/stickers';
import { getStartOfWeek } from '@/utils/getStartOfweek';
import { Spinner } from '@/components';

function Habitlog(props) {
  const { studyId } = props;
  const [habits, setHabits] = useState([]); // 습관목록
  const [habitlogs, setHabitlogs] = useState([]); // 습관기록
  const startOfWeek = useMemo(() => getStartOfWeek(), []); // 오늘날짜로 이번주 첫날

  useEffect(() => {
    if (!studyId && !startOfWeek) return;

    const fetchData = async () => {
      try {
        const [habiList, habitlogList] = await Promise.all([
          habitService.getHabitList(studyId),
          habitlogService.getHabitlogs(studyId, startOfWeek),
        ]);
        setHabits(habiList);
        setHabitlogs(habitlogList);
      } catch (error) {
        console.error('fetchData Error:', error);
      }
    };
    fetchData();
  }, [studyId, startOfWeek]);

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const rowStickers = [
    sticker01,
    sticker02,
    sticker03,
    sticker04,
    sticker05,
    sticker06,
    sticker07,
    sticker08,
    sticker09,
    sticker10,
    sticker11,
    sticker12,
    sticker13,
    sticker14,
    sticker15,
    sticker16,
    sticker17,
    sticker18,
  ];

  const habitlogsWithWeek =
    habitlogs &&
    habitlogs.reduce((acc, cur) => {
      const dayIndex = new Date(cur.createdAt).getDay(); // 요일 구하기
      const day = days[(dayIndex + 6) % 7]; // 월요일 시작
      const habitId = cur.habitId;

      // habitId가 acc에 없으면 생성
      if (!acc[habitId]) {
        acc[habitId] = {};
      }

      acc[habitId][day] = true;
      return acc;
    }, {});

  if (!studyId && !startOfWeek) {
    <Spinner />;
    return;
  }

  return (
    <section className={styles.habitList}>
      <h2>습관기록표</h2>
      {habits.length === 0 ? (
        <p className={styles.emptyMessage}>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </p>
      ) : (
        <div className={styles.habitlogGrid}>
          <div></div>
          {days.map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
          {habits.map((habit, rowIndex) => (
            //하나로 묶고 그리드 깨짐방지 key 중요
            <Fragment key={habit.id}>
              <div className={styles.habitName}>{habit.name}</div>
              {days.map((day) => (
                <div key={day} className={styles.habitlogCell}>
                  {habitlogsWithWeek[habit.id]?.[day] ? (
                    <img
                      src={rowStickers[rowIndex]}
                      alt="습관완료"
                      width={36}
                    />
                  ) : (
                    <img src={stickerEmpty} alt="습관미완료" width={36} />
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

export default Habitlog;
