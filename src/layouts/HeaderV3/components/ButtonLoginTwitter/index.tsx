// import { CDN_URL } from '@constants/config';
import React, { useState } from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';

type Props = {
  color?: 'black' | 'white';
};
const ButtonLoginTwitter = (props: Props) => {
  const handleConnect = async () => {
    try {
      // await login();
    } catch (err: unknown) {
      toast.error(
        (err as Error).message ||
          'Something went wrong. Please try again later.',
      );
    }
  };
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className={`${s.buttonLogin} ${
        props.color === 'black' ? s.buttonLogin__light : s.buttonLogin__dark
      }`}
      onClick={handleConnect}
      onMouseEnter={() => setIsHover(true)}
    >
      <div className={s.inner}>
        <p className={s.text}>{!isLogin ? 'Login' : '0xx2323333xxx3'} </p>
      </div>
      {isHover && (
        <div className={s.dropdown} onMouseLeave={() => setIsHover(false)}>
          <div className={s.dropdown_inner}>
            <div className={s.dropdown_inner_item}>
              <SvgInset svgUrl="/landingV3/svg/chain.svg" />
              <p>Manage chains</p>
            </div>{' '}
            <div className={s.dropdown_inner_item}>
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
