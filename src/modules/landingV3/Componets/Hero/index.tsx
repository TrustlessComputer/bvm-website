import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';

export default function HeroV3() {
  const router = useRouter();

  return (
    <div className={s.hero}>
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.title}>
            Launch your <br /> own <span>ZK-POWered blockchain</span> on bitcoin
          </p>
          <div className={s.btn} onClick={() => router.push('/pricing')}>
            Launch now
          </div>
          <p className={s.label}>From $99 per chain/month</p>
        </div>
      </div>
      <ScrollMore />
    </div>
  );
}
