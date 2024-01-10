import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';

type TItemTool = {
  step: string;
  title: string;
  description: string;
  index: number;
  length: number;
};

function ItemTool({ data, delay }: { data: TItemTool, delay: number }) {
  const isFrist = data.index === 0;
  const isLast = data.index === data.length;

  const svgUrl = isFrist
    ? '/landing/svg/frame_tool_fill.svg'
    : '/landing/svg/frame_tool_mid.svg';

  return (
    <div className={s.itemTool}>
      <Fade from={{x: 20}} to={{x: 0}} delay={delay}>
        <div className={s.itemTool_step}>
          <SvgInset svgUrl={svgUrl} />
          {!isLast && <span className={s.itemTool_step_stud}></span>}
          <p className={s.itemTool_step_text}>
            <Chars delay={delay + .1}>
              {data.step}
            </Chars>
          </p>
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
      </Fade>
    </div>
  );
}

export default ItemTool;
