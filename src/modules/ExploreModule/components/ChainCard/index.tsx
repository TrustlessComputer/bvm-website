import React from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import Fade from '@interactive/Fade';
import ImagePlaceholder from '@components/ImagePlaceholder';

export type TChainCard = {
  idx: number;
  title: string;
  description: string;
  image: string;
  social: Array<{ link: string; icon: string }>;
  tags: Array<string>;
  homeImage?: string;
};

export default function ChainCard({ idx, ...props }: TChainCard) {
  return (
    <Fade delay={idx / 10}>
      <div className={s.wrapperChainCard}>
        <div className={s.left}>
          <ImagePlaceholder
            src={props.image}
            alt={'icons'}
            width={80}
            height={80}
          />
        </div>
        <div className={s.right}>
          <div className={s.right_top}>
            <p className={s.right_top_heading}>{props.title}</p>
            {props.social.map((item, index) => {
              return (
                <div className={s.right_top_link}>
                  <a href={item.link} target={'_blank'}>
                    <Image
                      src={item.icon}
                      alt={'icon'}
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              );
            })}
          </div>
          <p
            className={s.right_top_decs}
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
          <div className={s.wrapperTag}>
            {props.tags.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
