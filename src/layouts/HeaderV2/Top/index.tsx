import SvgInset from '@/components/SvgInset';
import useWindowSize from '@/hooks/useWindowSize';
import { Button, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import Treasury from '@layouts/HeaderV2/Top/treasury';
import Link from 'next/link';
import DrawerMobileMenu from '../components/DrawerMenu';
import DropDown from '../components/Dropdown';
import { TOP_NAV_ITEMS } from '../menuConfig';
import s from './style.module.scss';
import { shortCryptoAddress } from '@utils/address';
import { WALLET_URL } from '@/Providers/NakaConnectProvider';
import Connect from '@layouts/HeaderV2/Top/connect';

const Top = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <Treasury />

        <p
          onClick={(): void => {
            window.open('/proposal-dashboard', '_self');
          }}
          className={s.leftToken}
        >
          DAO
        </p>
        {TOP_NAV_ITEMS.map((item, index) => {
          return item.subMenu ? (
            <DropDown
              key={`${item.label}-${index}`}
              title={item.label}
              lists={item.subMenu}
              href={item.href}
              target={item.isNewWindow ? '_blank' : '_self'}
            />
          ) : (
            <Link
              key={`${item.label}-${index}`}
              href={item.href ?? '#'}
              target={item.isNewWindow ? '_blank' : '_self'}
            >
              <p className={s.leftToken}>{item.label}</p>
            </Link>
          );
        })}
      </div>
      {isDesktop ? (
        <div className={s.right}>
          <Link className={s.right_btn} href={'/bvm'}>
            <SvgInset svgUrl="/landing-v2/svg/bvm.svg" size={20} />
            <p className={s.token}>$BVM</p>
          </Link>
          <Link className={s.right_btn} href={'/shard'}>
            <SvgInset svgUrl="/landing-v2/svg/crystal.svg" height={20} />
            <p className={s.token}>$SHARD</p>
          </Link>
          <Connect />
        </div>
      ) : (
        <IconButton
          onClick={onToggle}
          height={'24px'}
          icon={
            <Image
              src={'/landing-v2/svg/ic-menu-mobile.svg'}
              w={'24px'}
              h={'24px'}
              color={'white'}
              filter={'invert(0)'}
            />
          }
          color={'white'}
          aria-label={'Toggle Menu'}
          _hover={{
            bgColor: 'transparent',
          }}
        />
      )}
      <DrawerMobileMenu isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
};

export default Top;
