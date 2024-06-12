import { NavItem } from '@/layouts/Header/menuConfig';
import Link from 'next/link';
import s from './style.module.scss';
import IconLogo from '../components/IcLogo';
import { IconButton, Image, useDisclosure } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import DrawerMobileMenu from '@/layouts/HeaderV3/components/DrawerMenu';
import { NAV_ITEMS } from '../menuConfig';

const Main = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();

  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.inner} containerV3`}>
        <div className={s.logo}>
          <IconLogo />
          <h6 className={s.logo_text}>Bitcoin Virtual Machine</h6>
        </div>
        {isDesktop ? (
          <div className={s.menu}>
            {NAV_ITEMS.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? '#'}
                  target={item.isNewWindow ? '_blank' : '_self'}
                >
                  <p className={s.itemLabel}>{item.label}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            <IconButton
              onClick={onToggle}
              height={'24px'}
              icon={
                <Image
                  src={'/landingV3/svg/ic-menu-mobile.svg'}
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
            <DrawerMobileMenu isOpen={isOpen} onToggle={onToggle} />
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
