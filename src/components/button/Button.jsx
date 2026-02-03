import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children, type = 'button', disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.btn}
    >
      {children}
    </button>
  );
};

export default Button;
