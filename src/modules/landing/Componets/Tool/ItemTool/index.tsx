import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type TItemTool = {
  step: string;
  title: string;
  description: string;
  index: number;
  length: number;
};

function ItemTool({ data }: { data: TItemTool }) {
  const isFrist = data.index === 0;
  const isLast = data.index === data.length;

  const svgUrl = isFrist
    ? '/landing/svg/frame_tool_fill.svg'
    : isLast
    ? '/landing/svg/frame_tool.svg'
    : '/landing/svg/frame_tool_mid.svg';
  return (
    <div className={s.itemTool}>
      <div className={s.itemTool_step}>
        <SvgInset svgUrl={svgUrl} />
        <p className={s.itemTool_step_text}>{data.step}</p>
      </div>
      <div className={s.itemTool_content}>
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
