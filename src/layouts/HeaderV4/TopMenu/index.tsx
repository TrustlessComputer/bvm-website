import s from './style.module.scss';
// import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import { ReactElement } from 'react';
import ContactUs from '@layouts/HeaderV4/components/ContactUs';
import Link from 'next/link';
import { BVM_CODE_BATTLE, HEART_BEAT } from '@constants/route-path';
import { Flex } from '@chakra-ui/react';

const TopMenu = (): ReactElement => {
  return (
    <div className={`${s.wrapper} `}>
      <div className="containerV3">
        <div className={s.inner}>
          <Flex alignItems="center" gap="16px" className={s.left}>
            <Link href={BVM_CODE_BATTLE} className={s.left_btn}>
              <img
                src="/icons/noto_trophy.svg"
                alt="noto_trophy.svg"
                width={24}
                height={24}
              />
            </Link>
            {/* <Link href={HEART_BEAT} className={s.left_btn}>
              <img
                src="/icons/heartbeat.svg"
                alt="noto_heartbeat.svg"
                width={24}
                height={24}
              />
            </Link> */}
          </Flex>
          <div className={s.right}>
            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <Link href={'https://docs.bvm.network/bvm'}>Docs</Link>
              </div>
            </div>
            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <Link href="/research">Research</Link>
              </div>
            </div>
            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <Link href={'/team'}>Team</Link>
              </div>
            </div>

            <div className={s.right_item}>
              <div className={s.right_item_inner}>
                <ContactUs />
              </div>
            </div>
            {/* <div className={s.right_item}>
              <ButtonLoginTwitter color={'white'} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
