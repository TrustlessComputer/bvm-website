import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useRouter } from 'next/navigation';

export default function HeroV3() {
  const router = useRouter();

  return (
    <div className={s.hero}>
      <div className={s.inner}>
        {/* <div className={s.overlay}>
          <ImagePlaceholder src={'/overlay.png'} alt={'overlay'} width={1920} height={1080} />
        </div> */}
        <div className={s.content}>
          <p className={s.title}>
            Launch your <br /> own <span>ZK-POWeered blockchain</span> on
            bitcoin
          </p>
          <div className={s.btn} onClick={() => router.push('')}>
            Launch now
          </div>
          <p className={s.label}>From $99 per chain/month</p>
        </div>
      </div>
    </div>
  );
}
