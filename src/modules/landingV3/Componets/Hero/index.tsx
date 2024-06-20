import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';
import SvgInset from '@/components/SvgInset';

export default function HeroV3() {
  const router = useRouter();

  return (
    <div className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.content_heading}>
            <SvgInset
              svgUrl="/landingV3/svg/logo_hero.svg"
              height={80}
              size={80}
            />
            <h2 className={s.title}>BitZK</h2>
          </div>
          <h3 className={s.subTitle}>ZK Rollups on Bitcoin for $99/mo.</h3>
          <p className={s.desc}>
            BVM brought Zero Knowledge to Bitcoin, so you can easily launch and
            scale your own ZK Rollup on Bitcoin.
          </p>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => router.push('/pricing')}
            >
              Get started with BitZK
            </div>{' '}
            <div className={`${s.btn} ${s.btn__secondary}`}>
              Connect with a BVM team member
            </div>
          </div>
        </div>
      </div>
      <ScrollMore />
    </div>
  );
}
