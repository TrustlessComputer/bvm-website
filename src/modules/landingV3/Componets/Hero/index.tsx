import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import ScrollMore from '@components/ScrollMore';
import Experience from '@/modules/landingV3/Componets/Experience';
import { useRef } from 'react';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

import Image from 'next/image';
import SvgInset from '@/components/SvgInset';
import IcLogoText from '../IcLogoText';
import Brand from '../Brand';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';

export default function HeroV3() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { showContactUsModal } = useContactUs();
  const { tracking } = useL2ServiceTracking();

  return (
    <div className={s.hero} ref={ref}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.content}>
          <span className={s.topTitle}>✨ New product</span>
          <h2 className={s.title}>BitZK</h2>
          <h3 className={s.subTitle}>
            Launch a ZK Rollup on Bitcoin for <strong>$99/mo</strong>.
          </h3>
          <p className={s.desc}>
            BVM brought Zero Knowledge to Bitcoin, so you can deploy your own ZK
            Rollup on Bitcoin.
          </p>
          <div className={s.groupBtn}>
            <div
              className={`${s.btn} ${s.btn__primary}`}
              onClick={() => {
                tracking('GET_STARTED');
                router.push('/pricing');
              }}
            >
              Get started
            </div>{' '}
            <div
              onClick={() => {
                tracking('CONTACTS_US');
                showContactUsModal();
              }}
              className={`${s.btn} ${s.btn__secondary}`}
            >
              Contact us
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
        <Experience refParent={ref} />
      </div>
      <Brand />
    </div>
  );
}
