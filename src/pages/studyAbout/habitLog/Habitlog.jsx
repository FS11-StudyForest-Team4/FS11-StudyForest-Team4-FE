import styles from './Habitlog.module.css';

// 이번주 날짜 확인 및 요청 util 만들어서 설정하기
// return  { startDate, endDate } // 월요일부터 일요일로 설정
// 줄마다 다른 image 넣기 로직 구현

function Habitlog() {
  const habits = [
    //GET study/habits에서 데이터 받기
    { id: 1, name: '미라클모닝' },
    { id: 2, name: '아침먹기' },
    { id: 3, name: '스트레칭' },
  ];

  const history = [
    // 받아올 데이터 (데이터 받을때 한 주꺼만 받기 )
    { habitId: 1, createdAt: '2026-01-27', isDeleted: false },
    { habitId: 2, createdAt: '2026-01-27', isDeleted: true },
    { habitId: 4, createdAt: '2026-01-27', isDeleted: true },
  ];

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const historyWithWeek = history
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
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td>{habit.name}</td>
              {days.map((day) => (
                <td key={day}>
                  {historyWithWeek[habit.id]?.[day] ? 'O' : 'X'}
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
