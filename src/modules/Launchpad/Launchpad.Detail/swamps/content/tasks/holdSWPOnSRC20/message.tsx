/* eslint-disable react-hooks/rules-of-hooks */
import Loading from '@/components/Loading';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import useFormatHoldingSWPSRC20 from '../helpers/holdingAirdropMessage/useFormatHoldingSWPSRC20';
import styles from './styles.module.scss';

const HoldingSWPSRC20Message = () => {
  const { loaded, status, isProcessing, amount } = useFormatHoldingSWPSRC20();
  const renderContent = React.useCallback(() => {
    if (!loaded || !status.length) return <></>;
    if (isProcessing) {
      return (
        <Flex className={styles.container}>
          <Loading />
          <p>Wallet verification in progress!</p>
          <p>You're in the queue. Please give us a few minutes to process.</p>
          <p>Thanks for your patience!</p>
        </Flex>
      );
    }

    return <></>;
  }, [loaded, status, isProcessing, amount]);

  return <>{renderContent()}</>;
};

export default HoldingSWPSRC20Message;
