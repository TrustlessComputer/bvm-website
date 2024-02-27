import Image from 'next/image';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage: string;
};

const CardFi = ({ ...props }: TCardFiProps) => {
  return (
    <Fade from={{ y: 40 }} to={{ y: 0 }}>
      <div className={s.cardFiContainer}>
        <div className={s.cardFiImage} style={{ backgroundColor: props.bgColorImage }}>
          <ImagePlaceholder width={260} height={260} src={props.image} alt={props.image} />
        </div>
        <div className={s.cardFiContent}>
          <div className={s.cardFiContent_inner}>
            <p className={s.cardFiContent_title}>{props.title}</p>
            <p className={s.cardFiContent_des}>{props.description}</p>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default CardFi;
