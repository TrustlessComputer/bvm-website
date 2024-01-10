import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import useWindowSize from '@/hooks/useWindowSize';

type TItemTool = {
  step: string;
  title: string;
  description: string;
  index: number;
  length: number;
};

function ItemTool({ data, delay }: { data: TItemTool; delay: number }) {
  const isFrist = data.index === 0;
  const isLast = data.index === data.length;
  const { mobileScreen } = useWindowSize();
  const svgUrl = isFrist
    ? '/landing/svg/frame_tool_fill.svg'
    : '/landing/svg/frame_tool_mid.svg';

  return (
    <div className={s.itemTool}>
      <div className={s.itemTool_step}>
        {!mobileScreen && <SvgInset svgUrl={svgUrl} />}
        {!isLast && <span className={s.itemTool_step_stud}></span>}
        <p className={s.itemTool_step_text}>{data.step}</p>
      </div>
      <div
        className={`${s.itemTool_content} ${
          data.index === 1 && s[`itemTool_content__midItem`]
        }`}
      >
        <div className={s.itemTool_content_inner}>
          <p className={s.itemTool_content_inner_title}>{data.title}</p>
          <p className={s.itemTool_content_inner_description}>
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemTool;
