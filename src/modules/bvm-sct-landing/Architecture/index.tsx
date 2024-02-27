import s from './styles.module.scss'
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';
import Fade from '@/interactive/Fade';

const  Architecture = ({children}: any): React.JSX.Element => {
  return (
    <div className={`${s.architectureWrapper}`}>
      <div className={'container'}>
        <Fade delay={0.2}>
          <HeadingSection className={s.heading}>
            Architecture
          </HeadingSection>
        </Fade>
        <Fade delay={0.5}>
          <p className={s.content}>{children}</p>
        </Fade>
      </div>
    </div>
  );
};

export default Architecture;
