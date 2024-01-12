import s from './style.module.scss';
import ScalableItem from './ScalableItem';
import { gsap } from 'gsap';
import ScalableContent from './ScalableContnet';
import { useEffect, useRef, useState } from 'react';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import ContentSection from '@/modules/landing/Componets/ContentSection';

export default function ScalableSlide() {
  const refContent = useRef<HTMLDivElement>(null);

  const refSlide = useRef({ index: 0 });
  const [indexActive, setIndexActive] = useState(0);
  const refPo = useRef<HTMLDivElement>(null);

  const inView = useIsInViewport(refContent, { threshold: 0 });
  const refItems = useRef<NodeListOf<HTMLDivElement>>();
  const refTime = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const animation = (tout: HTMLDivElement, tin: HTMLDivElement) => {
      const tout_image = tout.querySelector('.js-image');
      gsap.to(tout_image, { scale: 1.1, ease: 'power3.inOut', duration: 1 });
      gsap.to(tout, { zIndex: 1, y: -160, ease: 'power3.inOut', duration: 1 });

      const tin_image = tin.querySelector('.js-image');
      gsap.fromTo(
        tin_image,
        { scale: 1.2 },
        { scale: 1, ease: 'power3.inOut', duration: 1 },
      );
      gsap.fromTo(
        tin,
        { '--clipPath': 'inset(100% 0% 0% 0%)', y: 0, zIndex: 2 },
        {
          '--clipPath': 'inset(0% 0% 0% 0%)',
          ease: 'power3.inOut',
          duration: 1,
        },
      );
    };

    const gc = gsap.context(() => {
      refItems.current =
        refContent.current?.querySelectorAll('.js-scalableItem');
      if (!refItems.current || !refItems.current.length) return;

      refItems.current?.forEach((item, index) => {
        if (index === 0) return;
        const tin_image = item.querySelector('.js-image');
        gsap.set(tin_image, { scale: 1.2 });
        gsap.set(item, { '--clipPath': 'inset(100% 0% 0% 0%)' });
      });

      refTime.current = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      refTime.current.fromTo(
        refPo.current,
        { y: '0%' },
        {
          width: '33.33%',
          duration: 3,
          onStart: () => {
            if (refSlide.current.index === 0) return;

            refItems.current &&
              animation(refItems.current[2], refItems.current[0]);
            refSlide.current.index = 0;
            setIndexActive(0);
          },
        },
      );
      refTime.current.to(refPo.current, {
        width: '66.66%',
        duration: 3,
        onStart: () => {
          refItems.current &&
            animation(refItems.current[0], refItems.current[1]);
          setIndexActive(1);
          refSlide.current.index = 1;
        },
      });
      refTime.current.to(refPo.current, {
        width: '100%',
        duration: 3,
        onStart: () => {
          refItems.current &&
            animation(refItems.current[1], refItems.current[2]);
          setIndexActive(2);
          refSlide.current.index = 2;
        },
      });

      refTime.current.to(refPo.current, {
        x: '100%',
        duration: 1,
        ease: 'power3.inOut',
      });
    }, [refContent.current]);

    return () => gc.revert();
  }, []);

  useEffect(() => {
    if (inView) refTime.current?.resume();
    else refTime.current?.paused();
  }, [inView]);

  return (
    <div className={s.scalable} ref={refContent}>
      <div className={s.scalable_wrap}>
        <div className={s.scalable_top}>
          <div className={s.scalable_top_inner}>
            <HeadingSection className={s.scalable_heading}>
              <Chars>Scalable infrastructure for Bitcoin</Chars>
            </HeadingSection>
            <ContentSection className={s.scalable_content}>
              <Lines delay={0.1}>
                If Ethereum is the world’s computer, Bitcoin is the world’s
                supercomputer. With Bitcoin Virtual Machine, anyone can launch
                their own Bitcoin L2 blockchain.
              </Lines>
            </ContentSection>
          </div>
        </div>
        <div className={s.scalable_inner}>
          <ScalableItem layer={1} />
          <ScalableItem layer={2} />
          <ScalableItem layer={3} />
        </div>
        <div className={s.scalable_bottom}>
          <ScalableContent
            indexActive={indexActive === 0}
            title={'Unlimited throughput'}
          >
            Hyperscale Bitcoin with an unlimited number of Bitcoin Virtual
            Machines as Bitcoin L2 blockchains.
          </ScalableContent>
          <ScalableContent
            indexActive={indexActive === 1}
            title={'Infinite applications'}
          >
            Bitcoin Virtual Machines support Solidity smart contracts on
            Bitcoin, so you can quickly build all kinds of decentralized
            applications on Bitcoin.
          </ScalableContent>
          <ScalableContent
            indexActive={indexActive === 2}
            title={'Fast & cheap'}
          >
            Bitcoin Virtual Machines implement rollups on Bitcoin. Rollups
            significantly reduce the block time and transaction fees.
          </ScalableContent>
          <div className={s.scalable_bottom_po_wrap}>
            <div ref={refPo} className={s.scalable_bottom_po} />
          </div>
        </div>
      </div>
    </div>
  );
}
