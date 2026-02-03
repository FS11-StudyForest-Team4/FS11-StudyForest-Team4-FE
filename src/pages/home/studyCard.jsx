import React, { useState, useEffect } from 'react';
import { getEmojiList } from '../../api/EmojiService';
import styles from './StudyCard.module.css';

const StudyCard = ({ study, onClick }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await getEmojiList(study.id);
        if (res && res.data) {
          const emojiNames = res.data.map((e) => e.name).slice(0, 3);
          setEmojis(emojiNames);
        }
      } catch (error) {
        console.error('이모지 로드 실패:', error);
      }
    };
    if (study.id) fetchEmojis();
  }, [study.id]);

  return (
    <div
      className={styles.studyCardContainer}
      onClick={onClick}
      style={{ backgroundColor: study.background }}
    >
      {/* 상단: 포인트만 남김 */}
      <div className={styles.cardHeaderRow}>
        <div className={styles.pointBadge}>
          <span className={styles.leafIcon}>🍃</span>
          {study.totalPoint || 0}P 획득
        </div>
      </div>

      {/* 중앙: 제목 */}
      <div className={styles.cardBody}>
        <h3 className={styles.studyTitle}>{study.title}</h3>
      </div>

      {/* 하단: 이모지(왼쪽) + 참여 인원(오른쪽) */}
      <div className={styles.cardFooter}>
        <div className={styles.emojiWrapper}>
          {emojis.length > 0 ? (
            emojis.map((emoji, index) => (
              <span key={index} className={styles.emojiItem}>
                {emoji}
              </span>
            ))
          ) : (
            <span className={styles.emojiItem}>✨</span>
          )}
        </div>
        <span className={styles.participantCount}>0명</span>
      </div>
    </div>
  );
};

export default StudyCard;
