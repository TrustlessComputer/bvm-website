import s from './styles.module.scss';


interface IProps {
  src: string
}
export default function GameFrame({ src }: IProps) {
  return (
    <div className={s.container}>
      <img loading={'eager'} src={src} alt="game-frame" />
    </div>
  );
}
