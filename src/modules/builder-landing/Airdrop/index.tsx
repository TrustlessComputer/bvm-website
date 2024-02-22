import React from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import SvgInset from '@/components/SvgInset';

const Airdrop = (): React.JSX.Element => {
  return (
    <div className={s.airdrop}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.content}>
            <Fade>
              <span className={s.label}>Earn the BVM Airdrop</span>
            </Fade>

            <span className={s.val}>
              <Chars>1,000,000 $BVM</Chars>
            </span>
            <div className={s.details}>
              <div className={s.details_item}>
                <Fade from={{ y: 10 }} to={{ y: 0 }}>
                  <h3 className={s.details_item_val}>70%</h3>
                </Fade>
                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.2}>
                  <p className={s.details_item_text}>
                    For builders
                    <span>
                      <SvgInset svgUrl="/builder/svg-details.svg" />
                    </span>
                  </p>
                </Fade>
              </div>

              <div className={s.details_item}>
                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.4}>
                  <h3 className={s.details_item_val}>30%</h3>
                </Fade>

                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.6}>
                  <p className={s.details_item_text}>
                    For users across all Bitcoin L2 in the BVM ecosystem
                  </p>
                </Fade>
              </div>
            </div>
          </div>
          <div className={s.inner_image}>
            <Fade delay={0.8}>
              <Image
                src={'/builder/airdrop.jpeg'}
                width={1440}
                height={586}
                alt={'airdrop'}
              />
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
