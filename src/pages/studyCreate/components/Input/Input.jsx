import React, { useState } from 'react';
import styles from './Input.module.css';
import { visible, invisible } from '@/assets/images/icons';

function Input({ label, name, errorMessage, className, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.inputwrapper}>
      <label htmlFor={name}>{label}</label>

      {type === 'password' ? (
        <div className={styles.formInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            id={name}
            name={name}
            {...props}
            className={`${errorMessage ? styles.error : ''} ${className}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordBtn}
          >
            <img
              src={showPassword ? visible : invisible}
              alt="비밀번호 보이기"
            />
          </button>
        </div>
      ) : (
        <>
          <input
            id={name}
            name={name}
            className={`${errorMessage ? styles.error : ''} ${className}`}
            {...props}
          />
        </>
      )}

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Input;
