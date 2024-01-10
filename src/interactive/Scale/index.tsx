import {PropsWithChildren, useCallback, useRef} from "react";
import {gsap} from "gsap";
import useAnimation from "@/hooks/useAnimation";

interface IProp extends PropsWithChildren {
    delay?: number
}

export default function Scale({children, delay}: IProp) {
    const refContent = useRef<HTMLDivElement>(null)

    const initAnimation = useCallback((): void => {
        refContent.current && gsap.set(refContent.current, {opacity: 0, scale: 1.2});
    }, [])

    const playAnimation = useCallback((): void => {
        refContent.current && gsap.to(refContent.current, {opacity: 1, scale: 1, delay, ease: 'power3.out', duration: .8});
    }, [])

    useAnimation(
        {
            trigger: refContent,
            initAnimation,
            playAnimation,
            threshold: 30
        }
    )

    return <div ref={refContent} className={'anim-scale'}>
        {children}
    </div>
}
