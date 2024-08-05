import s from './style.module.scss';
import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import { ReactElement } from 'react';
import ContactUs from '@layouts/HeaderV4/components/ContactUs';
import Link from 'next/link';
import { BVM_CODE_BATTLE } from '@constants/route-path';

const TopMenu = (): ReactElement => {

  return (
    <div
      className={`${s.wrapper} `}
    >
      <div className="containerV3">
        <div className={s.inner}>
          <div className={s.left}>
            <Link href={BVM_CODE_BATTLE} className={s.left_btn}>
              <img src="/icons/noto_trophy.svg" alt="noto_trophy.svg" width={24} height={24} />
            </Link>
          </div>
          <div className={s.right}>
            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <Link href={'/team'}>
                  About BVM
                </Link>
              </div>
            </div>
            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <ContactUs />
              </div>
            </div>
            <div className={s.right_item}>
              <ButtonLoginTwitter color={'white'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
