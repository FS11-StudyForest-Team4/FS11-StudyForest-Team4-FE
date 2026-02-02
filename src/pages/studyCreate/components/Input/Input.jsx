import styles from './Input.module.css';

function Input({ label, errorMessage, className = '', ...props }) {
  return (
    <div className={styles.inputwrapper}>
      {label && (
        <label htmlFor={props.name} classNames={styles.label}>
          {label}
        </label>
      )}
      <input
        className={`${styles.input} ${errorMessage ? styles.error : ''} ${className}`}
        {...props}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default Input;
