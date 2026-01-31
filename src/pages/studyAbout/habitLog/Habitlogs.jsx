import { useEffect, useState } from 'react';
import styles from './Habitlog.module.css';
import { getHabitList } from '@/api/habitService';
import { getHabitlogs } from '@/api/habitlogService';
import { getStartOfweek } from '@/utils/getStartOfweek';
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
} from '@/assets/icons/stickers/index';

// 이번주 날짜 확인 및 요청 util 만들어서 설정하기
// return  { startDate, endDate } // 월요일부터 일요일로 설정
// 줄마다 다른 image 넣기 로직 구현

function Habitlog() {
  const studyId = '01KG6V43DV6F8YGRN8AZ6J7XVQ';

  const [habits, setHabits] = useState([]);
  const [habitlogs, setHabitlogs] = useState([]);
  const startOfWeek = getStartOfweek();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habiList, habitlogList] = await Promise.all([
          getHabitList(studyId),
          getHabitlogs(studyId, startOfWeek),
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

  const habitlogsWithWeek = habitlogs
    .filter((h) => !h.isDeleted) // 데이터 가져올때 아예 안가져오는걸로
    .reduce((acc, cur) => {
      const dayIndex = new Date(cur.createdAt).getDay();
      const day = days[(dayIndex + 6) % 7];
      const habitId = cur.habitId;

      if (!acc[habitId]) {
        acc[habitId] = {};
      }

      acc[habitId][day] = true;
      return acc;
    }, {});

  return (
    <section className={styles['habit-list']}>
      <h2>습관기록표</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, rowIndex) => (
            <tr key={habit.id}>
              <td>{habit.name}</td>
              {days.map((day) => (
                <td key={day}>
                  {habitlogsWithWeek[habit.id]?.[day] ? (
                    <img
                      src={rowStickers[rowIndex]}
                      alt="습관완료"
                      width={36}
                    />
                  ) : (
                    <img src={stickerEmpty} alt="습관미완료" width={36} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
// O에서 줄마다 색이 다르게 나타내야 함
//<img src={`/img`}

export default Habitlog;
