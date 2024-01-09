import {PropsWithChildren, useCallback, useRef} from "react";
import useAnimation from "@/hooks/useAnimation";
import s from './styles.module.scss';
import {gsap} from 'gsap';

interface IProps extends PropsWithChildren {
    delay?: number
};

export default function Fade({children, delay}: IProps) {
    const refContent = useRef<HTMLDivElement>(null)

    const initAnimation = useCallback((): void => {
        refContent.current && gsap.set(refContent.current, {opacity: 0, y: 30});
    }, [])

    const playAnimation = useCallback((): void => {
        refContent.current && gsap.to(refContent.current, {opacity: 1, y: 30, delay, ease: 'power3.out', duration: .8});
    }, [])


    useAnimation(
        {
            trigger: refContent,
            initAnimation,
            playAnimation,
            threshold: 30
        }
    )

    return <div ref={refContent} className={s.fade}>
        {children}
    </div>
}
