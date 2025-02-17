import { Form, Formik } from 'formik';
import { IFormValues, TokenType } from '@/modules/Bridge/types';
import { XRP_RIPPLE, XRP_TC_RIPPLE } from '@/modules/Bridge/constant';
import FormContent from '@/modules/Bridge/components/BridgeForm/FormContent';
import BigNumber from 'bignumber.js';
// import CBridgeContract from '@/contract/Bridge';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
// import { useAppDispatch } from '@stores/hooks';
// import { requestReload } from '@stores/states/common/reducer';
import { showError, showSuccess } from '@components/toast';
// import { getErrorMessage } from '@utils/error';
import { getExplorer } from '@utils/helpers';
import { capitalizeFirstLetter } from '@web3auth/ui';
import { estimateBridge, isRippleAddress } from '@/modules/Bridge/utils';
import BigNumberJS from 'bignumber.js';
import { useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { getErrorMessage } from '@/utils/errorV2';
import useToggleDeposit from '@/modules/Bridge/components/DepositQRCode/useToggleDeposit';
import CBridgeContract from '@/contract/Bridge';

const BridgeForm = () => {
  const bridgeContract = new CBridgeContract();
  const { address, onConnect } = useWagmiContext();
  const dispatch = useAppDispatch()
  const { onOpen } = useToggleDeposit();

  const onValidate = (values: IFormValues) => {
    const { fromToken, toToken, fromNetwork, toNetwork, isQRCode } = values;
    const { minAmount } = estimateBridge({ fromToken, toToken, fromNetwork, toNetwork });

    const errors: any = {};

    if (!isQRCode) {
      if (!values.fromAmount) {
        errors.fromAmount = 'Required.';
      } else if (new BigNumber(values.fromAmount).gt(values?.balance || '0')) {
        errors.fromAmount = `Insufficient balance.`;
      } else if (new BigNumberJS(values.fromAmount).lte(minAmount)) {
        errors.fromAmount = `Amount must be greater than ${minAmount} ${fromToken?.symbol}.`;
      } else if (!fromToken) {
        errors.fromAmount = 'Please select token.';
      } else if (!toNetwork) {
        errors.fromAmount = 'Please select network.';
      }

      if (!values?.recipient) {
        errors.recipient = 'Required.';
      } else if (!isRippleAddress(values?.recipient)) {
        errors.recipient = 'Invalid address.';
      }

    }
    return errors;
  }

  const onSubmit = async (values: IFormValues) => {
    console.log('onSubmit', {
      tokenAddress: values.fromToken.address,
      bridgeAddress: values.fromToken.bridgeAddress[values.toNetwork.name],
      chain: values.fromToken.network.name,
      receiver: values?.recipient || address || "",
      destinationChainId: values.toToken.chainId,
      fromChainId: values.fromToken.chainId,
      humanAmount: values.fromAmount
    });
    try {
      if (!address) {
        await onConnect(values.toToken.chainId);
        return
      }

      const receiver = values.toToken.tokenType === TokenType.SOLANA ? values.recipient : address;
      if (!receiver) {
        showError({
          message: 'Please input receiver address.'
        });
        return;
      }

      if (values.isQRCode) {
        onOpen();
      } else {
        const hash = await bridgeContract.onBridgeToken({
          tokenAddress: values.fromToken.address,
          bridgeAddress: values.fromToken.bridgeContractAddress,
          receiver: receiver || "",
          destinationChainId: values.toToken.chainId,
          fromChainId: values.fromToken.chainId,
          humanAmount: values.fromAmount,
          toChainId: values.toToken.chainId
        })
        showSuccess({
          message: `Place bridge successfully.`,
          url: getExplorer({
            hash: hash as string,
            network: values.fromToken.network.name as any,
          }) as any,
        });
      }

    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      dispatch(requestReload());
    }
  }

  return (
    <Formik
      initialValues={{
        fromNetwork: XRP_RIPPLE.network,
        toNetwork: XRP_TC_RIPPLE.network,
        fromToken: XRP_RIPPLE,
        toToken: XRP_TC_RIPPLE,
        fromAmount: '',
        toAmount: '',
        balance: undefined,
        isNeedApprove: true,
        isQRCode: undefined
      } as IFormValues
    }
      validate={onValidate}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormContent />
        </Form>
      )}
    </Formik>

  );
}

export default BridgeForm;
