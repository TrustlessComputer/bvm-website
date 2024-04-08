import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import cn from 'classnames';
import SvgInset from '@/components/SvgInset';
import SubCardText from './SubCardText';
import SubCardIcon from './SubCardIcon';

type TCardExplore = {
  subTitle: string;
  link: string;
  color: string;
  title: string;
  backgroundImg: string;
  decs: string;
  type: 'solutions' | 'modules';
  icon?: string;
};
export default function CardExplore({
  color,
  decs,
  backgroundImg,
  link,
  subTitle,
  title,
  type,
  icon,
}: TCardExplore) {
  return (
    <div className={cn(s.wrapper, !backgroundImg && s.wrapper_bg)}>
      {backgroundImg && (
        <Image
          alt={`img${title}`}
          src={backgroundImg}
          width={511}
          height={289}
          className={s.wrapper_image}
        />
      )}
      <div className={s.inner}>
        <div className={s.inner_topSection}>
          <div
            className={cn(
              s.inner_topSection_subTitle,
              s[`inner_topSection_subTitle__${type}`],
            )}
          >
            <p
              className={cn(
                s.inner_topSection_subTitle_text,
                color && s[`inner_topSection_subTitle_text__${color}`],
              )}
            >
              {subTitle}
            </p>
          </div>
          <SvgInset
            className={s.inner_topSection_button}
            svgUrl="/landing-v2/svg/arrow-r-t.svg"
            size={20}
          />
        </div>
        {type === 'modules' ? (
          <SubCardIcon decs={decs} title={title} icon={icon as string} />
        ) : (
          <SubCardText decs={decs} title={title} />
        )}
      </div>
    </div>
  );
}
