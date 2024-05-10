import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { showError } from '@/components/toast';
import BVM_ADDRESS from '@/contract/stakeV2/configs';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import SuccessModal from '@/modules/Launchpad/Launchpad.Detail/naka/idoPhase/SuccessModal';
import useERC20Balance from '@/modules/Launchpad/components/ERC20Balance/useERC20Balance';
import { launchpadSelector } from '@/modules/Launchpad/store/reducer';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrency } from '@/utils/format';
import { getUrlToSwap } from '@/utils/helpers';
import { isAmount } from '@/utils/number';
import sleep from '@/utils/sleep';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import BigNumberJS, { BigNumber } from 'bignumber.js';
import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
// import useTransactionFee from '@/hooks/useTransactionFee';
// import { ETypes } from '@/contract/player-share';

interface IFormValues {
  tickets: string;
}

const BuyTicketForm = () => {
  const { currentLaunchpad } = useLaunchpadContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthen, requestAccount } = useNakaAuthen();

  // const cTradeAPI = new CTradeAPI();
  const { myDataLeaderBoard } = useSelector(launchpadSelector);

  const viewBoost = useMemo(() => {
    return new BigNumber(myDataLeaderBoard?.boost || 0)
      .minus(1)
      .multipliedBy(100)
      .toNumber();
  }, [myDataLeaderBoard]);

  const getNumberBVM = (tickets: string) => {
    const AMOUNT = currentLaunchpad?.launchpad_valuation || '0';
    const _ticket = isAmount(tickets) ? tickets : 0;
    return new BigNumberJS(_ticket).times(AMOUNT).toNumber();
  };

  const { balance, loaded } = useERC20Balance({
    token: {
      address: BVM_ADDRESS.BVM.bvm,
    },
  });

  // const { networkFees } = useTransactionFee({ type: ETypes.transfer });

  const onSubmit = async (values: IFormValues) => {
    try {
      // const amount = getNumberBVM(values.tickets).toString();
      const adminAddress = currentLaunchpad?.admin_address;
      if (!adminAddress) throw new Error('Empty admin address.');

      // await cBaseContract.checkNakaGasFee();

      // const { nonce, gasPrice } = await getDataPrepareTx({
      //   address: wallet?.address || '',
      // });

      // const contract = await cBaseContract
      //   .getERC20Contract({
      //     contractAddress: BVM_ADDRESS.bvm,
      //   })
      //   .connect(wallet!);

      // const sendBVMTx = await contract.transfer(
      //   adminAddress,
      //   ethers.utils.parseEther(String(amount)),
      //   {
      //     gasPrice: gasPrice, //wei (Or using gasPriceRaw)
      //     nonce,
      //   },
      // );

      // await sendBVMTx.wait();

      // await cTradeAPI.scanTrxERC20({ tx_hash: sendBVMTx.hash });

      // dispatch(requestReload());
      // showSuccess({
      //   message: `Your purchase of ${
      //     values.tickets
      //   } ticket${labelAmountOrNumberAdds(
      //     Number(values.tickets),
      //   )} was successful.`,
      // });
      onOpen();
      await sleep(0.2);
    } catch (error) {
      console.log('BUY TICKET ERROR: ', error);
      const { message } = getErrorMessage(error);
      showError({ message: message });
    }
  };

  const validate = async (values: IFormValues) => {
    const amountBVM = getNumberBVM(values.tickets);
    const errors: Record<string, string | React.ReactNode> = {};
    if (!values.tickets || !isAmount(values.tickets)) {
      errors.tickets = `Required.`;
    } else if (new BigNumberJS(amountBVM).gt(balance || 0)) {
      errors.tickets = (
        <p className={styles.error}>
          Insufficient balance.{' '}
          <a
            href={getUrlToSwap({})}
            style={{
              textDecoration: 'underline',
              color: '#7038E2',
            }}
          >
            Buy now
          </a>
        </p>
      );
    } else if (!Number.isInteger(new BigNumberJS(values.tickets).toNumber())) {
      errors.tickets = 'The number of tickets must be an integer.';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      tickets: '2',
    } as IFormValues,
    onSubmit: onSubmit,
    validate: validate,
  });

  const amountBVM = React.useMemo(() => {
    return getNumberBVM(formik.values.tickets);
  }, [formik.values.tickets]);

  const renderBVMBalance = () => {
    return (
      <Text fontSize="14px" whiteSpace="pre">
        <span style={{ opacity: 0.7 }}>BVM Balance:</span>{' '}
        <strong>{formatCurrency(balance, 0, 3)} BVM</strong>
      </Text>
    );
  };

  const renderTicketPrice = () => {
    return (
      <Text fontSize="14px">
        <span style={{ opacity: 0.7 }}>Ticket Price:</span>{' '}
        <strong>
          {formatCurrency(currentLaunchpad?.launchpad_valuation || '0', 0, 3)}{' '}
          BVM
        </strong>
      </Text>
    );
  };

  const allowBuy = useMemo(() => {
    return currentLaunchpad?.status === 'ido';
  }, [currentLaunchpad]);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
      <Flex flexDirection="column">
        <p className={styles.container_title}>Get Your Tickets</p>
        <Flex flexDirection="column">
          <p className={styles.container_note}>
            The more tickets you have, the better your chances of winning.
          </p>
          {viewBoost > 0 && (
            <p className={styles.container_boost}>
              Your boost: <span>{viewBoost}%</span>
            </p>
          )}
        </Flex>
      </Flex>
      <Flex width="100%" flexDirection="column" gap="4px">
        <div className={styles.inputWrapper}>
          {!isDesktop && (
            <Flex direction={'column'} alignItems={'flex-start'}>
              <>{renderBVMBalance()}</>
              <>{renderTicketPrice()}</>
            </Flex>
          )}
          <Flex width="100%" justifyContent="space-between">
            <Text>Number of tickets</Text>
            {isDesktop && <>{renderBVMBalance()}</>}
          </Flex>
          <Flex justifyContent="space-between" width="100%" alignItems="center">
            <input
              type="number"
              id="tickets"
              onChange={(e) => {
                const value = (e?.target?.value || '')
                  .toString()
                  .replace('.', '')
                  .replace(',', '');
                formik.setFieldValue('tickets', value);
              }}
              value={formik.values.tickets}
              autoFocus={true}
              style={{
                maxWidth: '50%',
                cursor: allowBuy ? 'pointer' : 'not-allowed',
              }}
              disabled={!allowBuy}
            />
            {isDesktop && <>{renderTicketPrice()}</>}
          </Flex>
          {!!formik.errors.tickets &&
            (typeof formik.errors.tickets === 'string' ? (
              <p className={styles.error}>{formik.errors.tickets}</p>
            ) : (
              formik.errors.tickets
            ))}
        </div>
      </Flex>
      <Flex flexDirection="column" gap="12px">
        {!isAuthen ? (
          <Button type="button" height="48px" onClick={requestAccount}>
            {'Connect Naka wallet'}
          </Button>
        ) : (
          <Button
            isLoading={!loaded || formik.isSubmitting}
            isDisabled={!loaded || formik.isSubmitting || !allowBuy}
            type="submit"
            height="48px"
          >
            {amountBVM
              ? `Pay with ${formatCurrency(amountBVM, 0, 0)} BVM`
              : 'Buy Ticket'}
          </Button>
        )}
        <Text
          textAlign="center"
          fontSize="14px"
          lineHeight="140%"
          maxWidth="80%"
          marginLeft="auto"
          marginRight="auto"
        >
          Important note: Winners are randomly selected. If you don't win, you
          will automatically receive full refund.
        </Text>
      </Flex>
      <SuccessModal
        isShow={isOpen}
        onHide={onClose}
        amount={formik.values.tickets}
      />
    </form>
  );
};

export default BuyTicketForm;
