import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';

type TSectionBottom = {
  title: string;
  data: {
    left: string;
    right: string;
    icon: string;
  }[];
  bgBottom: string;
};

function SectionBottom({ data }: { data: TSectionBottom }) {
  return (
    <div
      className={`${s.sectionBottom} ${s[`sectionBottom__${data.bgBottom}`]}`}
    >
      <h6 className={s.sectionBottom_title}>{data.title}</h6>
      <ul className={s.sectionBottom_listInfo}>
        {data.data.map((item) => {
          return (
            <li className={s.sectionBottom_listInfo_item}>
              <span className={s.sectionBottom_listInfo_item__left}>
                <Image src={item.icon} alt="icon" width={24} height={24} />
                <p className={s.sectionBottom_listInfo_item__left_text}>
                  {item.left}
                </p>
              </span>
              <p className={s.sectionBottom_listInfo_item__right}>
                {item.right}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SectionBottom;
