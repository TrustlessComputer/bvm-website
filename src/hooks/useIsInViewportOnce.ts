import {useEffect, useMemo, useState} from 'react';

const defaultOptions = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIsInViewportOnce(
    ref: any,
    customOptions?: IntersectionObserverInit
) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const options = useMemo(() => {
        return customOptions
            ? {...defaultOptions, ...customOptions}
            : defaultOptions;
    }, [customOptions]);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) => {
                if (entry?.isIntersecting) {
                    setIsIntersecting(entry.isIntersecting);
                    ref.current && observer.unobserve(ref.current);
                    observer.disconnect();
                }
            }, options),
        []
    );

    useEffect(() => {
        ref.current && observer.observe(ref.current);

        return () => {
            ref.current && observer.unobserve(ref.current);
            observer.disconnect();
        };
    }, [observer]);

    return isIntersecting;
}
