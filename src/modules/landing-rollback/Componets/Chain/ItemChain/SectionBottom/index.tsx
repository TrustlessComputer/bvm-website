import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';

type TSectionBottom = {
  title: string;
  link?: string;
  data?: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgBottom: string;
};

export default function SectionBottom({
  data,
  delay,
  isLaunch = false,
}: {
  data: TSectionBottom;
  delay: number;
  isLaunch?: boolean;
  subText?: string;
}) {
  return (
    <div
      className={`${s.sectionBottom} ${s[`sectionBottom__${data.bgBottom}`]}`}
    >
      <div className={s.sectionBottom_title}>
        <h6
          className={`${s.sectionBottom_title_main} ${
            isLaunch && s[`sectionBottom_title_main_isLaunch`]
          }`}
        >
          <Chars delay={delay}>{data.title}</Chars>
        </h6>
        <Chars delay={delay}>
          <p className={s.sectionBottom_title_sub}>
            {!data?.link && !isLaunch && 'Coming soon'}
          </p>
        </Chars>
      </div>

      {!isLaunch && (
        <ul className={s.sectionBottom_listInfo}>
          {data.data &&
            data.data.map((item, index) => {
              return (
                <Fade key={index} delay={delay + 0.1 + index / 10}>
                  <li className={s.sectionBottom_listInfo_item}>
                    <span className={s.sectionBottom_listInfo_item__left}>
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={24}
                        height={24}
                      />
                      <p className={s.sectionBottom_listInfo_item__left_text}>
                        {item.left}
                      </p>
                    </span>
                    <p className={s.sectionBottom_listInfo_item__right}>
                      {item.right}
                    </p>
                  </li>
                </Fade>
              );
            })}
        </ul>
      )}
    </div>
  );
}
