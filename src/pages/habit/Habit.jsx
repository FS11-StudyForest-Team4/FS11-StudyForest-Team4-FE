import React, { useEffect, useState } from 'react';
import styles from './Habit.module.css';
import arrow_Vector from '../../assets/images/arrow_Vector.png';
import delete_Icon from '../../assets/images/delete_Icon.png';
import {
  updateHabit,
  createHabit,
  deleteHabit,
  getHabitList,
} from '../../api/habitService';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useLocation } from 'react-router';
dayjs.locale('ko');

const ONE_MINUTE_MS = 60 * 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Habit() {
  const location = useLocation();
  const studyId = location.state?.studyId;
  //현재 시간을 저장하는 state
  const [now, setNow] = useState(new Date());
  //목록 수정 버튼 누를 때, 모달 상태 추가(기본값은 false로 닫혀있음)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHabits() {
      if (!studyId) return;
      setIsLoading(true);
      const habits = await getHabitList(studyId);
      setHabits(habits);
      setIsLoading(false);
    }
    getHabits();
  }, [studyId]);

  //시계
  useEffect(() => {
    const clock = setInterval(() => {
      setNow(new Date());
    }, ONE_MINUTE_MS); //1000(1초)에서 60000(1분)으로 변경, 매직넘버 대신 상수 사용

    return () => clearInterval(clock);
  }, []);

  //시계모양
  const timeString = dayjs(now).format('YYYY-MM-DD A hh:mm'); //dayjs 사용

  // 수정 완료 로직(하림님 updateHabit 활용)
  const handleSubmit = async () => {
    try {
      const updatePromises = habits.map((habit) =>
        updateHabit(habit.id, { name: habit.name }),
      );
      await Promise.all(updatePromises);
      alert('습관이 수정되었습니다!');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  // 생성 로직(하림님 createHabit 활용)
  const [newHabitName, setNewHabitName] = useState('');
  const handleCreate = async () => {
    if (!newHabitName.trim()) {
      alert('습관 이름을 입력해주세요!');
      return;
    }

    try {
      // 하림님의 API 호출
      const response = await createHabit(studyId, { name: newHabitName });

      if (response) {
        // 서버 저장 성공 후 화면(UI)에 바로 반영
        setHabits([...habits, response]);
        setNewHabitName(''); // 입력창 초기화
      }
    } catch (error) {
      console.error('습관 생성 오류:', error);
    }
  };

  // 삭제 로직 (하림님의 deleteHabit 활용)
  const handleDelete = async (habitId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteHabit(habitId); // 서버 삭제
        setHabits(habits.filter((h) => h.id !== habitId)); // UI 반영
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

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
                <span className={styles.nickName}>연우</span>의 개발공장
              </h1>
              {/* Frame 2609450 */}
              <div className={styles.btnGroup}>
                {/* Frame 2609447 */}
                <button className={styles.headerTopBtnToday}>
                  오늘의 집중
                  <img
                    src={arrow_Vector}
                    alt="arrow"
                    className={styles.iconArrow}
                  />
                </button>
                {/* Frame 2609447 */}
                <button className={styles.headerTopBtnHome}>
                  홈{' '}
                  <img
                    src={arrow_Vector}
                    alt="arrow"
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
            {/* 클릭하면 모달을 여는 이벤트 추가 */}
            <button
              className={styles.editLink}
              onClick={() => setIsEditModalOpen(true)}
            >
              목록 수정
            </button>
          </div>

          {/* frame 2609498 */}
          {isLoading && <div>로딩중...</div>}
          {/* 습관 목록이 있을때 */}
          {!isLoading && (
            <>
              {habits.length > 0 ? (
                <ul className={styles.habitList}>
                  {habits.map((habit) => (
                    <li
                      key={habit.id}
                      className={clsx(
                        styles.habitItem,
                        habit.completed && styles.completed,
                      )}
                    >
                      {habit.name}
                    </li>
                  ))}
                </ul>
              ) : (
                /* 습관 목록이 없을 때 (추가된 부분) */
                <div className={styles.emptyMessage}>
                  <p>아직 습관이 없어요</p>
                  <p>목록 수정을 눌러 습관을 생성해보세요</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      {/* 모달 레이아웃 추가 */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>습관 목록</h3>
            </div>
            <ul className={styles.editList}>
              {habits.map((habit) => (
                <li key={habit.id} className={styles.editCaseWrapper}>
                  <div className={styles.editCase}>
                    <span>{habit.name}</span>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(habit.id)}
                  >
                    <img
                      src={delete_Icon}
                      alt="delete"
                      className={styles.deleteIcon}
                    />
                  </button>
                </li>
              ))}
            </ul>
            {/* 아진짜 왜 안되냐 */}
            {/* 습관 추가 섹션구현(+)  */}{' '}
            <input
              type="text"
              placeholder=""
              className={styles.addInput}
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <div className={styles.addHabitSection}>
              <button className={styles.addBtn} onClick={handleCreate}>
                +
              </button>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.closeBtn}
                onClick={() => setIsEditModalOpen(false)}
              >
                취소
              </button>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Habit;
