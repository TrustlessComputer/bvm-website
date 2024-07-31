import s from '@/modules/landingV3/Componets/CaseStudy/styles.module.scss';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useScrollingSectionStore } from '@/modules/landingV3/Componets/ScrollingSection/useScrollingSectionStore';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

export default function CaseStudyContent({ idx }: { idx?: number }) {

  const refContent = useRef<HTMLDivElement>(null);
  const { setSectionActive } = useScrollingSectionStore();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (idx === undefined) return;
    gsap.fromTo(refContent.current, { opacity: 0 }, {
      scrollTrigger: {
        trigger: refContent.current,
        start: 'top bottom-=10%',
        end: 'bottom bottom-=10%',
        // markers: true,
        scrub: true,
        onToggle: (self) => {
          if (self.isActive) {
            setSectionActive(idx);
          }
        },
      }, opacity: 1, ease: 'power3.inOut', duration: .4,
    });
  });

  return <div className={s.inner_right} ref={refContent}>
    <p className={s.tag}>Case Study</p>
    <div className={s.inner_img}>
      <img src="/trump.png" alt="Case Study" />
    </div>
    <div className={s.caseStudy}>
      <p className={s.caseStudy_title}>BITCOIN WARS</p>
      <p className={s.caseStudy_description}>The first fully on-chain game built on a ZK Rollup on <span>the Bitcoin
        network</span>.</p>
    </div>
    <div className={s.caseStudy_button}>
      <Link href="/bitcoinwars">Learn more</Link>
    </div>
  </div>;

}
