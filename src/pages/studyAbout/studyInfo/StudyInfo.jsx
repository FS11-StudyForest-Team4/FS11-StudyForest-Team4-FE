import React from 'react';
import styles from './StudyInfo.module.css';
import { util } from '@/utils';
import { Emoji } from '@/pages/studyAbout/emoji';

const StudyInfo = ({ studyInfo, onModalType }) => {
  const { id, title, nickName, description, totalPoint } = studyInfo || {};

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
      <article className={styles.studyNav}>
        <Emoji id={id} />
        <ul className={styles.btnList}>
          <li onClick={handleShare}>공유하기</li>
          <li onClick={() => onModalType('edit')}>수정하기</li>
          <li onClick={() => onModalType('delete')}>스터디 삭제하기</li>
        </ul>
      </article>
      <article className={styles.studyContent}>
        <div className={styles.studyTop}>
          <h1>
            {nickName}의 {title}
          </h1>
          <div className={styles.moreBtn}>
            <button onClick={() => onModalType('habit')}>
              오늘의 습관 <i />
            </button>
            <button onClick={() => onModalType('focus')}>
              오늘의 집중 <i />
            </button>
            <button onClick={() => onModalType('habitLog')}>
              홈 <i />
            </button>
          </div>
        </div>
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
      </article>
    </section>
  );
};

export default StudyInfo;
