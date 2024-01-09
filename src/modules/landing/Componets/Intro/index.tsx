import s from './styles.module.scss'

export default function Intro() {

  return <div className={s.intro}>
    <div className={s.intro_inner}>
      <p className={s.intro_inner_content}>Drag & hold to enter Bitcoin Virtual Machine </p>
      <div className={s.drag}>
        <div className={s.drag_inner}>
          <button><img src='/landing/drag.svg' alt='drag' /></button>
        </div>
        <div className={s.drag_line}></div>
        <button>
          <img src='/landing/subtract.svg' alt='substract' />
        </button>
      </div>
    </div>
  </div>;
}
