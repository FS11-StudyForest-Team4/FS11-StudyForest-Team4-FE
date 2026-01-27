import { useRef, useState } from 'react';
import style from './InputField.module.css';
import visible from '/src/assets/images/icons/visibilityOn.svg';
import invisible from '/src/assets/images/icons/visibilityOff.svg';
import clsx from 'clsx';

export function InputField({ type = 'text', inputTitle, placeholderText }) {
  const [showPassword, setShowPassword] = useState();
  //소개 입력창이 인풋보다 커서 클릭 데려오기 위해 추가함
  const inputClick = useRef(null);
  const inputWrapperClick = () => {
    inputClick.current.focus();
  };

  return (
    <div className={style.inputBox}>
      <label>{inputTitle}</label>
      {/* 어떻게든 하나의 컴포넌트로 만들어버리겠다는 강한 의지의 표출 🫠 */}
      <div
        className={clsx(
          style.inputWrapper,
          inputTitle === '소개' && style.descriptionWrapper,
        )}
        onClick={inputWrapperClick}
      >
        {inputTitle === '소개' ? (
          <textarea placeholder={placeholderText}></textarea>
        ) : (
          <input
            ref={inputClick}
            type={type === 'password' ? 'password' : 'text'}
            placeholder={placeholderText}
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={style.buttonShowPassword}
          >
            <img
              src={showPassword ? visible : invisible}
              alt="비밀번호 보이기"
            />
          </button>
        )}
      </div>
      {/* 헉 포커스 테두리 적용하다 보니까 밑에 필수입력 안내문도 있네요.. 이건 좀 더 찾아보고 올게요... (〃´ᴗ`〃)ゝ*/}
    </div>
  );
}
