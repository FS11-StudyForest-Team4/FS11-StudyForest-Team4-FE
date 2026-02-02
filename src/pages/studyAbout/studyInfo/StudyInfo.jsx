import React, { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './studyInfo.module.css';
import { EmojiService } from '@/api/api';

{
  /* TO DO LIST 
  
    1. 오늘의 습관, 오늘의 집중, 수정하기, 삭제하기 눌렀을 때 비밀번호 모달 띄우기 
    2. 이모지 버튼 클릭시 - api 호출 및 실시간 반영 체크
    3. 공유하기 - 링크 복사 - toast창
    4. 습관 기록표 뿌리는 부분 고민 필요

  */
}

const StudyInfo = () => {
  const [emojiList, setEmojiList] = useState([]);
  const [moreEmoji, setMoreEmoji] = useState(false);
  const [emojiTab, setEmojiTab] = useState(false);

  const onEmojiClick = (emojiName) => {
    createEmoji(emojiName);
  };

  const getEmojiList = async () => {
    try {
      const res = await EmojiService.getEmojiList(
        '01KG4143RBBN6DG5CFSNNNSXQ8', //studyId
      );
      setEmojiList(res);
    } catch (err) {
      console.log('err:', err);
    }
  };

  useEffect(() => {
    getEmojiList();
  }, []);

  const createEmoji = async (emojiName) => {
    try {
      const res = await EmojiService.createEmoji(
        '01KG4143RBBN6DG5CFSNNNSXQ8', //studyId
        { name: emojiName },
      );
      if (res.status == 201) getEmojiList();
    } catch (err) {
      console.log('err:', err);
    }
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
          {emojiList.length > 3 && (
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
          <li>공유하기</li>
          <li>수정하기</li>
          <li>스터디 삭제하기</li>
        </ul>
      </article>
      <article className={styles.studyContent}>
        <div className={styles.studyTop}>
          <h1>연우의 개발공장 데이터 넣기</h1>
          <div className={styles.moreBtn}>
            <button>
              오늘의 습관 <i />
            </button>
            <button>
              오늘의 집중 <i />
            </button>
          </div>
        </div>
        <div className={styles.studyInfo}>
          <h4>소개</h4>
          <p>[데이터 넣기] 다들 오늘 하루도 화이팅 ;) 현재까지</p>
        </div>
        <div className={styles.studyPoint}>
          <h4>현재 획득한 포인트</h4>
          <p className={styles.point}>
            <i /> <span>310P[데이터 넣기] 획득</span>
          </p>
        </div>
      </article>
    </section>
  );
};

export default StudyInfo;
