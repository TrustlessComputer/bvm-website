import { useEffect, useMemo, useState } from "react";

const defaultOptions = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 1,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useIsInViewport(
  ref: any,
  customOptions?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const options = useMemo(() => {
    return customOptions
      ? { ...defaultOptions, ...customOptions }
      : defaultOptions;
  }, [customOptions]);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (!entry) return setIsIntersecting(false);
        return setIsIntersecting(entry.isIntersecting), options;
      }),
    []
  );

  useEffect(() => {
    ref.current && observer.observe(ref.current);

    return () => {
      ref.current && observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
