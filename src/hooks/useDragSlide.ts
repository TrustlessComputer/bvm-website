import { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export function useDragSlide(sliderRef: any) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  useIsomorphicLayoutEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener('mousedown', (e: any) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
    return () => {
      slider.removeEventListener('mousedown', (e: any) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.removeEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.removeEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.removeEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
      });
    };
  }, [sliderRef]);
}
