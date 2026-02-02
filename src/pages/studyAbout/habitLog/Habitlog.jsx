import { useEffect, useState } from 'react';
import styles from './Habitlog.module.css';
import { getHabitList } from '@/api/habitService';
import { getHabitlogs } from '@/api/habitlogService';
import { getStartOfweek } from '@/utils/getStartOfweek';
import stickerEmpty from '@/assets/icons/stickers/sticker_empty.svg';
import stiker01 from '@/assets/icons/stickers/sticker_light_green_01.svg';
import stiker02 from '@/assets/icons/stickers/sticker_light_green_02.svg';
import stiker03 from '@/assets/icons/stickers/sticker_light_green_03.svg';
import stiker04 from '@/assets/icons/stickers/sticker_light_mint_04.svg';
import stiker05 from '@/assets/icons/stickers/sticker_light_mint_05.svg';
import stiker06 from '@/assets/icons/stickers/sticker_green_06.svg';
import stiker07 from '@/assets/icons/stickers/sticker_blue_07.svg';
import stiker08 from '@/assets/icons/stickers/sticker_blue_08.svg';
import stiker09 from '@/assets/icons/stickers/sticker_blue_09.svg';
import stiker10 from '@/assets/icons/stickers/sticker_purple_10.svg';
import stiker11 from '@/assets/icons/stickers/sticker_purple_11.svg';
import stiker12 from '@/assets/icons/stickers/sticker_purple_12.svg';
import stiker13 from '@/assets/icons/stickers/sticker_yellow_13.svg';
import stiker14 from '@/assets/icons/stickers/sticker_yellow_14.svg';
import stiker15 from '@/assets/icons/stickers/sticker_yellow_15.svg';
import stiker16 from '@/assets/icons/stickers/sticker_pink_16.svg';
import stiker17 from '@/assets/icons/stickers/sticker_pink_17.svg';
import stiker18 from '@/assets/icons/stickers/sticker_pink_18.svg';
import styles from './Habitlog.module.css';

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
    stiker01,
    stiker02,
    stiker03,
    stiker04,
    stiker05,
    stiker06,
    stiker07,
    stiker08,
    stiker09,
    stiker10,
    stiker11,
    stiker12,
    stiker13,
    stiker14,
    stiker15,
    stiker16,
    stiker17,
    stiker18,
  ];

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const historyWithWeek = habitlog
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
