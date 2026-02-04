import React, { useState, useEffect } from 'react';
import { getEmojiList } from '../../api/EmojiService';
import styles from './StudyCard.module.css';
import GroupIcon from '@/assets/images/Group.svg';
import bgDesign from '@/assets/images/backgrounds/bgDesign.jpg';
import bgLeaf from '@/assets/images/backgrounds/bgLeaf.jpg';
import bgStudy from '@/assets/images/backgrounds/bgStudy.jpg';
import bgTile from '@/assets/images/backgrounds/bgTile.jpg';

const StudyCard = ({ study, onClick }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await getEmojiList(study.id);
        if (res && res.data) {
          const emojiData = res.data.slice(0, 3).map((e) => ({
            name: e.name,
            count: e.count || 0,
          }));
          setEmojis(emojiData);
        }
      } catch (error) {
        console.error('이모지 로드 실패:', error);
      }
    };
    if (study.id) fetchEmojis();
  }, [study.id]);

  const backgroundMap = {
    green: '#e1edde',
    yellow: '#fff1cc',
    blue: '#e0f1f5',
    pink: '#fde0e9',
    design: `url(${bgDesign})`,
    study: `url(${bgStudy})`,
    tile: `url(${bgTile})`,
    leaf: `url(${bgLeaf})`,
  };

  const bgType = study.background?.toLowerCase() || 'green';
  const bgValue = backgroundMap[bgType] || backgroundMap.green;
  const isImageBackground = bgValue.includes('url');

  return (
    <div
      className={`${styles.studyCardContainer} ${isImageBackground ? styles.isImage : ''}`}
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
          <span className={styles.pointText}>
            {study.totalPoint || 0}P 획득
          </span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.studyTitle}>{study.title}</h3>
        <p className={styles.progressText}>
          {study.currentProgress || 0}일째 진행 중
        </p>
        <p className={styles.studySlogan}>{study.introduction}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.emojiWrapper}>
          {emojis.length > 0 ? (
            emojis.map((emoji, index) => (
              <span key={index} className={styles.emojiItem}>
                {emoji.name} {emoji.count}
              </span>
            ))
          ) : (
            <span className={styles.emojiItem}>✨ 0</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
