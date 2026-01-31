import { useRef, useState } from 'react';
import style from './InputField.module.css';
import visible from '/src/assets/images/icons/visibilityOn.svg';
import invisible from '/src/assets/images/icons/visibilityOff.svg';
import clsx from 'clsx';

export function InputField({
  type,
  inputTitle,
  placeholderText,
  children,
  errorMessage,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  //소개 입력창이 인풋보다 커서 클릭 데려오기 위해 추가함+배경선택
  const inputClick = useRef(null);
  const inputWrapperClick = () => {
    inputClick.current?.focus();
  };

  return (
    <div className={style.inputBox}>
      <label>{inputTitle}</label>
      {/* 어떻게든 하나의 컴포넌트로 만들어버리겠다는 강한 의지의 표출 🫠 */}
      <div
        className={clsx(
          style.inputWrapper,
          inputTitle === '소개' && style.descriptionWrapper,
          inputTitle === '배경을 선택해주세요' && style.tileWrapper,
        )}
        onClick={inputWrapperClick}
      >
        {inputTitle === '배경을 선택해주세요' ? (
          children
        ) : inputTitle === '소개' ? (
          <textarea
            ref={inputClick}
            placeholder={placeholderText}
            value={value}
            onChange={onChange}
          ></textarea>
        ) : (
          <input
            ref={inputClick}
            type={showPassword ? 'text' : type}
            placeholder={placeholderText}
            value={value}
            onChange={onChange}
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
      <div className={style.errorContainer}>
        {errorMessage && (
          <span className={style.errorMessage}>{errorMessage}</span>
        )}
      </div>
    </div>
  );
}
