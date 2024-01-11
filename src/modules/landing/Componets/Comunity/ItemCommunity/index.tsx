import React from 'react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import Fade from '@/interactive/Fade';
import useWindowSize from '@/hooks/useWindowSize';

export default function ItemCommunity({
  content,
  delay,
}: {
  content: string;
  delay: number;
}) {
  const { mobileScreen } = useWindowSize();
  return (
    <Fade delay={delay}>
      <div className={s.itemCommunity}>
        <div className={s.itemCommunity_inner}>
          <div className={s.itemCommunity_lego}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
            >
              <path
                d="M7.00004 16.4199L0.790039 10.2099L3.62004 7.37988L7.00004 10.7699L16.88 0.879883L19.71 3.70988L7.00004 16.4199Z"
                fill="white"
              />
            </svg>
            <span className={s.itemCommunity_lego_stud}></span>
          </div>
          <p className={s.itemCommunity_content}>
            {content}
            {!mobileScreen && (
              <SvgInset
                className={s.itemCommunity_content_frame}
                svgUrl="/landing/svg/frame_community.svg"
              />
            )}
          </p>
        </div>
      </div>
    </Fade>
  );
}
