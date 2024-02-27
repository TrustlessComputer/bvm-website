import s from './style.module.scss'
import Chars from '@/interactive/Chars';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';

type TCardCategoryProps = {
  title: string;
  thumbnail: string;
  content: Array<any>;
  className: string;
}


const CardCategory = ({...props}: TCardCategoryProps) => {
  return (
    <div className={`${s.wrapperCard} ${props.className}`}>
      <div className={s.cardImage}>
        <img src={props.thumbnail} alt={props.thumbnail} />
      </div>
      <div className={s.cardContent}>
        <HeadingSection className={s.heading}>
          <Chars delay={0.2}>
            {props.title}
          </Chars>
        </HeadingSection>
        {
          props.content.map((content) => {
            return (
              <div className={s.cardContentItem}>
                <HeadingSection className={s.cardContentItemHeading}>
                  <Chars delay={0.2}>
                    {content.heading}
                  </Chars>
                </HeadingSection>
                <div className={s.cardContentMarkdown}>
                  {content.description}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardCategory
