import {PropsWithChildren, useCallback, useRef} from "react";
import s from './styles.module.scss'
import {gsap} from 'gsap';
import SplitType from 'split-type';
import useAnimation from "@/hooks/useAnimation";

interface IProp extends PropsWithChildren {
    delay?: number
};
export default function Lines({children, delay}: IProp) {
    const refContent = useRef<HTMLDivElement>(null);
    const refWords = useRef<any>();


    const initAnimation = useCallback(() => {
        if (!refContent.current) return;
        const text = new SplitType(refContent.current, {types: 'lines,words'});
        gsap.set(text.lines, {opacity: 0, y: 30});
        refWords.current = text.lines;

    }, []);

    const playAnimation = useCallback(() => {
        refWords.current && gsap.to(refWords.current, {
            delay,
            opacity: 1, y: 0, ease: 'power3.out', duration: .8, stagger: .1
        })
    }, [])

    useAnimation({
        trigger: refContent,
        playAnimation,
        initAnimation,
        threshold: 50
    })


    return <div ref={refContent} className={s.chars}>
        {children}
    </div>
}
