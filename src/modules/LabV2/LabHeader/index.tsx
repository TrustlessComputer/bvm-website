import { useState } from 'react';
import RandomTextV2 from '../RandomTextV2';
import useLabStore from '../useLabStore';
import LandingLogo from './LandingLogo';
import s from './style.module.scss';

interface IProp {
  bgColor: string;
  setTab: (b: number) => void;
  setIsDark: (s: boolean) => void;
  tab: number;
}

const LabHeader = ({ bgColor, setTab, setIsDark, tab }: IProp) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { isFirst } = useLabStore();

  const tabList = [
    {
      id: 0,
      content: 'Portfolio',
      isDark: false,
    },
    {
      id: 1,
      content: 'Research',
      isDark: true,
    },
    {
      id: 2,
      content: 'Open Source',
      isDark: false,
    },
    {
      id: 3,
      content: 'Contact',
      isDark: false,
    },
  ];

  const clickHandler = (id: number, isDark: boolean) => {
    setOpenNav(false);
    if (id === 3) {
      // window.open('https://twitter.com/NewBitcoinLabs', '_blank');
      window.open('https://forms.gle/zMLSCWJUgZZttZ519', '_blank');
      return;
    }
    setTab(id);
    setIsDark(isDark);
  };

  const menuHandler = () => {
    setOpenNav(!openNav);
  };

  return (
    <>
      <header className={`${s.header} ${isFirst && s.isIn}`}>
        <div className={`${s.container} container`}>
          <div className={s.logo} onClick={() => clickHandler(0, false)}>
            <span>
              <LandingLogo />
            </span>
          </div>
          <div className={s.tabList}>
            {tabList.map((item) => (
              <li
                key={item.id}
                className={`${s.tabList_item} ${
                  tab === item.id ? s.active : null
                }`}
                onClick={() => clickHandler(item.id, item.isDark)}
              >
                <RandomTextV2>{item.content}</RandomTextV2>
              </li>
            ))}
          </div>
          <div className={s.menuBtn} onClick={menuHandler}>
            {/* <LandingMenu /> */}
          </div>
        </div>
      </header>
      <nav
        className={`${s.mobileMenu} ${openNav ? s.active : null}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className={`${s.container} container`}>
          <div className={s.mobileMenuList}>
            {tabList.map((item) => (
              <li
                key={item.id}
                className={`${s.mobileMenuList_item} ${
                  tab === item.id ? s.active : null
                }`}
                onClick={() => clickHandler(item.id, item.isDark)}
              >
                {'>'} {item.content}
              </li>
            ))}
          </div>
        </div>
        <div className={s.mobileMenu_btn} onClick={() => setOpenNav(false)}>
          {/* <LandingMenuClose /> */}
        </div>
      </nav>
    </>
  );
};

export default LabHeader;
