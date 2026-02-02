import styles from './Textarea.module.css';

function Textarea({ label, errorMessage, className = '', ...props }) {
  return (
    <div className={styles.textareaWrapper}>
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

export default Textarea;
