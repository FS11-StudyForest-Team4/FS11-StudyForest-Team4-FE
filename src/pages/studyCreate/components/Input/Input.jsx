import styles from './Input.module.css';

function Input({ label, name, errorMessage, className = '', ...props }) {
  return (
    <div className={styles.inputwrapper}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        className={`${styles.input} ${errorMessage ? styles.error : ''} ${className}`}
        {...props}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default Input;
