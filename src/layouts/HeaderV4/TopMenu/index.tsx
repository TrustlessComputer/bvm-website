import s from './style.module.scss';
import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import { ReactElement } from 'react';
import ContactUs from '@layouts/HeaderV4/components/ContactUs';
import Link from 'next/link';

const TopMenu = (): ReactElement => {

  return (
    <div
      className={`${s.wrapper} `}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="left">
        <Link href={'/poc'}>
          <img src="/icons/noto_trophy.svg" alt="noto_trophy.svg" width={24} height={24} />
          Proof Of Code
        </Link>
      </div>
      <div className="right">
        <div className={s.right_item}>
          <ContactUs />
        </div>
        <div className={s.right_item}>
          <ButtonLoginTwitter color={color} />
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
