import { InputField } from './components/InputBox/InputField';
import style from './Create.module.css';

export function Create() {
  return (
    <>
      <section>
        <div className={style.container}>
          <div className={style.createPageTitle}>스터디 만들기</div>
          <>
            <InputField
              type={'text'}
              inputTitle={'닉네임'}
              placeholderText={'닉네임을 입력해주세요'}
            />
            <InputField
              type={'text'}
              inputTitle={'스터디 이름'}
              placeholderText={'닉네임을 입력해주세요'}
            />
            <InputField
              type={'text'}
              inputTitle={'소개'}
              placeholderText={'소개 멘트를 작성해주세요'}
            />
          </>
          {/* 배경선택 컴포넌트 들어갈 자리임 */}
          <>
            <InputField
              type={'password'}
              inputTitle={'비밀번호'}
              placeholderText={'비밀번호를 입력해주세요'}
            />
            <InputField
              type={'password'}
              inputTitle={'비밀번호'}
              placeholderText={'비밀번호를 다시 한 번 입력해주세요'}
            />
          </>
        </div>
        {/* 버튼 컴포넌트 들어갈 자리임 */}
      </section>
    </>
  );
}
