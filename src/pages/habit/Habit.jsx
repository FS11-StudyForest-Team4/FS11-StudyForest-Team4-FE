import React, { useEffect, useState } from 'react';
import styles from './Habit.module.css';
import { deletePng, underlinePng } from '@/assets/images/habit';
import { habitlogService, habitService } from '@/api';
import clsx from 'clsx';
import { Spinner } from '@/components';
import { util } from '@/utils';

function Habit({ studyId }) {
  //목록 수정 버튼 누를 때, 모달 상태 추가(기본값은 false로 닫혀있음)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (!studyId) return;

    async function getHabits() {
      const habits = await habitService.getHabitList(studyId);
      setHabits(habits);
    }
    getHabits();
  }, [studyId]);

  // 수정 완료 로직(하림님 updateHabit 활용)
  const handleSubmit = async () => {
    try {
      const updatePromises = habits.map((habit) =>
        habitService.updateHabit(habit.id, { name: habit.name }),
      );
      await Promise.all(updatePromises);
      util.successAlert('습관이 수정되었습니다!').then(() => {
        setIsEditModalOpen(false);
      });
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  const [newHabitName, setNewHabitName] = useState('');
  const handleNewHabit = (e) => {
    if (e.key !== 'Enter' && e.type !== 'click') return;

    e.preventDefault();

    if (!newHabitName.trim()) {
      util.errorAlert('습관 이름을 입력해주세요!');
      return;
    }

    handleCreate();
  };

  const handleCreate = async () => {
    try {
      // 하림님의 API 호출
      const response = await habitService.createHabit(studyId, {
        name: newHabitName,
      });

      if (response) {
        // 서버 저장 성공 후 화면(UI)에 바로 반영
        setHabits([...habits, response]);
        setNewHabitName(''); // 입력창 초기화
      }
    } catch (error) {
      console.error('습관 생성 오류:', error);
    }
  };

  const handleDelete = (habitId) => {
    util.questionAlert('정말 삭제하시겠습니까?').then((result) => {
      if (result.isConfirmed) {
        fetchDeleteHabit(habitId);
      }
    });
  };

  const fetchDeleteHabit = async (habitId) => {
    try {
      await habitService.deleteHabit(habitId);
      setHabits(habits.filter((h) => h.id !== habitId));
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  //습관 완료 상태를 토글
  const handleToggleHabit = async (habit) => {
    try {
      // 백엔드 habitlog POST 호출
      const isCompleted = await habitlogService.createHabitlog(habit.id);

      // 서버에서 반환한 완료 상태로 UI 업데이트
      setHabits((prevHabits) =>
        prevHabits.map((h) => (h.id === habit.id ? { ...h, isCompleted } : h)),
      );
    } catch (error) {
      console.error('습관 완료 토글 중 오류 발생:', error);
    }
  };

  // 습관 목록 전체 삭제 기능 추가
  const handleDeleteAll = () => {
    if (habits.length === 0) {
      util.errorAlert('삭제할 습관이 없습니다.');
      return;
    }

    util.questionAlert('모든 습관 목록을 삭제하시겠습니까?').then((result) => {
      if (result.isConfirmed) {
        fetchDeleteAll();
      }
    });
  };

  const fetchDeleteAll = async () => {
    try {
      await Promise.all(
        habits.map((habit) => habitService.deleteHabit(habit.id)),
      );

      setHabits([]);
      setIsEditModalOpen(false);
      util.errorAlert('모든 습관이 삭제되었습니다.');
    } catch (error) {
      console.error('전체 삭제 중 오류 발생:', error);
      util.errorAlert('일부 습관을 삭제하지 못했습니다. 다시 시도해주세요.');
    }
  };

  if (!studyId) {
    <Spinner />;
    return;
  }

  return (
    <>
      <section className={styles.habitListCard}>
        <div className={styles.listHeader}>
          <h2>오늘의 습관</h2>
          <button
            className={styles.editLink}
            onClick={() => setIsEditModalOpen(true)}
          >
            목록 수정
          </button>
        </div>

        {habits.length > 0 ? (
          <ul className={styles.habitList}>
            {habits.map((habit) => (
              <li
                key={habit.id}
                className={clsx(styles.habitItem, {
                  [styles.isCompleted]: habit.isCompleted,
                })}
                // 2. 클릭 시 상태를 반전시키는 함수 연결
                onClick={() => handleToggleHabit(habit)}
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
      </section>
      {/* 모달 레이아웃 추가 */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>습관 목록</h3>
            </div>
            <section>
              <ul className={styles.editList}>
                {habits.map((habit) => (
                  <li key={habit.id} className={styles.editCaseWrapper}>
                    <div className={styles.editCase}>{habit.name}</div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(habit.id)}
                    >
                      <img
                        src={deletePng}
                        alt="delete"
                        className={styles.deleteIcon}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <div className={styles.inputWrapper}>
                {/* 1. 인풋과 휴지통을 가로로 묶는 상자 */}
                <div className={styles.addInputContainer}>
                  <input
                    type="text"
                    placeholder=""
                    className={styles.addInput}
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    onKeyDown={handleNewHabit}
                  />
                  <img
                    src={underlinePng}
                    alt="underline"
                    className={styles.underlineIcon}
                  />
                </div>
                {/* 2. 인풋탭 오른쪽의 전체 삭제 버튼 */}
                <button
                  className={styles.deleteAllBtn}
                  onClick={handleDeleteAll}
                  title="전체 삭제"
                >
                  <img
                    src={deletePng}
                    alt="delete all"
                    className={styles.deleteIcon}
                  />
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.addInputContainer}>
                  <button className={styles.addBtn} onClick={handleNewHabit}>
                    +
                  </button>
                </div>
              </div>
            </section>
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
    </>
  );
}

export default Habit;
