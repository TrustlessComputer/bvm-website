import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import { MathMap } from '@/utils/mathUtils';
import { formatCurrency } from '@/utils/format';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';

const AnimatedText = ({
  latestContributors,
}: {
  latestContributors: ILeaderBoardEAI[];
}) => {
  // const chars = ['$', '$', '$', '$', '$'];
  const containerRef = useRef(null);

  const add = (contributor: ILeaderBoardEAI) => {
    const element = document.createElement('span');
    element.classList.add(s.moneyChange as string);
    if (containerRef?.current) {
      (containerRef?.current as any).appendChild(element);
    }

    const offset = MathMap(Math.random(), 0, 1, 40, 350);

    //@todo step
    const money = Number(contributor?.usdt_value) || 0;
    const duration = MathMap(money, 100, 1000000, 8, 30);
    const scale = MathMap(money, 100, 1000000, 0.5, 2);

    element.style.cssText = `right:${offset}px; transform:scale(${scale}); animation-duration:${duration}s`;
    element.innerHTML = `<div><img src=${
      contributor?.twitter_avatar || '/none-avatar.jpeg'
    } /> <span>+ $${formatCurrency(money, 0, 0)}</span></div>`;

    window.setTimeout(() => remove(element), Math.max(duration, 1) * 1500);
  };

  const remove = (element: any) => {
    element.parentNode.removeChild(element);
  };

  useEffect(() => {
    // const intervalId = window.setInterval(add, 1000);
    //
    // return () => {
    //   clearInterval(intervalId);
    // };

    let interval = 1000;
    for (const contributor of latestContributors) {
      setTimeout(add, interval, contributor);
      interval += 1000;
    }
  }, [JSON.stringify(latestContributors)]);

  return <div className={s.animationContainer} ref={containerRef as any} />;
};

export default AnimatedText;
