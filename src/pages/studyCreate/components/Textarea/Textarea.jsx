import styles from './Textarea.module.css';

function Textarea({ className = '', ...props }) {
  const classNames = `${styles.textarea} ${className}`;
  return <textarea className={classNames} {...props} />;
}

export default Textarea;
