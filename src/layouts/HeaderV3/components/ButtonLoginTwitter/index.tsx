// import { CDN_URL } from '@constants/config';
import React, { useState, useEffect } from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { accountInforSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';
import useL2Service from '@/hooks/useL2Service';
import { Image } from '@chakra-ui/react';

type Props = {
  color?: 'black' | 'white';
  className?: string;
  title?: string;
};
const ButtonLoginTwitter = (props: Props) => {
  const router = useRouter();
  const { loggedIn, login, logout, userInfo } = useWeb3Auth();
  const accInfor = useAppSelector(accountInforSelector);

  const handleConnect = async () => {
    try {
      // await login();
      login();
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
      } ${props?.className} ${loggedIn && s.loggedIn}`}
      onClick={() => {
        if (!loggedIn) {
          handleConnect();
        } else {
          router.push('/chains');
        }
      }}
      onMouseEnter={() => setIsHover(true)}
    >
      <div className={s.inner}>
        {loggedIn && (
          <Image
            src={userInfo?.profileImage || '/icons/default-user-avatar.svg'}
            w="28px"
            h={'28px'}
            borderRadius={'100%'}
            fit={'cover'}
          ></Image>
        )}
        <p className={`${loggedIn ? s.text : s.lowercase}`}>
          {/* {!loggedIn ? 'Connect' : `${accInfor?.addressFormatted || '--'}`}{' '} */}
          {!loggedIn
            ? props?.title || 'Connect'
            : `${
                accInfor?.twitterUsername ||
                accInfor?.email ||
                accInfor?.tcAddress
              }`}
        </p>
      </div>
      {/* {isHover && loggedIn && (
        <div className={s.dropdown} onMouseLeave={() => setIsHover(false)}>
          <div className={s.dropdown_inner}>
            <div
              className={s.dropdown_inner_item}
              onClick={(e: any) => {
                if (e.stopPropagation) e.stopPropagation();
                router.push('/rollups');
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
      )} */}
    </div>
  );
};

export default ButtonLoginTwitter;
