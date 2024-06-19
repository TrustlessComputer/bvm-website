import Link from 'next/link';
import s from './style.module.scss';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import DrawerMobileMenu from '@/layouts/HeaderV3/components/DrawerMenu';
import { NAV_ITEMS } from '../menuConfig';
import { usePathname, useRouter } from 'next/navigation';
import IcMenuMobile from '../components/IcMenuMobile';
import DropDown from '../components/Dropdown';
import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import GroupDownItem from '@layouts/HeaderV3/components/GroupDownItem';
import { ReactElement } from 'react';

export type TMainHeader = {
  color?: 'black' | 'white';
  colorLogo?: 'white' | 'black';
};

const Main = ({ color = 'black', colorLogo = 'black' }: TMainHeader) => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.inner} containerV3`}>
        <div
          className={`${s.logo} ${colorLogo === 'black' && s.logo_black}`}
          onClick={() => router.push('/')}
        >
          <h6 className={s.logo_text} style={{ color: color }}>
            Bitcoin Virtual Machine
          </h6>
        </div>
        {isDesktop ? (
          <div className={s.menu}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isActiveDark = isActive && color === 'white';
              const isActiveLight = isActive && color === 'black';
              return item.subMenu ? (
                <DropDown
                  key={item.label}
                  title={item.label}
                  lists={item.subMenu}
                  color={color}
                />
              ) : (item.GroupDropDown ? (
                <GroupDownItem key={item.label}
                               title={item.label}
                               color={color}>{item.GroupDropDown()}</GroupDownItem>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? '#'}
                  target={item.isNewWindow ? '_blank' : '_self'}
                >
                  <p
                    className={`${s.itemLabel} ${isActiveDark && s.activeDark} 
                    ${isActiveLight && s.activeLight}
                    `}
                    style={{ color: color }}
                  >
                    {item.label}
                  </p>
                </Link>
              ));
            })}
            <ButtonLoginTwitter color={color} />
          </div>
        ) : (
          <>
            <IconButton
              onClick={onToggle}
              height={'24px'}
              icon={<IcMenuMobile />}
              className={`${s.icon} ${
                colorLogo === 'black' ? s.icon_black : s.icon_white
              }`}
              color={color}
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
