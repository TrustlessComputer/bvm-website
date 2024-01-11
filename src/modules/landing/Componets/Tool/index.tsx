import React from 'react';
import s from './styles.module.scss';
import tool_img from '@/public/landing/images/tool_img.png';
import Image from 'next/image';
import ItemTool from './ItemTool';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import Scale from '@/interactive/Scale';
import useWindowSize from '@/hooks/useWindowSize';

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

export default function Tool() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  return (
    <section className={s.tool}>
      <div className="container">
        <div className={s.tool_heading}>
          <h2 className={s.tool_heading_text}>
            {mobileScreen || tabletScreen ? (
              <>
                <span className={s.tool_heading_text_hightlight}>
                  A no-code tool
                </span>
                &nbsp;for building a full-featured Bitcoin L2 blockchain.
              </>
            ) : (
              <>
                <Chars delay={0.1}>
                  <span className={s.tool_heading_text_hightlight}>
                    A no-code tool
                  </span>
                  &nbsp;for
                  <span>building a full-featured</span>
                  <span> Bitcoin L2 blockchain.</span>
                </Chars>
              </>
            )}
          </h2>
          {mobileScreen || tabletScreen ? (
            <Image
              className={s.tool_heading_img}
              src={tool_img}
              width={tool_img.width}
              height={tool_img.height}
              alt="tool"
            />
          ) : (
            <Fade from={{ x: 50 }} to={{ x: 0 }} delay={0.3}>
              <Scale delay={0.2}>
                <Image
                  className={s.tool_heading_img}
                  src={tool_img}
                  width={tool_img.width}
                  height={tool_img.height}
                  alt="tool"
                />
              </Scale>
            </Fade>
          )}
        </div>
        <Fade delay={0.4}>
          <div className={s.tool_content}>
            {DATA_CONTENT.map((item, index) => {
              return (
                <ItemTool
                  key={index}
                  delay={0.5 + index / 5}
                  data={{
                    index: index,
                    length: 2,
                    ...item,
                  }}
                />
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
}
