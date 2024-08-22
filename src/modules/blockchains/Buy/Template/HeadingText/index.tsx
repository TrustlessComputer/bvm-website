import React, {PropsWithChildren, useEffect, useRef} from 'react';
import s from './styles.module.scss';
import {gsap} from 'gsap';
import {Text} from "@chakra-ui/react";
import Chars from '@/modules/blockchains/Buy/Template/anim/Chars';

interface IProp extends PropsWithChildren {
    first: string;
    headings: string[];
    headingsStyles: any[];
    headingsColors?: string[];
    last: string;
}

export default function HeadingText({headings, headingsStyles, first, last, headingsColors}: IProp) {
    const refCOntent = useRef<HTMLDivElement>(null);
    const list = useRef<any>()
    const refNext = useRef(-1);
    const refLoop = useRef<any>()
    const refTime = useRef<any>()

    useEffect(() => {
        if (!refCOntent.current) return;
        list.current = refCOntent.current.querySelectorAll('.js-el');
        gsap.set(list.current, {yPercent: 100});
    }, []);


    const nextSlide = () => {
        const old = refNext.current;
        refNext.current++;
        if (refNext.current >= list.current.length) {
            refNext.current = 0;
        }

        gsap.to(list.current[old], {yPercent: -100, ease: 'power3.out', duration: .6});
        gsap.fromTo(list.current[refNext.current], {yPercent: 100}, {yPercent: 0, ease: 'power3.out', duration: .6});

    }

    useEffect(() => {
        refTime.current = setTimeout(nextSlide, 500);
        refLoop.current = setInterval(nextSlide, 3000);
        return () => {
            clearInterval(refLoop.current);
            clearTimeout(refTime.current);
        }
    }, []);

    return (
        <div ref={refCOntent} className={s.heading}>
            <Chars>
                {first}
            </Chars>
            <span className={s.heading_mask}>
          {
              headings.map((h, index) => {
                  return (
                      <Text as="span"
                            key={headingsStyles?.[index] || h}
                            color={headingsColors && headingsColors?.[index]}
                            className={`${s.heading_mask_el} js-el ${headingsStyles?.[index]}`}
                      >
                          {h}
                      </Text>
                  )
              })
          }
      </span>
            <Chars delay={.7}>
                {last}
            </Chars>
        </div>
    );
}
