import s from './styles.module.scss';
import Fade from '@interactive/Fade';
import Chars from '@interactive/Chars';
import Image from 'next/image';
import React from 'react';


function AirdropV2(): React.JSX.Element {
  return (
    <div className={s.airdrop}>
      <div className={s.inner}>
        <div className={s.content}>
          <Fade>
            <span className={s.label}>Earn the BVM Airdrop</span>
          </Fade>

          <span className={s.val}>
              <Chars>1M $BVM</Chars>
            </span>
          <div className={s.details}>
            <div className={s.details_item}>
              <Fade>
                <span className={s.label}>For Builders</span>
              </Fade>
              <Fade from={{ y: 10 }} to={{ y: 0 }}>
                <h3 className={s.details_item_val}>70%</h3>
              </Fade>
              <Fade>
                <p className={s.details_item_text}>
                  <b>500,000</b> $BVM will be distributed proportionally among all projects with mainnet Bitcoin L2s based on their TVL
                </p>
              </Fade>
              <Fade>
                <p className={s.details_item_text}>
                  <b> 200,000</b> $BVM will be used as grants to help eligible projects cover their Bitcoin L2 launching cost
                </p>
              </Fade>
            </div>
            <div className={s.line}></div>
            <div className={s.details_item}>
              <Fade>
                <span className={s.label}>For Users</span>
              </Fade>
              <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.4}>
                <h3 className={s.details_item_val}>30%</h3>
              </Fade>
              <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.6}>
                <p className={s.details_item_text}>
                  For all users who contribute and interact with dapps of any Bitcoin L2 within the BVM ecosystem.
                </p>
              </Fade>
            </div>
          </div>
        </div>
      </div>
      <div className={s.inner_image}>
        <Fade delay={0.8}>
          <Image
            src={'/builder/airdropV2.png'}
            width={1910}
            height={1892}
            alt={'airdrop'}
          />
        </Fade>
      </div>
    </div>
  )
}

export default AirdropV2
