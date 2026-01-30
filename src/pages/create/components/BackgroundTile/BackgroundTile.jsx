import style from './BackgroundTile.module.css';
import footprint from '/src/assets/images/icons/ic_bg_selected.svg';

export function BackgroundTile({ isSelected, onSelect, background }) {
  return (
    <div
      className={style.tile}
      style={{
        '--tile-bg': background?.img
          ? `url(${background.img})`
          : background?.color,
      }}
      onClick={() => onSelect(background.id)}
    >
      {isSelected && (
        <img className={style.footprint} src={footprint} alt="배경 선택됨" />
      )}
    </div>
  );
}
