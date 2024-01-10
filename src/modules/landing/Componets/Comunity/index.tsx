import React from 'react';
import community_img from '@/public/landing/images/community_img.jpg';
import s from './styles.module.scss';
import Image from 'next/image';
import ItemCommunity from './ItemCommunity';

const DATA_COMMUNITY = [
  'Earn sequencer fees',
  'Offer low transaction fees to your users',
  'Have dedicated throughput',
  'Complete control over gas fee, gas block limit, and withdrawal periods',
];

function Comunity() {
  return (
    <div className={s.community}>
      <div className="container">
        <div className={s.community_inner}>
          <Image
            src={community_img}
            width={community_img.width}
            height={community_img.height}
            alt="coommunity"
          />
          <div className={s.community_inner_right}>
            <div className={s.community_inner_right_heading}>
              <h3 className={s.community_inner_right_heading_main}>
                Why launch <span>your own blockchain?</span>
              </h3>
              <p className={s.community_inner_right_heading_des}>
                Whatever your vision — a dapp, a fully onchain game, a DEX, or
                an ecosystem — there are many benefits of running your own
                blockchain.
              </p>
            </div>
            <div className={s.community_inner_right_content}>
              {DATA_COMMUNITY.map((item) => {
                return <ItemCommunity content={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comunity;
