import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { emojiService } from '@/api';
import styles from './Emoji.module.css';

const Emoji = ({ id }) => {
  const [emojiList, setEmojiList] = useState([]);
  const [moreEmoji, setMoreEmoji] = useState(false);
  const [emojiTab, setEmojiTab] = useState(false);

  const handleEmoji = (emojiName) => {
    const emoji = emojiList.find((x) => x.name === emojiName);

    if (!emoji) {
      createEmoji(emojiName);
    } else {
      patchEmoji(emojiName);
    }
  };

  const getEmojiList = async (studyId) => {
    try {
      const res = await emojiService.getEmojiList(studyId);
      setEmojiList(res);
    } catch (err) {
      console.log('getEmojiList err:', err);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchEmojiList = async () => {
      await getEmojiList(id);
    };

    fetchEmojiList();
  }, [id]);

  const createEmoji = async (emojiName) => {
    try {
      const res = await emojiService.createEmoji(id, { name: emojiName });
      if (res.status == 201) getEmojiList(id);
    } catch (err) {
      console.log('createEmoji err:', err);
    }
  };

  const patchEmoji = async (emojiName) => {
    try {
      const res = await emojiService.patchEmoji(id, { name: emojiName });
      if (res.status == 200) getEmojiList(id);
    } catch (err) {
      console.log('patchEmoji err:', err);
    }
  };

  return (
    <div className={styles.emojiBox}>
      {emojiList.length > 0 && (
        <ul className={styles.emojiList}>
          {emojiList &&
            emojiList.slice(0, 3).map((emojiItem) => (
              <li
                id={emojiItem.id}
                key={emojiItem.id}
                onClick={() => handleEmoji(emojiItem.name)}
              >
                <span>{emojiItem.name}</span>
                <span>{emojiItem.count}</span>
              </li>
            ))}
        </ul>
      )}
      {emojiList && emojiList.length > 3 && (
        <>
          <button
            onClick={() => setMoreEmoji(!moreEmoji)}
            className={styles.moreEmojiBtn}
          >
            <i /> {emojiList.length - 3}...
          </button>
          {moreEmoji && (
            <ul className={styles.emojiList + ' ' + styles.moreEmoji}>
              {emojiList &&
                emojiList.map((emojiItem) => (
                  <li
                    id={emojiItem.id}
                    key={emojiItem.id}
                    onClick={() => handleEmoji(emojiItem.name)}
                  >
                    <span>{emojiItem.name}</span>
                    <span>{emojiItem.count}</span>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
      <button
        className={styles.emojiBtn}
        onClick={() => setEmojiTab(!emojiTab)}
      >
        <i className={styles.iEmoji} /> 추가
      </button>
      {emojiTab && <EmojiPicker onEmojiClick={(e) => handleEmoji(e.emoji)} />}
    </div>
  );
};

export default Emoji;
