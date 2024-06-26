import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import ImagePlaceholder from '@components/ImagePlaceholder';
import IcLogoText from '../IcLogoText';
import IcArrowRight from '../IcArrowRight';
import {WHITEPAPER_DOC_URL} from "@/config";

export default function HeroV2() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { tracking } = useL2ServiceTracking();

  return (
    <div className={s.hero} ref={ref}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.content}>
          <div className={s.content_sub}>
            <IcLogoText />
            <h2 className={s.content_sub_title}>BitZK</h2>
          </div>
          <h3 className={s.subTitle}>
            ZK Rollups <span>on
            Bitcoin</span> <span>for $99/mo.</span>
          </h3>
          <div className={s.desc}>
            <p>
              Spin one up on Bitcoin with a single click, deploy some Solidity
              smart contracts like on Ethereum, and launch your app on <br />
              Bitcoin — it's that easy.
            </p>
          </div>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => {
                tracking('GET_STARTED');
                router.push('/pricing');
              }}
            >
              Deploy now
            </div>
            <div className={`${s.btn} ${s.btn__secondary}`} onClick={() => {
              window.open('https://docs.bvm.network/bvm')
            }}>
              Developer docs
              <IcArrowRight />
            </div>
          </div>
        </div>
        <ImagePlaceholder
          className={s.imageHero}
          src={'/bvm/hero-banner.png'}
          width="694"
          height="579"
          alt={'hero'}
        />
      </div>
      <Brand />
    </div>
  );
}
