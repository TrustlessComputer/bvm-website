import Image from 'next/image';
import s from './styles.module.scss';

type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage: string;
};

const CardFi = ({ ...props }: TCardFiProps) => {
  return (
    <div className={s.cardFiContainer}>
      <div className={s.cardFiImage} style={{backgroundColor: props.bgColorImage}}>
        <Image width={260} height={260} src={props.image} alt={props.image} />
      </div>
      <div className={s.cardFiContent}>
        <div className={s.cardFiContent_inner}>
          <p className={s.cardFiContent_title}>{props.title}</p>
          <p className={s.cardFiContent_des}>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardFi;
