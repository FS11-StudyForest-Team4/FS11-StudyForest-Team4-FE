//배경 이미지 import
import design from '/src/assets/images/backgrounds/bgDesign.jpg';
import leaf from '/src/assets/images/backgrounds/bgLeaf.jpg';
import study from '/src/assets/images/backgrounds/bgStudy.jpg';
import tile from '/src/assets/images/backgrounds/bgTile.jpg';
import styles from './BackgroundOption.module.css';
//배경 상수
const BACKGROUND_OPTIONS = [
  { id: 'GREEN', type: 'color', value: '#E1EDDE' },
  { id: 'YELLOW', type: 'color', value: '#FFF1CC' },
  { id: 'BLUE', type: 'color', value: '#E0F1F5' },
  { id: 'PINK', type: 'color', value: '#FDE0E9' },
  { id: 'DESIGN', type: 'image', value: design },
  { id: 'LEAF', type: 'image', value: leaf },
  { id: 'STUDY', type: 'image', value: study },
  { id: 'TILE', type: 'image', value: tile },
];

function BackgroundOption({ value, onChange }) {
  return (
    <div>
      <h3>배경을 선택해주세요 </h3>
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
            >
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BackgroundOption;
