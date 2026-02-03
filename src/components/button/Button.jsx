import React from 'react';
import styles from './Button.module.css';

const Button = ({
  onClick,
  children,
  type = 'button',
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.btn + ' ' + styles[className]}
    >
      {children}
    </button>
  );
};

export default Button;
