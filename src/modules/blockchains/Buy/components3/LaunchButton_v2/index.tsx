import { useMemo, useState } from 'react';

import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import TopupModal from '@/modules/blockchains/components/TopupModa_V2';
import { useAppSelector } from '@/stores/hooks';
import {
  getL2ServicesStateSelector,
  getOrderDetailSelected,
} from '@/stores/states/l2services/selector';
import { getErrorMessage } from '@/utils/errorV2';
import { formatCurrencyV2 } from '@/utils/format';
import sleep from '@/utils/sleep';
import { Button, Image, useDisclosure } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import l2ServicesAPI, {
  IInstallAccountAbstractionByData,
} from '@/services/api/l2services';
import BigNumber from 'bignumber.js';
import { useAccountAbstractionStore } from '@/modules/blockchains/detail_v3/account-abstraction_v2/store/hook';
import toast from 'react-hot-toast';

const LaunchButton = () => {
  const {
    feeRateErrMsg,
    feeRate,
    tokenContractAddress,
    tokenContractAddressErrMsg,
  } = useAccountAbstractionStore();

  const { loggedIn, login } = useWeb3Auth();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const { orderDetail } = useAppSelector(getOrderDetailSelected);

  const [isSubmiting, setSubmitting] = useState(false);
  const [priceTopupBVM, setPriceTopupBVM] = useState(9999);
  const isDsiabledBtn = useMemo(() => {
    return (
      isEmpty(feeRate) ||
      isEmpty(tokenContractAddress) ||
      !isEmpty(feeRateErrMsg) ||
      !isEmpty(tokenContractAddressErrMsg)
    );
  }, [
    feeRateErrMsg,
    feeRate,
    tokenContractAddress,
    tokenContractAddressErrMsg,
  ]);

  const {
    isOpen: isOpenTopUpModal,
    onOpen: onOpenTopUpModal,
    onClose: onCloseTopUpModal,
  } = useDisclosure({
    id: 'MODAL_TOPUP',
  });

  const handleOnClick = async () => {
    if (!loggedIn) {
      return login();
    }

    if (!orderDetail || !tokenContractAddress || !feeRate) {
      return;
    }

    setSubmitting(true);

    let isSuccess = false;

    try {
      const params: IInstallAccountAbstractionByData = {
        orderID: orderDetail.orderId,
        appName: 'account_abstraction',
        aaPaymasterTokenID: tokenContractAddress,
        aaTokenGas: new BigNumber(feeRate || 1).multipliedBy(1e18).toFixed(),
      };

      console.log(' installDAppAAByData --- params  --- ', params);

      const result = await l2ServicesAPI.installDAppAAByData(params);

      console.log('installDAppAAByData --- result --- ', result);

      // TO DO CALL API
      if (result) {
        isSuccess = true;
        toast.success('Submit successfully!');
      }
    } catch (error) {
      console.log('ERROR: ', error);
      isSuccess = false;
      const { message } = getErrorMessage(error);
      // toast.error(message);
      if (message && message.toLowerCase().includes('insufficient balance')) {
        onOpenTopUpModal();
      }
    } finally {
      await sleep(1);
      if (isSuccess) {
        // router.push('/chains');
      } else {
        // router.push('/rollups?hasOrderFailed=true');
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        borderRadius={'16px'}
        px={'20px'}
        py={'10px'}
        bgColor={'#FA4E0E'}
        color={'#fff'}
        fontSize={['22px']}
        fontWeight={500}
        onClick={handleOnClick}
        isLoading={isSubmiting}
        disabled={isDsiabledBtn}
        isDisabled={isDsiabledBtn}
        title="ABCE"
        _hover={{
          cursor: isDsiabledBtn ? 'not-allowed' : 'pointer',
          opacity: isDsiabledBtn ? '' : 0.8,
        }}
        rightIcon={<Image src={'/launch.png'} w={'22px'} h={'22px'} />}
      >
        {'Install'}
      </Button>
      {isOpenTopUpModal && (
        <TopupModal
          show={isOpenTopUpModal}
          infor={{
            paymentAddress: `${
              accountInforL2Service?.topUpWalletAddress || '--'
            }`,
          }}
          onClose={onCloseTopUpModal}
          onSuccess={async () => {}}
          // balanceNeedTopup={`${tierData?.priceNote || '--'}`}
          balanceNeedTopup={`${formatCurrencyV2({
            amount: priceTopupBVM,
            decimals: 0,
          })} BVM `}
        />
      )}
    </>
  );
};

export default LaunchButton;
