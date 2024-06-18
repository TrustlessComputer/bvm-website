// import { CDN_URL } from '@constants/config';
import React, { useState } from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { accountInforSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';

type Props = {
  color?: 'black' | 'white';
};
const ButtonLoginTwitter = (props: Props) => {
  const router = useRouter();
  const { loggedIn, setShowLoginModalCustomize, logout } = useWeb3Auth();
  const accInfor = useAppSelector(accountInforSelector);
  const handleConnect = async () => {
    try {
      // await login();
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className={`${s.buttonLogin} ${
        props.color === 'black' ? s.buttonLogin__light : s.buttonLogin__dark
      }`}
      onClick={() => {
        if (!loggedIn) {
          handleConnect();
        }
      }}
      onMouseEnter={() => setIsHover(true)}
    >
      <div className={s.inner}>
        <p className={s.text}>
          {!loggedIn ? 'Login' : `${accInfor?.addressFormatted || '--'}`}{' '}
        </p>
      </div>
      {isHover && loggedIn && (
        <div className={s.dropdown} onMouseLeave={() => setIsHover(false)}>
          <div className={s.dropdown_inner}>
            <div
              className={s.dropdown_inner_item}
              onClick={(e: any) => {
                if (e.stopPropagation) e.stopPropagation();
                router.push('/blockchains');
              }}
            >
              <SvgInset svgUrl="/landingV3/svg/chain.svg" />
              <p>Manage chains</p>
            </div>{' '}
            <div
              className={s.dropdown_inner_item}
              onClick={(e: any) => {
                if (e.stopPropagation) e.stopPropagation();
                logout && logout();
              }}
            >
              <SvgInset svgUrl="/landingV3/svg/logout.svg" />
              <p>Disconnect wallet</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonLoginTwitter;
