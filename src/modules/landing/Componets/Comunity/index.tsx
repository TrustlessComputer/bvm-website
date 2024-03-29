import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';
import Scale from '@/interactive/Scale';
import community_img from '@/public/landing/compress/why-launch.jpg';
import Image from 'next/image';
import ItemCommunity from './ItemCommunity';
import s from './styles.module.scss';

const DATA_COMMUNITY = [
  ' Earn sequencer fees',
  'Offer low transaction fees to your users',
  'Have dedicated throughput',
  'Complete control over gas fee, gas block limit, and withdrawal periods',
];

export default function Comunity() {
  return (
    <div className={s.community}>
      <div className="container">
        <div className={s.community_inner}>
          <div className={s.community_left}>
            <h3 className={s.community_inner_top_heading}>
              <Chars>
                Why launch <span>your own blockchain?</span>
              </Chars>
            </h3>
            <Scale scale={1.2}>
              <Image
                src={community_img}
                width={community_img.width}
                height={community_img.height}
                alt="coommunity"
                className={s.community_inner_bottom_img}
              />
            </Scale>
          </div>
          <div className={s.community_right}>
            <Lines delay={0.2}>
              <p className={s.community_inner_top_text}>
                Whatever your vision — a dapp, a fully onchain game, a DEX, or
                an ecosystem — there are many benefits of running your own
                blockchain.
              </p>
            </Lines>
            <div className={s.community_inner_bottom_content}>
              {DATA_COMMUNITY.map((item, index) => {
                return (
                  <ItemCommunity
                    key={index}
                    delay={0.4 + index / 10}
                    content={item}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
