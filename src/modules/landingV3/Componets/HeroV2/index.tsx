import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import ImagePlaceholder from '@components/ImagePlaceholder';

export default function HeroV2() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { tracking } = useL2ServiceTracking();

  return (
    <div className={s.hero} ref={ref}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.content}>
          <h3 className={s.subTitle}>
            ZK rollups on Bitcoin anyone can set up in just a few clicks.
          </h3>
          <div className={s.desc}>
           <p> Bitcoin virtual machines are ZK rollups on Bitcoin that make it easy to start building apps on Bitcoin.</p>
            <p>Set up a Bitcoin virtual machine with one click, deploy a Solidity smart contract like you develop on Ethereum, and launch your Bitcoin app to the world — it's that easy. It's Bitcoin, upgraded.</p>
            <p>Join the wave of developers building on Bitcoin today.</p>
          </div>
          <div className={s.groupBtn}>
            <div className={s.pricing}>$99
              <small>per month</small>
            </div>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => {
                tracking('GET_STARTED');
                router.push('/pricing');
              }}
            >
              Get started
            </div>
          </div>
        </div>
        <ImagePlaceholder className={s.imageHero} src={'/bvm/hero-banner.png'} width="694" height="579" alt={'hero'} />
      </div>
      <Brand />
    </div>
  );
}
