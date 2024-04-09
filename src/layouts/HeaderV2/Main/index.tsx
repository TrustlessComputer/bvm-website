import s from './style.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { COMMUNITY_ITEMS, NAV_ITEMS } from '@layouts/HeaderV2/menuConfig';
import Link from 'next/link';
import DropDown from '../components/Dropdown';
import ContactUs from '../components/ContactUs';
import { Image } from '@chakra-ui/react';

const Main = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        {NAV_ITEMS.map((item, index) => {
          return item.subMenu ? (
            <DropDown title={item.label} lists={item.subMenu} />
          ) : (
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
      <div className={s.logo}>
        <Link href={'/'}>
          <Image src={'/landing-v2/svg/logo.svg'} />
        </Link>
      </div>
      <div className={s.right}>
        <div className={s.contact}>
          <ContactUs color="black" />
          {COMMUNITY_ITEMS.map((item) => (
            <Link
              href={item.link}
              className={s.social}
              key={item.alt}
              target={'_blank'}
            >
              <ImagePlaceholder
                src={item.icon}
                alt={item.alt}
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
        <Link href="/blockchains/customize" className={s.btnBuild}>
          Build on Bitcoin
        </Link>
      </div>
    </div>
  );
};

export default Main;
