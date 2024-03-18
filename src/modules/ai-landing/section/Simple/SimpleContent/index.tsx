'use client';

import { ISimpleData } from '../data';
import Desc from './Desc';
import Title from './Title';
import s from './style.module.scss';
import ImagesItem from './Image';
import ButtonItem from './ButtonItem';

const SimpleContent = ({ data }: { data: ISimpleData[] }) => {
  return (
    <div className={`${s.simpleContent} `}>
      <div className={s.simpleContent_image}>
        {data.map((item, index) => {
          return <ImagesItem id={index} src={item.image} key={index} />;
        })}
      </div>

      <div className={s.simpleContent_wrap}>
        <div className={s.simpleContent_title}>
          {data.map((item, index) => {
            return <Title id={index} key={index} title={item.title} />;
          })}
        </div>
        <div className={s.simpleContent_content}>
          {data.map((item, index) => {
            return <Desc id={index} desc={item.content} key={index} />;
          })}
        </div>
        <div className={s.simpleContent_button}>
          {data.map((item, index) => {
            return <ButtonItem id={index} link={item.link} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SimpleContent;
