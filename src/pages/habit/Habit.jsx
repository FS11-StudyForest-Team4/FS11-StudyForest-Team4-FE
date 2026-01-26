import React, { useEffect, useState } from 'react';
import './Habit.css';

function Habit() {
  //현재 시간을 저장하는 state
  const [now, setNow] = useState(new Date());

  //시계
  useEffect(() => {
    const clock = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  //시계모양
  const timeString = now
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/\. /g, '-')
    .replace(/\./g, '');

  // 나중에 습관 목록을 새로 만들기
  const [habits, setHabits] = useState([
    { id: 1, name: '미라클모닝 6시 기상', completed: true },
    { id: 2, name: '아침 챙겨 먹기', completed: true },
    { id: 3, name: 'React 스터디 책 1챕터 읽기', completed: false },
    { id: 4, name: '스트레칭', completed: false },
  ]);

  return (
    <div className="habit-page">
      <header className="habit-header">
        <h1>연우의 개발공장</h1>
        <div className="time-box">
          <p className="time-label">현재 시간</p>
          <div className="time-display">{timeString}</div>
        </div>
      </header>

      <main className="habit-container">
        <div className="habit-list-card">
          <div className="list-header">
            <h2>오늘의 습관</h2>
            <button className="edit-link">목록 수정</button>
          </div>

          <div className="habit-list">
            {habits.map((habit) => (
              <button
                key={habit.id}
                className={`habit-item ${habit.completed ? 'completed' : ''}`}
              >
                {habit.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Habit;
