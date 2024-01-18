import { Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React from 'react';
import { formatCurrency } from '@/utils/format';
import Loading from '@/components/Loading';
import cs from 'classnames';
import useFormatAllowCelestia from '@/modules/Whitelist/AllowCelestiaMessage/useFormatAllowCelestia';

const AllowCelestiaMessage = () => {
  const { loaded, status, isProcessing, amount } = useFormatAllowCelestia()
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
      )
    }

    return (
      <Flex className={cs(styles.container, {
        [styles.container__congrats as string]: !!Number(amount.point || '0')
      })}>
        {!!Number(amount.point || '0') ? (
          <Flex flexDirection="column" w="100%" alignItems="center">
            <p>You are holding or staking <span>{formatCurrency(amount.fee, 0)} TIA</span> in your Keplr wallet</p>
            <p>Congratulations, you've earned <span>{formatCurrency(amount.point, 0)} points</span></p>
          </Flex>
        ) : (
          <p>
            No transactions found. Please connect another wallet and try again.
          </p>
        )}
      </Flex>
    )
  }, [loaded, status, isProcessing, amount]);

  return (
    <>
      {renderContent()}
    </>
  )
}

export default AllowCelestiaMessage;
