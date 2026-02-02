import design from '/src/assets/images/backgrounds/bgDesign.jpg';
import leaf from '/src/assets/images/backgrounds/bgLeaf.jpg';
import study from '/src/assets/images/backgrounds/bgStudy.jpg';
import tile from '/src/assets/images/backgrounds/bgTile.jpg';

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
function BackgroundOption({ value, onSelect }) {
  return (
    <div>
      {BACKGROUND_OPTIONS.map((background) => (
        <button
          key={background.id}
          type="button"
          className={`bgButton ${value === background.id ? 'selected' : ''}`}
          onClick={() => onSelect(background.id)}
          style={
            background.type === 'color'
              ? { backgroundColor: background.value }
              : { backgroundImage: `url(${background.value})` }
          }
        ></button>
      ))}
    </div>
  );
}

export default BackgroundOption;


