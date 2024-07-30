import Link from 'next/link';
import s from './style.module.scss';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import DrawerMobileMenu from '@/layouts/HeaderV3/components/DrawerMenu';
import { NAV_ITEMS_LEFT, NAV_ITEMS_RIGHT } from '../menuConfig';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IcMenuMobile from '../components/IcMenuMobile';
import DropDown from '../components/Dropdown';
import ButtonLoginTwitter from '../components/ButtonLoginTwitter';
import GroupDownItem from '@layouts/HeaderV3/components/GroupDownItem';
import { ReactElement } from 'react';
import IconLogo from '../components/IcLogo';
import ImagePlaceholder from '@components/ImagePlaceholder';

export type TMainHeader = {
  color?: 'black' | 'white';
  colorLogo?: 'white' | 'black';
  backgroundColor?: string;
};

const Main = ({
  color = 'black',
  colorLogo = 'black',
  backgroundColor = 'white',
}: TMainHeader): ReactElement => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className={`${s.wrapper} `} style={{ backgroundColor: '#f3f1e8' }}>
      <div className={`${s.inner} containerV3`}>
        <div
          className={`${s.logo} ${colorLogo === 'black' && s.logo_black}`}
          onClick={() => router.push('/')}
        >
          <IconLogo />
        </div>
        {/*<p className={s.heading}>BVM Studio</p>*/}
        <div className={s.logoStudio}>
          <ImagePlaceholder src={'/bvmstudio_logo.png'} alt={'bvmstudio_logo'} width={549} height={88} />

        </div>
        {isDesktop ? (
          <div className={s.menu}>
            {/* {NAV_ITEMS_RIGHT.map((item) => {
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
              ) : MenuItemEl ? (
                <MenuItemEl color={color} />
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
            })} */}
            {/* <div
              className={s.menuCustom}
              onClick={() => {
                router.push(
                  `/rollups/customize?package=${params.get('package')}`,
                );
              }}
            >
              <p>Customize with Basic mode</p>
            </div> */}
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
