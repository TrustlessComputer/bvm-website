import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

type TCategoryItem = {
  leftTitle: string;
  midTitle: string;
  rightTitle?: string;
  link?: string
};
export default function CategoryItem({
                                       data,
                                       index,
                                     }: {
  data: TCategoryItem;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <div onClick={() => {
      data.link && window.open(data.link);
    }} className={cn(s.item, isEven ? s.item__even : s.item__odd, data.link && s.link)}>
      <h5 className={s.item_title}>{data.leftTitle}</h5>
      <div className={s.item_details}>
        <p className={s.item_details_desc}>{data.midTitle}</p>
        {data.rightTitle && (
          <div className={s.item_details_btn}>
            <p className={s.item_details_btn_text}>{data.rightTitle}</p>
            <SvgInset svgUrl='/builder/icon-categories.svg' size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
