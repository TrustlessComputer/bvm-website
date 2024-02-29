import React from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import Chars from '@/interactive/Chars';
import SvgInset from '@/components/SvgInset';
import { Tooltip } from 'react-tooltip';

const Airdrop = ({
  isAirdrop2Page = false,
}: {
  isAirdrop2Page: boolean;
}): React.JSX.Element => {
  return (
    <div className={s.airdrop}>
      <div className={isAirdrop2Page ? '' : 'container'}>
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
                  <h3 className={s.details_item_val}>70% For Builders</h3>
                </Fade>
                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.2}>
                  <p className={s.details_item_text}>
                    For builders and projects with mainnet Bitcoin L2s powered
                    by BVM
                    <span>
                      <a id="my-anchor-element_ic_sharp_50">
                        <img src="/builder/svg-details.svg" alt="ic_sharp" />
                      </a>
                      <Tooltip anchorSelect="#my-anchor-element_ic_sharp_50">
                        <b>500,000 $BVM</b> will be distributed proportionally
                        among all projects with mainnet Bitcoin L2s based on
                        their TVL
                        <b> 200,000 $BVM</b> will be used as grants to help
                        eligible projects cover their Bitcoin L2 launching cost
                      </Tooltip>
                    </span>
                    {/*<span>*/}
                    {/*  <SvgInset svgUrl="/builder/svg-details.svg" />*/}
                    {/*</span>*/}
                  </p>
                </Fade>
              </div>

              <div className={s.details_item}>
                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.4}>
                  <h3 className={s.details_item_val}>30% For Users</h3>
                </Fade>

                <Fade from={{ y: 10 }} to={{ y: 0 }} delay={0.6}>
                  <p className={s.details_item_text}>
                    For all users who contribute and interact with dapps of any
                    Bitcoin L2 within the BVM ecosystem.
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
