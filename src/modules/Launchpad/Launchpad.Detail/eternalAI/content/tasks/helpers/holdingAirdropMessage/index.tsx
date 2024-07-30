import { Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React from 'react';
import Loading from '@/components/Loading';
import useFormatHoldingRNDR from './useFormatHoldingRNDR';

const holdingRNDRMessage = () => {
  const { loaded, status, isProcessing, amount } = useFormatHoldingRNDR();
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

    // return (
    //   <Flex className={cs(styles.container, {
    //     [styles.container__congrats as string]: !!amount.txsCount
    //   })}>
    //     {amount.txsCount ? (
    //       <Flex flexDirection="column" w="100%" alignItems="center">
    //         <p>You've spent <span>{formatCurrency(amount.fee, 0)} BTC</span> for gas fees across <span>{formatCurrency(amount.txsCount, 0)} transactions</span></p>
    //         <p>Congratulations, you've earned <span>{formatCurrency(amount.point, 0)} points</span></p>
    //         {/*<Button onClick={() => shareTwitterSignature({ fee: amount.fee, point: amount.point, txsCount: amount.txsCount })}>Share now</Button>*/}
    //       </Flex>
    //     ) : (
    //       <p>
    //         No transactions found. Please connect another wallet and try again.
    //       </p>
    //     )}
    //   </Flex>
    // )
  }, [loaded, status, isProcessing, amount]);

  return <>{renderContent()}</>;
};

export default holdingRNDRMessage;
