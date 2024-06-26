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
            Launch your own ZK Rollup on Bitcoin for $99/mo.
          </h3>
          <div className={s.desc}>
            <p> Bitcoin Virtual Machines are ZK Rollups on Bitcoin, making it easy to build apps on Bitcoin.</p>
            <p>Spin one up with a single click, deploy some Solidity smart contracts like on Ethereum, and launch your Bitcoin app — it’s that easy.</p>
            <p>It’s Bitcoin, upgraded.</p>
          </div>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => {
                tracking('GET_STARTED');
                router.push('/pricing');
              }}
            >
              Get started
            </div>
            {' '}
            <div
              onClick={() => {
                window.open('https://docs.bvm.network/bvm')
              }}
              className={`${s.btn} ${s.btn__secondary}`}
            >
              Developer guides
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#FA4E0E"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <ImagePlaceholder className={s.imageHero} src={'/bvm/hero-banner.png'} width="694" height="579" alt={'hero'} />
      </div>
      <Brand />
    </div>
  );
}
