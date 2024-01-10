import s from './style.module.scss';
import ScalableItem from '@/modules/landing/Componets/Scalable/ScalableItem';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScalableContent from '@/modules/landing/Componets/Scalable/ScalableContnet';
import { useEffect, useRef, useState } from 'react';
import { useIsInViewportOnce } from '@/hooks/useIsInViewportOnce';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';


const DATA_SCALABLE = [
  {},
];

export default function Scalable() {

  const refContent = useRef<HTMLDivElement>(null);

  const refContent1 = useRef<HTMLDivElement>(null);
  const refContent2 = useRef<HTMLDivElement>(null);

  const refSlide = useRef({ index: 0 });
  const [indexActive, setIndexActive] = useState(0);

  const inView = useIsInViewportOnce(refContent, { threshold: 0 });
  const refItems = useRef<NodeListOf<HTMLDivElement>>();

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [inView]);

  useEffect(() => {

    const animation = (tout: HTMLDivElement, tin: HTMLDivElement) => {

      const tout_image = tout.querySelector('.js-image');
      gsap.to(tout_image, { scale: 1.1, ease: 'power3.inOut', duration: 1 });
      gsap.to(tout, { zIndex: 1, y: -160, ease: 'power3.inOut', duration: 1 });

      const tin_image = tin.querySelector('.js-image');
      gsap.fromTo(tin_image, { scale: 1.2 }, { scale: 1, ease: 'power3.inOut', duration: 1 });
      gsap.fromTo(tin, { '--clipPath': 'inset(100% 0% 0% 0%)', y: 0, zIndex: 2 }, { '--clipPath': 'inset(0% 0% 0% 0%)', ease: 'power3.inOut', duration: 1 });

    };

    const gc = gsap.context(() => {

      refItems.current = refContent.current?.querySelectorAll('.js-scalableItem');
      if (!refItems.current || !refItems.current.length) return;

      refItems.current?.forEach((item, index) => {
        if (index === 0) return;
        const tin_image = item.querySelector('.js-image');
        gsap.set(tin_image, { scale: 1.2 });
        gsap.set(item, { '--clipPath': 'inset(100% 0% 0% 0%)' });
      });

      ScrollTrigger.create({
        trigger: refContent1.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          refItems.current && animation(refItems.current[0], refItems.current[1]);
          setIndexActive(1);
        },
        onEnterBack: (s) => {
          refItems.current && animation(refItems.current[2], refItems.current[1]);
          setIndexActive(1);
        },

        onLeaveBack: (s) => {
          refItems.current && animation(refItems.current[1], refItems.current[0]);
          setIndexActive(0);
        },
      });

      ScrollTrigger.create({
        trigger: refContent2.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          refItems.current && animation(refItems.current[1], refItems.current[2]);
          setIndexActive(2);
        },
      });

    }, [refContent.current]);

    return () => gc.revert();
  }, []);

  return <div className={s.scalable} ref={refContent}>

    <div className={s.scalable_wrap}>
      <div className={s.scalable_top}>
        <div className={s.scalable_top_inner}>
          <h2 className={s.scalable_heading}>
            <Chars>
              Scalable infrastructure for Bitcoin
            </Chars>
          </h2>
          <div className={s.scalable_content}>
            <Lines delay={.1}>
              If Ethereum is the world’s computer, Bitcoin is the world’s supercomputer. With Bitcoin Virtual Machine,
              anyone
              can launch their own Bitcoin L2 blockchain.
            </Lines>
          </div>
        </div>
      </div>
      <div className={s.scalable_inner}>
        <ScalableItem layer={1} />
        <ScalableItem layer={2} />
        <ScalableItem layer={3} />
      </div>


      <div className={s.scalable_bottom}>
        <ScalableContent indexActive={indexActive === 0} title={'Unlimited throughput'}>
          Hyperscale Bitcoin with an unlimited number of Bitcoin Virtual Machines as Bitcoin L2 blockchains.
        </ScalableContent>
        <ScalableContent indexActive={indexActive === 1} title={'Infinite applications'}>
          Bitcoin Virtual Machines support Solidity smart contracts on Bitcoin, so you can quickly build all kinds of
          decentralized applications on Bitcoin.
        </ScalableContent>
        <ScalableContent indexActive={indexActive === 2} title={'Fast & cheap'}>
          Bitcoin Virtual Machines implement rollups on Bitcoin. Rollups significantly reduce the block time and
          transaction fees.
        </ScalableContent>
      </div>
    </div>
    <div ref={refContent1} className={s.target}></div>
    <div ref={refContent2} className={s.target}></div>
  </div>;
}
