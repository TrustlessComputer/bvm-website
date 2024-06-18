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
            BitZK
          </h2>
          <h3 className={s.subTitle}>
            Launch a ZK Rollup on Bitcoin for $99/mo.
          </h3>
          <p className={s.desc}>
            BitZK brought Zero Knowledge to Bitcoin, so you can easily launch and scale your own ZK Rollup on Bitcoin.
          </p>
          <div className={s.btn} onClick={() => router.push('/pricing')}>
            Launch now
          </div>
          <button className={s.read}>
            Read Docs
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 12L10.5 8L6.5 4" stroke="black" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <ScrollMore />
    </div>
  );
}
