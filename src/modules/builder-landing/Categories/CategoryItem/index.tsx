import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

type TCategoryItem = {
  leftTitle: string;
  midTitle: string;
  rightTitle?: string;
  link?: string;
};
export default function CategoryItem({
  data,
  isIntroduce,
  index,
}: {
  data: TCategoryItem;
  index: number;
  isIntroduce?: boolean;
}) {
  const isEven = index % 2 === 0;
  return (
    <div
      onClick={() => {
        data.link && window.open(data.link);
      }}
      className={cn(
        s.item,
        isEven ? s.item__even : s.item__odd,
        data.link && s.link,
        isIntroduce && s.item__introduce,
      )}
    >
      <h5 className={cn(s.item_title, isIntroduce && s.item__introduce_text)}>
        {data.leftTitle}
      </h5>
      <div className={s.item_details}>
        <p
          className={cn(
            s.item_details_desc,
            isIntroduce && s.item__introduce_text,
          )}
        >
          {data.midTitle}
        </p>
        {data.rightTitle && (
          <div className={s.item_details_btn}>
            {isIntroduce ? (
              <p className={s.item__introduce_text}>{data.rightTitle}</p>
            ) : (
              <>
                <p className={s.item_details_btn_text}>{data.rightTitle}</p>
                <SvgInset svgUrl="/builder/icon-categories.svg" size={20} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
