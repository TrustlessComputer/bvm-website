import styles from './styles.module.scss';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import BlockInfo from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIPaymentBox/BlockInfo';
import DepositAddressModal from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/DepositAddressModal';
import NumberScale from '@/components/NumberScale';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { TOKEN_BTC_ADDRESS } from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/DepositAddressModal/Deposit.naka';
import { isProduction } from '@/utils/commons';
import ClaimBox from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIPaymentBox/claimBox';
import { useSelector } from 'react-redux';
import {
  oldSummarySelector,
  summarySelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import TOKEN_ADDRESS from '@/constants/token';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import useERC20Balance from '@/modules/Launchpad/components/ERC20Balance/useERC20Balance';

const EAIPaymentBox = () => {
  const wallet = useAuthenticatedWallet();
  const isAuthenticated = wallet?.address;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const summary = useSelector(summarySelector);
  const oldSummary = useSelector(oldSummarySelector);

  const { balance: btcBalance, loaded: isLoadedBTC } = useERC20Balance({
    token: {
      address: TOKEN_BTC_ADDRESS,
    },
  });

  const { balance: ethBalance, loaded: isLoadedETH } = useERC20Balance({
    token: {
      address: TOKEN_ADDRESS.ETH_ADDRESS_L2,
    },
  });

  // const cachedEndTime = useRef(summary?.end_time);

  const endTime = useMemo(() => {
    // if (summary?.end_time) {
    //   cachedEndTime.current = summary?.end_time;
    //   return summary?.end_time;
    // }
    // return cachedEndTime.current;
    return '2024-03-29T15:00:00Z';
  }, []);

  const isEnd = React.useMemo(() => {
    if (!isProduction()) return true;
    if (!endTime) return false;
    try {
      const _isEnd = dayjs.utc(endTime).isBefore(dayjs.utc());
      return _isEnd;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }, [endTime, summary?.total_usdt]);

  return (
    <Box className={styles.container}>
      <Flex flexDirection="column" gap="12px">
        <p className={styles.container_title}>Total contribution</p>
        <Flex>
          <p className={styles.container_amount}>
            <NumberScale
              label={'$'}
              couters={Number(summary?.total_usdt_value || 0)}
              maximumFractionDigits={0}
              minimumFractionDigits={0}
              defaultFrom={String(oldSummary?.total_usdt_value || 0)}
            />
          </p>
          {/*<p className={styles.container_amount}>*/}
          {/*  {' '}*/}
          {/*  / ${formatCurrency(summary?.hard_cap || 0, 0, 2)}*/}
          {/*</p>*/}
        </Flex>
      </Flex>
      <BlockInfo isEnd={isEnd} />
      {isEnd ? (
        <>
          {/*<ThankBackingBox />*/}
          <ClaimBox />
        </>
      ) : (
        <Button
          className={styles.button}
          disabled={isEnd}
          onClick={() => {
            // if (!isAuthenticated) return openSignView();
            onOpen();
          }}
        >
          {isAuthenticated ? 'BUY $EAI NOW' : 'Connect Naka wallet'}
        </Button>
      )}

      {!isEnd && isOpen && (
        <DepositAddressModal
          btcBalance={btcBalance}
          ethBalance={ethBalance}
          isLoadedETH={isLoadedETH}
          isLoadedBTC={isLoadedBTC}
          isShow={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default EAIPaymentBox;
