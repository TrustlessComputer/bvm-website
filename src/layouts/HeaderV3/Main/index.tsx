import Link from 'next/link';
import s from './style.module.scss';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import DrawerMobileMenu from '@/layouts/HeaderV3/components/DrawerMenu';
import { NAV_ITEMS_LEFT, NAV_ITEMS_RIGHT } from '../menuConfig';
import { usePathname, useRouter } from 'next/navigation';
import IcMenuMobile from '../components/IcMenuMobile';
import DropDown from '../components/Dropdown';
import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import GroupDownItem from '@layouts/HeaderV3/components/GroupDownItem';
import { ReactElement } from 'react';
import IconLogo from '../components/IcLogo';
import Image from 'next/image';

export type TMainHeader = {
  color?: 'black' | 'white';
  colorLogo?: 'white' | 'black';
  backgroundColor?: string;
  showBanner?: boolean;
};

const Main = ({
                color = 'black',
                colorLogo = 'black',
                backgroundColor = 'white',
                showBanner
              }: TMainHeader): ReactElement => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`${s.wrapper} `}
      style={{ backgroundColor: backgroundColor }}
    >
      {
        showBanner && (
          <div className={s.wrapper_banner} onClick={() => router.push('/bitcoinwars')}>
            <Image src={'/banner.jpg'} alt={'banner'} width={1920} height={80} quality={100} />
            <div className={s.wrapper_banner_btn}>Play now</div>
          </div>
        )
      }

      <div className={`${s.inner} containerV3`}>
        {isDesktop && (
          <div className={s.menu}>
            {NAV_ITEMS_LEFT.map((item) => {
              const isActive = pathname === item.href;
              const isActiveDark = isActive && color === 'white';
              const isActiveLight = isActive && color === 'black';
              return item.subMenu ? (
                <DropDown
                  key={item.label}
                  title={item.label}
                  lists={item.subMenu}
                  Icon={item.icon}
                  color={color}
                />
              ) : item.GroupDropDown ? (
                <GroupDownItem
                  key={item.label}
                  title={item.label}
                  color={color}
                  typeGroup={item.groupType}
                >
                  {item.GroupDropDown()}
                </GroupDownItem>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? '#'}
                  className={'menu-item'}
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
              );
            })}
          </div>
        )}
        <div
          className={`${s.logo} ${colorLogo === 'black' && s.logo_black}`}
          onClick={() => router.push('/')}
        >
          <IconLogo />
        </div>
        {isDesktop ? (
          <div className={s.menu}>
            {NAV_ITEMS_RIGHT.map((item) => {
              const isActive = pathname === item.href;
              const isActiveDark = isActive && color === 'white';
              const isActiveLight = isActive && color === 'black';
              const { MenuItemEl } = item;

              return item.subMenu ? (
                <DropDown
                  key={item.label}
                  title={item.label}
                  lists={item.subMenu}
                  color={color}
                  Icon={item.icon}
                />
              ) : item.GroupDropDown ? (
                <GroupDownItem
                  key={item.label}
                  title={item.label}
                  color={color}
                  typeGroup={item.groupType}
                >
                  {item.GroupDropDown()}
                </GroupDownItem>
              ) : MenuItemEl ? <MenuItemEl color={color} /> : (
                <Link
                  key={item.label}
                  href={item.href ?? '#'}
                  className={'menu-item'}
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
              );
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
