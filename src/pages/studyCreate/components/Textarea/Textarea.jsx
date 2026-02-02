import styles from './Textarea.module.css';

function Textarea({ label, name, errorMessage, className = '', ...props }) {
  return (
    <div className={styles.textareaWrapper}>
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

export default Textarea;
