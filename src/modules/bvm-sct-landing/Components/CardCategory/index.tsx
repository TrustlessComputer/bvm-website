import React from 'react';
import s from './style.module.scss';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import Fade from '@/interactive/Fade';

type TCardCategoryProps = {
  title: string;
  description: string;
  bgImage: string;
  className: string;
  image: string;
}

const CardCategory = ({...props}: TCardCategoryProps): React.JSX.Element => {
  return <div className={`${s.cardWrapper} ${props.className}`}>
    <div className={`${s.imageWrapper}`}  style={{backgroundColor: props.bgImage}}>
      <img src={props.image} alt="image_bvm" />
    </div>
    <div className={`${s.contentWrapper}`}>
      <Fade delay={0.2}>
        <HeadingSection className={s.heading}>
          {props.title}
        </HeadingSection>
      </Fade>
      <Fade delay={0.2}>
        <p>{props.description}</p>
      </Fade>
    </div>
  </div>
}

export default CardCategory
