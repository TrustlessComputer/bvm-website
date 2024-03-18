import React, { Dispatch, SetStateAction } from 'react';
import s from './style.module.scss';
import { useStoreSimple } from '../useStoreSimple';
import HeadingTyping from '@interactive/Signal/Chars/typing';

type ISimpleTab = {
  id: number;
  content: string;
  active: boolean;
  setTab: Dispatch<SetStateAction<number>>;
};

const SimpleTab = ({ content, id, active, setTab }: ISimpleTab) => {
  const { idSimple, setIdSimple } = useStoreSimple();
  const clickHandler = () => {
    setIdSimple(id);
  };
  const isActive = id === idSimple;
  return (
    <div
      className={`${s.simpleTab} ${isActive ? s.active : ''}`}
      onClick={() => clickHandler()}
    >
      <span>0{id + 1}</span>
      <HeadingTyping delayTrigger={id / 10}>
        <p>{content}</p>
      </HeadingTyping>
    </div>
  );
};

export default SimpleTab;
