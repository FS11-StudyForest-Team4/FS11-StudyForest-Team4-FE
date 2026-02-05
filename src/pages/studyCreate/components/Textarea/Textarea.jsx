import styles from './Textarea.module.css';

function Textarea({ label, name, errorMessage, className = '', ...props }) {
  return (
    <div className={styles.textareaWrapper}>
      <label htmlFor={name}>{label}</label>

      <textarea
        id={name}
        name={name}
        rows="4"
        className={`${errorMessage ? styles.error : ''} ${className}`}
        {...props}
      ></textarea>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Textarea;
