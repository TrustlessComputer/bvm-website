import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';
import Experience from '@/modules/landingV3/Componets/Experience';
import { useRef } from 'react';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

import Image from 'next/image';

export default function HeroV3() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { showContactUsModal } = useContactUs();
  return (
    <div className={s.hero} ref={ref}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.title}>
            <Image className={s.title_image} src={'/bvm/zkbit.png'} width={160} height={160} alt={'zkbit'} />
            BitZK</h2>
          <h3 className={s.subTitle}>Launch a ZK Rollup on Bitcoin for <strong>$99/mo.</strong>
          </h3>
          <p className={s.desc}>
            We brought Zero Knowledge to Bitcoin, so you can easily build your own ZK Rollup on Bitcoin.
          </p>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => router.push('/pricing')}
            >
              Get started
            </div>
            {' '}
            <div
              onClick={() => {
                showContactUsModal();
              }}
              className={`${s.btn} ${s.btn__secondary}`}>
              Contact us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                      stroke-linejoin="round"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ScrollMore />
      <Experience refParent={ref} />
    </div>
  );
}
