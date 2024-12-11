import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useDragMask from '@/modules/blockchains/Buy/stores/useDragMask';

export default function useFixScrollOverDrag() {
  const idDragging = useDragMask((state) => state.idDragging);
  const refTime = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const wrapper = document.getElementById('wrapper-data');
    const loop = () => {
      if (wrapper) wrapper.scrollLeft = 0;
    };

    if (idDragging) {
      gsap.ticker.add(loop);
    } else if (refTime.current) {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
    }

    wrapper?.addEventListener('mouseenter', loop);
    return () => {
      if (wrapper) wrapper.scrollLeft = 0;
      gsap.ticker.remove(loop);
      wrapper?.removeEventListener('mouseenter', loop);
    };
  }, [idDragging]);
}
