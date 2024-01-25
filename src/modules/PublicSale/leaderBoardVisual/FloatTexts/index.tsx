import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import { MathMap } from '@/utils/mathUtils';
import { CDN_URL_IMAGES } from '@/config';

const AnimatedText = () => {
  const chars = ['$', '$', '$', '$', '$'];
  const containerRef = useRef(null);

  const add = (_url, _money) => {
    const element = document.createElement('span');
    element.classList.add(s.moneyChange)
    containerRef.current.appendChild(element);

    const duration = Math.max(Math.floor(Math.random() * 15) + 1 , 2);
    const offset = MathMap(Math.random(), 0, 1, 40, 350);

    element.style.cssText = `right:${offset}px; transform:scale(${Math.min(Math.max(money / 200, .6), 2)}); animation-duration:${duration}s`;
    element.innerHTML = `<div><img src="/images/avt.jpg" /> <span>+ $${money.toFixed(0)}</span></div>`;

     window.setTimeout(() => remove(element), Math.max(duration, 1) * 1000);
  };

  const remove = (element) => {
    element.parentNode.removeChild(element);
  };

  useEffect(() => {
    const intervalId = window.setInterval(add, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={s.animationContainer} ref={containerRef}></div>
  );
};

export default AnimatedText;
