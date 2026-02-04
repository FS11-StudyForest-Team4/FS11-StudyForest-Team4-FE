import React, { useState, useEffect } from 'react';
import styles from './StudyInfo.module.css';
import { util } from '@/utils';
import { Emoji } from '@/pages/studyAbout/emoji';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const StudyInfo = ({ studyInfo, onModalType, studyTab }) => {
  const { id, title, nickName, description, totalPoint } = studyInfo || {};
  const [now, setNow] = useState(new Date());
  const timeString = dayjs(now).format('YYYY-MM-DD A hh:mm');
  const BUTTON_MAP = {
    habit: [
      { label: '오늘의 집중', type: 'focus' },
      { label: '홈', type: 'habitLog' },
    ],
    focus: [
      { label: '오늘의 습관', type: 'habit' },
      { label: '홈', type: 'habitLog' },
    ],
    habitLog: [
      { label: '오늘의 습관', type: 'habit' },
      { label: '오늘의 집중', type: 'focus' },
    ],
  };

  const VIEW_MAP = {
    habit: (
      <div className={styles.studyPoint}>
        <h4>현재 시간</h4>
        <p className={styles.point}>{timeString}</p>
      </div>
    ),

    focus: (
      <div className={styles.studyPoint}>
        <h4>현재 획득한 포인트</h4>
        <p className={styles.point}>
          <i /> <span>{totalPoint} 획득</span>
        </p>
      </div>
    ),

    habitLog: (
      <>
        <div className={styles.studyInfo}>
          <h4>소개</h4>
          <p>{description}</p>
        </div>
        <div className={styles.studyPoint}>
          <h4>현재 획득한 포인트</h4>
          <p className={styles.point}>
            <i /> <span>{totalPoint} 획득</span>
          </p>
        </div>
      </>
    ),
  };

  useEffect(() => {
    const ONE_MINUTE_MS = 60 * 1000;

    const clock = setInterval(() => {
      setNow(new Date());
    }, ONE_MINUTE_MS); //1000(1초)에서 60000(1분)으로 변경, 매직넘버 대신 상수 사용

    return () => clearInterval(clock);
  }, []);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        util.successAlert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  };

  return (
    <section>
      {studyTab === 'habitLog' && (
        <article className={styles.studyNav}>
          <Emoji id={id} />
          <ul className={styles.btnList}>
            <li onClick={handleShare}>공유하기</li>
            <li onClick={() => onModalType('edit')}>수정하기</li>
            <li onClick={() => onModalType('delete')}>스터디 삭제하기</li>
          </ul>
        </article>
      )}
      <article className={styles.studyContent}>
        <div className={styles.studyTop}>
          <h1>
            {nickName}의 {title}
          </h1>
          <div className={styles.moreBtn}>
            {BUTTON_MAP[studyTab]?.map((items) => (
              <button key={items.type} onClick={() => onModalType(items.type)}>
                {items.label} <i />
              </button>
            ))}
          </div>
        </div>
        {VIEW_MAP[studyTab]}
      </article>
    </section>
  );
};

export default StudyInfo;
