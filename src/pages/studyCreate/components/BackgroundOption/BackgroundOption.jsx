//배경 선텍 컴포넌트
import styles from './BackgroundOption.module.css';
import {
  designJPG,
  leafJPG,
  studyJPG,
  tileJPG,
} from '@/assets/images/backgrounds';

//배경 상수
const BACKGROUND_OPTIONS = [
  { id: 'GREEN', type: 'color', value: '#E1EDDE' },
  { id: 'YELLOW', type: 'color', value: '#FFF1CC' },
  { id: 'BLUE', type: 'color', value: '#E0F1F5' },
  { id: 'PINK', type: 'color', value: '#FDE0E9' },
  { id: 'DESIGN', type: 'image', value: designJPG },
  { id: 'LEAF', type: 'image', value: leafJPG },
  { id: 'STUDY', type: 'image', value: studyJPG },
  { id: 'TILE', type: 'image', value: tileJPG },
];

function BackgroundOption({ label, name, value, onChange }) {
  return (
    <div className={styles.bgWrap}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.bgGrid}>
        {BACKGROUND_OPTIONS.map((background) => {
          const isSelected = value === background.id;
          const buttonStyle = {
            ...(background.type === 'color'
              ? { backgroundColor: background.value }
              : {}),
            ...(background.type === 'image'
              ? { backgroundImage: `url(${background.value})` }
              : {}),
          };
          return (
            <button
              key={background.id}
              type="button"
              className={`${styles.bgButton} ${value === background.id ? styles.selected : ''}`}
              onClick={() => onChange(isSelected ? null : background.id)}
              style={buttonStyle}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default BackgroundOption;
