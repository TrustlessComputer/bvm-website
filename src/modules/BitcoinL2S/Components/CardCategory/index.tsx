import s from './style.module.scss';
import Chars from '@/interactive/Chars';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';
import Fade from '@/interactive/Fade';

type TCardCategoryProps = {
  title: string;
  thumbnail: string;
  content: Array<any>;
  className: string;
}


const CardCategory = ({ ...props }: TCardCategoryProps) => {
  return (
    <div className={`${s.wrapperCard} ${props.className}`}>
      <div className={s.cardImage}>
        <img src={props.thumbnail} alt={props.thumbnail} />
      </div>
      <div className={s.cardContent}>
        <HeadingSection className={s.heading}>
          <Chars>
            {props.title}
          </Chars>
        </HeadingSection>
        {
          props.content.map((content, index) => {
            return (
              <div className={s.cardContentItem}>
                <Fade from={{ y: 30 }} to={{ y: 0 }} delay={index / 10}>
                  <HeadingSection className={s.cardContentItemHeading}>
                    {content.heading}
                  </HeadingSection>
                  <div className={s.cardContentMarkdown}>
                    {content.description}
                  </div>
                </Fade>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default CardCategory;
