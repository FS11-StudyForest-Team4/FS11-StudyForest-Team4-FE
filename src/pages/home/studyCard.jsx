import React, { useEffect } from 'react';
import styles from './StudyCard.module.css';
import GroupIcon from '@/assets/images/Group.svg';
import {
  designJPG,
  leafJPG,
  studyJPG,
  tileJPG,
} from '@/assets/images/backgrounds';

const StudyCard = ({ study, onClick }) => {
  const {
    background,
    emojis,
    nickName,
    title,
    totalPoint,
    createdAt,
    description,
  } = study;

  const backgroundMap = {
    green: '#e1edde',
    yellow: '#fff1cc',
    blue: '#e0f1f5',
    pink: '#fde0e9',
    design: `url(${designJPG})`,
    study: `url(${studyJPG})`,
    tile: `url(${tileJPG})`,
    leaf: `url(${leafJPG})`,
  };

  const bgType = background?.toLowerCase() || 'green';
  const bgValue = backgroundMap[bgType] || backgroundMap.green;
  const isImageBackground = bgValue.includes('url');

  const createdDate = new Date(createdAt);
  const today = new Date();

  const diffTime =
    today.setHours(0, 0, 0, 0) - createdDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dDay = diffDays + 1;

  return (
    <div
      /* 💡 bgType을 클래스에 추가하여 CSS에서 색상을 구분할 수 있게 합니다 */
      className={`${styles.studyCardContainer} ${isImageBackground ? styles.isImage : ''} ${styles[bgType] || ''}`}
      onClick={onClick}
      style={{
        backgroundImage: isImageBackground
          ? `linear-gradient(rgba(65, 65, 65, 0.5), rgba(65, 65, 65, 0.5)), ${bgValue}`
          : 'none',
        backgroundColor: !isImageBackground ? bgValue : 'transparent',
      }}
    >
      <div className={styles.cardHeaderRow}>
        <div
          className={`${styles.pointBadge} ${isImageBackground ? styles.darkBadge : ''}`}
        >
          <img src={GroupIcon} alt="point icon" className={styles.groupIcon} />
          <span className={styles.pointText}>{totalPoint || 0}P 획득</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.studyTitle}>
          {/* 💡 닉네임만 따로 스타일을 주기 위해 span으로 감쌉니다 */}
          <span className={styles.nickNameText}>{nickName}</span>의 {title}
        </h3>
        <p className={styles.progressText}>{dDay}일째 진행 중</p>
        <p className={styles.studySlogan}>{description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.emojiWrapper}>
          {emojis &&
            emojis.map((emoji, index) => (
              <React.Fragment key={emoji.id || index}>
                {index < 3 && (
                  <span className={styles.emojiItem}>
                    {emoji.name} {emoji.count}
                  </span>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
