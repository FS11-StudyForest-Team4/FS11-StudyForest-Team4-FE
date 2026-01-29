import React from 'react';
import styles from './studyCard.module.css';

const StudyCard = ({ study, onClick, background }) => {
  const bgColor = background || study?.background || '#D9D9D9';

  return (
    <div
      className={styles.cardContainer}
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles.textOverlay}>
        <h4 className={styles.studyTitle}>{study?.title || '제목 없음'}</h4>
        <div className={styles.studyInfo}>
          <span className={styles.pointText}>{study?.totalPoint || 0}p</span>
          <span className={styles.participantText}>
            {study?.maxParticipants || 0}명
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
