import React, { useEffect, useState } from 'react';
import './Habit.css';


const 0NE_MINUTE_MS = 60*1000;

function Habit() {
  //현재 시간을 저장하는 state
  const [now, setNow] = useState(new Date());

  //시계
  useEffect(() => {
    const clock = setInterval(() => {
      setNow(new Date());
    }, 0NE_MINUTE_MS); //1000(1초)에서 60000(1분)으로 변경, 매직넘버 대신 상수 사용

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
    { id: 5, name: '영양제 챙겨 먹기', completed: false },
    { id: 6, name: '사이드 프로젝트', completed: false },
    { id: 7, name: '물 2L 먹기', completed: false },
  ]);

  return (
    <div className="habit-page">
      {/* 글로벌배너영역 */}
      {/* 레이어 GNB */}
      <nav className="gnb">
        <div className="gnb-inner">
          <div className="logo">공부의 숲</div>
          <div className="gnb-right">
            <button className="gnb-btn">오늘의 집중</button>
            <button className="gnb-btn">홈</button>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 박스 */}
      {/* frame 2609450 */}
      <div className="main-wrapper">
        {/* frame 2609481 */}
        <header className="habit-header-container">
          {/* frame 2609451 */}
          <div className="header-top-row">
            <h1>
              <span className="nickname">연우</span>의 개발공장
            </h1>
          </div>

          {/* frame 2609455 */}
          <div className="time-box">
            <p className="time-label">현재 시간</p>
            <div className="time-display">{timeString}</div>
          </div>
        </header>

        {/* frame 2609478 */}
        <main className="habit-list-card">
          {/* group33608 */}
          <div className="list-header">
            <h2>오늘의 습관</h2>
            <button className="edit-link">목록 수정</button>
          </div>

          {/* frame 2609498 */}
          <div className="habit-list">
            {habits.map((habit) => (
              <button
                key={habit.id}
                className={`habit-item ${habit.completed ? 'completed' : ''}`}
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
