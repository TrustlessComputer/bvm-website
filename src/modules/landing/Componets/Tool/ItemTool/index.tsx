import React from 'react';
import s from './styles.module.scss';

type TItemTool = {
  step: string;
  title: string;
  description: string;
};

function ItemTool({ data }: { data: TItemTool }) {
  return (
    <div className={s.itemTool}>
      <div className={s.itemTool_step}> {data.step}</div>
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
