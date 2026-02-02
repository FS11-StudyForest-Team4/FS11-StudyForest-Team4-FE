import React, { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './StudyInfo.module.css';
import { EmojiService } from '@/api/api';
import { PasswordModal } from '@/components/index';
import { util } from '@/utils';

const StudyInfo = ({ studyInfo }) => {
  const { id, title, description, totalPoint } = studyInfo || {};
  const [emojiList, setEmojiList] = useState([]);
  const [moreEmoji, setMoreEmoji] = useState(false);
  const [emojiTab, setEmojiTab] = useState(false);
  const [modalType, setModalType] = useState(null);

  const onEmojiClick = (emojiName) => {
    const emoji = emojiList.find((x) => x.name === emojiName);

    if (!emoji) {
      createEmoji(emojiName);
    } else {
      patchEmoji(emojiName);
    }
  };

  const getEmojiList = async (studyId) => {
    try {
      const res = await EmojiService.getEmojiList(studyId);
      if (res.status == 200) setEmojiList(res.data);
    } catch (err) {
      console.log('err:', err);
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
      const res = await EmojiService.createEmoji(id, { name: emojiName });
      if (res.status == 201) getEmojiList(id);
    } catch (err) {
      console.log('err:', err);
    }
  };

  const patchEmoji = async (emojiName) => {
    try {
      const res = await EmojiService.patchEmoji(id, { name: emojiName });
      if (res.status == 200) getEmojiList(id);
    } catch (err) {
      console.log('err:', err);
    }
  };

  const onUserHandler = (type) => {
    setModalType(type);
  };

  const onShareHandler = () => {
    const url = `${window.location.origin}${window.location.pathname}?${id}`;
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
        <div className={styles.emojiBox}>
          <ul className={styles.emojiList}>
            {emojiList &&
              emojiList.slice(0, 3).map((emojiItem) => (
                <li
                  id={emojiItem.id}
                  key={emojiItem.id}
                  onClick={() => onEmojiClick(emojiItem.name)}
                >
                  <span>{emojiItem.name}</span>
                  <span>{emojiItem.count}</span>
                </li>
              ))}
          </ul>
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
                        onClick={() => onEmojiClick(emojiItem.name)}
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
          {emojiTab && (
            <EmojiPicker onEmojiClick={(e) => onEmojiClick(e.emoji)} />
          )}
        </div>
        <ul className={styles.btnList}>
          <li onClick={onShareHandler}>공유하기</li>
          <li onClick={() => onUserHandler('edit')}>수정하기</li>
          <li onClick={() => onUserHandler('delete')}>스터디 삭제하기</li>
        </ul>
      </article>
      <article className={styles.studyContent}>
        <div className={styles.studyTop}>
          <h1>{title}</h1>
          <div className={styles.moreBtn}>
            <button onClick={() => onUserHandler('habit')}>
              오늘의 습관 <i />
            </button>
            <button onClick={() => onUserHandler('focus')}>
              오늘의 집중 <i />
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

      {modalType && (
        <PasswordModal
          type={modalType}
          studyInfo={studyInfo}
          modalClose={() => setModalType(null)}
        />
      )}
    </section>
  );
};

export default StudyInfo;
