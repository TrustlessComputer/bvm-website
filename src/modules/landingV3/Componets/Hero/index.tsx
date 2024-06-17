import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';

export default function HeroV3() {
  const router = useRouter();

  return (
    <div className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.title}>
            Be the first to launch a <span>ZK Rollup</span> on Bitcoin
          </h2>
          <p className={s.desc}>
            Secured by advanced math and cryptography, ZK rollups provide unlimited scale for Bitcoin while retaining its security and decentralization. They are high-performance, verifiable, and modular. Oh, and did we mention they are EVM-equivalent, too?
          </p>
          <div className={s.btn} onClick={() => router.push('/pricing')}>
            Launch now
          </div>
          <p className={s.label}>From $99 per month</p>
        </div>
      </div>
      <ScrollMore />
    </div>
  );
}
