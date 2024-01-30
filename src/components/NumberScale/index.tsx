import { proxy } from 'valtio';
import { useEffect, useRef } from 'react';
import { formatCurrency } from '@/utils/format';
import { gsap } from 'gsap';

interface IProp {
  couters: number;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  label: string;
  defaultFrom?: string;
}
export default function NumberScale({
  couters,
  minimumFractionDigits,
  maximumFractionDigits,
  label,
  defaultFrom,
}: IProp) {
  const cx = proxy<{ value: number }>({
    value: parseFloat(defaultFrom || '0'),
  });
  const refFrom = useRef<any>(defaultFrom);
  const refContent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.from(cx, {
      value: refFrom.current,
      duration: 3,
      ease: 'power3.out',
      onUpdate: () => {
        if (refContent.current) {
          refContent.current.innerHTML =
            `${label}` +
            formatCurrency(
              cx.value,
              minimumFractionDigits,
              maximumFractionDigits,
              '',
              true,
            );
        }
      },
    });
    gsap.to(cx, {
      value: couters,
      duration: 3,
      ease: 'power3.out',
      onUpdate: () => {
        if (refContent.current) {
          refContent.current.innerHTML =
            `${label}` +
            formatCurrency(
              cx.value,
              minimumFractionDigits,
              maximumFractionDigits,
              '',
              true,
            );
          refFrom.current = couters;
        }
      },
    });
  }, [couters, refFrom.current]);

  return <div ref={refContent}></div>;
}
