import useWindowSize from '@/hooks/useWindowSize';
import s from './style.module.scss';
import Treasury from '@layouts/HeaderV2/Top/treasury';
import DrawerMobileMenu from '../components/DrawerMenu';
import { IconButton, Image, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';

const Top = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isDesktop } = useWindowSize();
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.treasury}>
          <Treasury />
        </div>
        <p
          onClick={(): void => {
            window.open('https://nakachain.xyz/proposal-dashboard', '_blank');
          }}
          className={s.leftToken}
        >
          DAO
        </p>
      </div>
      {isDesktop ? (
        <div className={s.right}>
          <Link href={'/bvm'}>
            <p className={s.token__orange}>$BVM</p>
          </Link>
          <Link href={'/shard'}>
            <p className={s.token__green}>$SHARD</p>
          </Link>
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
