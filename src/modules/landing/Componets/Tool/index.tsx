import React from 'react';
import s from './styles.module.scss';
import tool_img from '@/public/landing/images/tool_img.png';
import Image from 'next/image';
import ItemTool from './ItemTool';

const DATA_CONTENT = [
  {
    step: 'Step 1',
    title: 'Choose a rollup method',
    description: 'Optimistic rollups or ZK rollups',
  },
  {
    step: 'Step 2',
    title: 'Choose a block time',
    description: '10s, 5s, or 2s — entirely up to you.',
  },
  {
    step: 'Step 3',
    title: 'Choose pre-installed dapps',
    description: 'DEX, DAO, NFT marketplace, and more over time.',
  },
];

function Tool() {
  return (
    <section className={s.tool}>
      <div className="container">
        <div className={s.tool_heading}>
          <Image
            className={s.tool_heading_img}
            src={tool_img}
            width={tool_img.width}
            height={tool_img.height}
            alt="tool"
          />
          <h2 className={s.tool_heading_text}>
            <span>
              <span className={s.tool_heading_text_hightlight}>
                A no-code tool
              </span>
              &nbsp;for building a
            </span>
            <span>full-featured Bitcoin L2 blockchain.</span>
          </h2>
        </div>
        <div className={s.tool_content}>
          {DATA_CONTENT.map((item) => {
            return <ItemTool data={item} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Tool;
