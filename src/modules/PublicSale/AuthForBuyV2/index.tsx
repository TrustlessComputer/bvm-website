import { userTokenSelector } from '@/stores/states/user/selector';
import { Button, Flex, Tooltip, useDisclosure } from '@chakra-ui/react';
import cx from 'classnames';
import React, { PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

interface IAuthForBuyV2 extends PropsWithChildren {}

const AuthForBuyV2: React.FC<IAuthForBuyV2> = ({ children }) => {
  const userToken = useSelector(userTokenSelector);

  const isLogged = useMemo(() => Boolean(userToken), [userToken]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLogged) {
    return children;
  }

  return (
    <>
      <Flex className={s.btnWrapper}>
        <Button
          onClick={() => {
            onOpen();
          }}
          type="button"
          className={s.btnContainer}
        >
          Buy $BVM
        </Button>
        <Tooltip
          minW="220px"
          bg="#006149"
          boxShadow="0px 0px 40px rgba(0, 0, 0, 0.12)"
          borderRadius="4px"
          padding="16px"
          hasArrow
          label={
            'Buy and stake your $BVM to earn rewards from the BVM ecosystem and our collaborative Bitcoin L2s and dApps partners. Your $BVM will be automatically staked after the public sale, and you can choose to unstake at any time.'
          }
          color={'#FFFFFF'}
        >
          <Button
            onClick={() => {
              onOpen();
            }}
            type="button"
            className={cx(s.btnContainer, s.btnBuyAndStake)}
          >
            Buy & Stake $BVM
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};

export default AuthForBuyV2;
