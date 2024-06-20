import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';
import Experience from '@/modules/landingV3/Componets/Experience';
import { useRef } from 'react';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';


export default function HeroV3() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { showContactUsModal } = useContactUs();
  return (
    <div className={s.hero} ref={ref}>
      <div className={s.inner}>
        <div className={s.content}>
          <h3 className={s.subTitle}>ZK Rollups on Bitcoin for <strong>$99/mo</strong>.</h3>
          <p className={s.desc}>
            BVM brought Zero Knowledge to Bitcoin, so you can easily launch and scale your own ZK Rollup on Bitcoin.
          </p>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => router.push('/pricing')}
            >
              Get started with BitZK
            </div>
            {' '}
            <div
              onClick={() => {
                showContactUsModal();
              }}
              className={`${s.btn} ${s.btn__secondary}`}>
              Connect with a BVM team member
            </div>
          </div>
        </div>
      </div>
      <ScrollMore />
      <Experience refParent={ref} />
    </div>
  );
}
