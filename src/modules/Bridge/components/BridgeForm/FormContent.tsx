import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { IFormValues, TokenType } from '@/modules/Bridge/types';
// import { useAppSelector } from '@stores/hooks';
// import { commonSelector } from '@stores/states/common/selector';
import CBridgeContract from '@/contract/Bridge';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
// import useERC20Balance from '@components/ERC20Balance/useERC20Balance';
// import BigNumberJS from 'bignumber.js';
import AddressBox from '@/modules/Bridge/components/AddressBox';
import InputAmount from '@/modules/Bridge/components/InputAmount';
import InformationBox from '@/modules/Bridge/components/InformationBox';
import SubmitButton from '@/modules/Bridge/components/SubmitButton';
import NetworkRow from 'src/modules/Bridge/components/NetworkRow';
import Recipient from '@/modules/Bridge/components/Recipient';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import DepositQRCodeModal from '@/modules/Bridge/components/DepositQRCode/DepositQRCodeModal';
import useToggleDeposit from '@/modules/Bridge/components/DepositQRCode/useToggleDeposit';
import { compareString } from '@utils/string';
import { CHAIN_ID } from '@components/WagmiConnector/config';
import useERC20Balance from '@hooks/useERC20BalanceVer2';
import BigNumberJS from 'bignumber.js';

const FormContent = () => {
  const formik = useFormikContext();
  const needReload = useAppSelector(commonSelector)?.needReload;
  const bridgeContract = new CBridgeContract();
  const { latestAddress } = useWagmiContext();
  const { isShow, onClose } = useToggleDeposit();
  const { fromToken, fromNetwork, toNetwork, toToken, isQRCode } =
    formik.values as IFormValues;

  const getIsNeedApprove = async () => {
    try {
      if (!fromToken) {
        formik.setFieldValue('isNeedApprove', true);
        return;
      }

      const isNeedApprove = await bridgeContract.isNeedApprove({
        token_address: fromToken.address,
        spender_address: fromToken.bridgeContractAddress,
        chainID: fromToken.chainId,
      });

      formik.setFieldValue('isNeedApprove', isNeedApprove);
    } catch (error) {
      formik.setFieldValue('isNeedApprove', true);
    }
  };

  useEffect(() => {
    getIsNeedApprove();
  }, [fromToken?.address, needReload, latestAddress, toNetwork.name]);

  const { loading } = useERC20Balance({
    tokenAddress: fromToken?.address,
    onBalanceChange: (_amount) =>
      formik.setFieldValue(
        'balance',
        new BigNumberJS(
          new BigNumberJS(_amount || '0').toFixed(4, BigNumberJS.ROUND_FLOOR),
        ).toString(),
      ),
    chainId: fromToken?.chainId,
    walletAddress: latestAddress,
  });

  return (
    <Flex
      direction={'column'}
      alignItems={'center'}
      maxW={{ base: '96vw', md: 'unset' }}
    >
      <Text
        fontSize={{ base: '28px', md: '48px' }}
        fontWeight={'500'}
        lineHeight={{ base: 'unset', md: '57px' }}
        color={'#000'}
        textAlign={'center'}
        maxW={'598px'}
        mb={'32px'}
      >
        Bridges 12345
      </Text>
      <Flex className={s.formContent}>
        <AddressBox />
        <NetworkRow />
        {!isQRCode && (
          <>
            <InputAmount />
            <Recipient />
          </>
        )}
        <InformationBox />
        <SubmitButton loadingBalance={loading} />
        {isShow && <DepositQRCodeModal isOpen={isShow} onClose={onClose} />}
      </Flex>
    </Flex>
  );
};

export default FormContent;
