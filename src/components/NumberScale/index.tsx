import { proxy } from 'valtio';
import { useEffect, useRef } from 'react';
import { formatCurrency } from '@/utils/format';
import {gsap} from 'gsap';

interface IProp { couters: number; minimumFractionDigits: number ; maximumFractionDigits: number, label: string}
export default function NumberScale({ couters, minimumFractionDigits, maximumFractionDigits, label }: IProp) {
  const cx = proxy<{ value: number }>({ value: 0 });
  const refContent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const gc = gsap.context(()=>{
      gsap.to(cx, {
        value: couters, duration: 3, ease: 'power3.out', onUpdate: () => {
          if (refContent.current) {
            refContent.current.innerHTML = `${label}`+formatCurrency(
              cx.value,
              minimumFractionDigits,
              maximumFractionDigits,
              '',
              true,
            );
          }
        },
      });
    });

    return ()=>{
      gc.revert()
    }
  }, [couters]);

  return <div ref={refContent}>

  </div>;
}
