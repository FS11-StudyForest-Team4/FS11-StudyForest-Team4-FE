import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './StudyInfo.module.css';

{
  /* TO DO LIST 
  
    1. 오늘의 습관, 오늘의 집중, 수정하기, 삭제하기 눌렀을 때 비밀번호 모달 띄우기 
    2. 이모지 버튼 클릭시 - api 호출 및 실시간 반영 체크
    3. 공유하기 - 링크 복사 - toast창
    4. 습관 기록표 뿌리는 부분 고민 필요

  */
}

const StudyInfo = () => {
  const EMOJI_LIST = [
    //예시
    { id: 0, name: '😃', count: 32 },
    { id: 1, name: '☺️', count: 3 },
    { id: 2, name: '🔥', count: 12 },
  ];

  const [emojiMore, setEmojiMore] = useState(false);

  const onEmojiClick = (e) => {
    const { emoji, unified } = e;
    console.log('emoji:', emoji, unified);
    // 보내는 api
  };

  return (
    <section>
      <article className={styles['study-nav']}>
        <div className={styles['emoji-box']}>
          <ul className={styles['emoji-list']}>
            {EMOJI_LIST &&
              EMOJI_LIST.map((emojiItem, index) => (
                <li id={emojiItem.id} key={index}>
                  <span>{emojiItem.name}</span>
                  <span>{emojiItem.count}</span>
                </li>
              ))}
          </ul>
          <button
            className={styles['emoji-btn']}
            onClick={() => setEmojiMore(!emojiMore)}
          >
            <i className={styles['i_emoji']} /> 추가
          </button>
          {emojiMore && <EmojiPicker onEmojiClick={(e) => onEmojiClick(e)} />}
        </div>
        <ul className={styles['btn-list']}>
          <li>공유하기</li>
          <li>수정하기</li>
          <li>스터디 삭제하기</li>
        </ul>
      </article>
      <article className={styles['study-content']}>
        <div className={styles['study-top']}>
          <h1>연우의 개발공장 데이터 넣기</h1>
          <div className={styles['more-btn']}>
            <button>
              오늘의 습관 <i />
            </button>
            <button>
              오늘의 집중 <i />
            </button>
          </div>
        </div>
        <div className={styles['study-info']}>
          <h4>소개</h4>
          <p>[데이터 넣기] 다들 오늘 하루도 화이팅 ;) 현재까지</p>
        </div>
        <div className={styles['study-point']}>
          <h4>현재 획득한 포인트</h4>
          <p className={styles['point']}>
            <i /> <span>310P[데이터 넣기] 획득</span>
          </p>
        </div>
      </article>
    </section>
  );
};

export default StudyInfo;
