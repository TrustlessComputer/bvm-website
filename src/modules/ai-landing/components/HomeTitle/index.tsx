import React, { PropsWithChildren } from 'react';
import s from './style.module.scss';
import HeadingTyping from '@/interactive/Signal/Chars/typing';

type IHomeTitle = {
  isBlack?: true;
  className?: string;
  spanWhite?: boolean;
};

const HomeTitle: React.FC<PropsWithChildren<IHomeTitle>> = ({
  children,
  className,
  isBlack,
  spanWhite
}) => {
  return (
    <HeadingTyping>
      <h2 className={`${s.title} ${className} ${isBlack ? s.black : ''} ${spanWhite ? s.spanWhite : s.spanOpacity}`} >
        {children}
      </h2>
    </HeadingTyping>
  );
};

export default HomeTitle;
