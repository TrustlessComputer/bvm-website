import NumberScale from '@/components/NumberScale';
import TOKEN_ADDRESS from '@/constants/token';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import useERC20Balance from '@/modules/Launchpad/components/ERC20Balance/useERC20Balance';
import DepositAddressModal from '@/modules/Launchpad/Launchpad.Detail/swamps/idoPhase/DepositAddressModal';
import { TOKEN_BTC_ADDRESS } from '@/modules/Launchpad/Launchpad.Detail/swamps/idoPhase/DepositAddressModal/Deposit.naka';
import {
  oldSummarySelector,
  summarySelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useContext, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import BlockInfo from './BlockInfo';
import ClaimBox from './claimBox';
import styles from './styles.module.scss';
import ThankBackingBox from './ThankBackingBox';
import { isProduction } from '@/config';
import { compareString } from '@/utils/string';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import { ELaunchpadStatus } from '@/modules/Launchpad/services/launchpad.interfaces';
// import ClaimBox from "@/modules/Launchpad/Launchpad.Detail/swamps/idoPhase/SWPPaymentBox/claimBox";

const PaymentBox = () => {
  const { currentLaunchpad } = useContext(LaunchpadContext);
  const { isAuthen, requestAccount } = useNakaAuthen();
  const isAuthenticated = isAuthen;
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

  const { balance: bvmBalance, loaded: isLoadedBVM } = useERC20Balance({
    token: {
      address: BVM_ADDRESS.BVM.bvm,
    },
  });

  const cachedEndTime = useRef(summary?.end_time);

  const endTime = useMemo(() => {
    if (summary?.end_time) {
      cachedEndTime.current = summary?.end_time;
      return summary?.end_time;
    }
    return cachedEndTime.current;
  }, []);

  const isEnd = React.useMemo(() => {
    if (!endTime) return false;
    try {
      const _isEnd = dayjs.utc(endTime).isBefore(dayjs.utc());
      return _isEnd;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }, [endTime, summary?.total_usdt]);

  const isClaim = useMemo(() => {
    return compareString(currentLaunchpad?.status, ELaunchpadStatus.tge);
  }, [currentLaunchpad]);

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
        </Flex>
      </Flex>
      <BlockInfo isEnd={isEnd} />

      {isAuthenticated ? (
        <>
          {isEnd ? (
            <>
              <ThankBackingBox />
              {isClaim && <ClaimBox />}
            </>
          ) : (
            <Button
              className={styles.button}
              disabled={isEnd}
              onClick={() => {
                onOpen();
              }}
            >
              {'BUY $GSWP NOW'}
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            className={styles.button}
            disabled={isEnd}
            onClick={() => {
              requestAccount();
            }}
          >
            {'Connect Naka wallet'}
          </Button>
        </>
      )}

      {!isEnd && isOpen && (
        <DepositAddressModal
          btcBalance={btcBalance}
          ethBalance={ethBalance}
          bvmBalance={bvmBalance}
          isLoadedETH={isLoadedETH}
          isLoadedBTC={isLoadedBTC}
          isLoadedBVM={isLoadedBVM}
          isShow={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default PaymentBox;
