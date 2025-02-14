import React, { useMemo } from 'react';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import { Button } from '@chakra-ui/react';
import { IFormValues } from '@/modules/Bridge/types';
import { compareString } from '@utils/string';
import { useFormikContext } from 'formik';
import ButtonWrapper2 from '@components/ButtonWrapper2';
import cs from 'classnames';
import s from './styles.module.scss';
import { CHAIN_ID } from '@components/WagmiConnector/config';

interface IProps {
  loadingBalance?: boolean;
}

const SubmitButton = React.memo((props: IProps) => {
  const { loadingBalance } = props;
  const { onConnect, isConnected, onSwitchChain, chainId } = useWagmiContext();
  const { values, isSubmitting } = useFormikContext();
  const {
    fromToken,
    isNeedApprove,
    fromAmount,
  } = values as IFormValues;

  const [switchingNetwork, setSwitchingNetwork] = React.useState(false);

  const isDisabled = useMemo(() => {
    // return isSubmitting || !Boolean(fromAmount) || Boolean(loadingBalance);
    return isSubmitting || Boolean(loadingBalance);
  }, [fromAmount, isSubmitting, loadingBalance]);

  const btnLabel = useMemo(() => {
    return isNeedApprove ? 'Approve and Bridge' : 'Deposit';
  }, [isNeedApprove]);

  const isNeedSwitchChain = useMemo(() => {
    return !compareString(fromToken?.network.chainId, chainId) && !compareString(fromToken?.network.chainId, CHAIN_ID.RIPPLE);
  }, [fromToken?.network.chainId, chainId]);

  const renderButton = () => {
    let comp: React.ReactNode | null = null;
    if (!isConnected) {
      comp = (
        <Button
          type="button"
          onClick={() => {
            onConnect(fromToken.chainId).then();
          }}
        >
          Connect metamask
        </Button>
      )
    } else {
      if (isNeedSwitchChain) {
        comp = (
          <Button
            type="button"
            isDisabled={switchingNetwork}
            isLoading={switchingNetwork}
            loadingText={'Switching network'}
            onClick={() => {
              setSwitchingNetwork(true);
              onSwitchChain(fromToken.chainId)
                .finally(() => {
                  setSwitchingNetwork(false);
                });
            }}
          >
            Switch network
          </Button>
        )
      } else {
        comp = (
          <Button
            type="submit"
            isDisabled={isDisabled}
            isLoading={isSubmitting}
            loadingText={'Processing'}
          >
            {btnLabel}
          </Button>
        )
      }
    }

    return comp;
  }

  return (
    <ButtonWrapper2
      colorName="black"
      buttonType="pump"
      style={{ width: '100%' }}
      className={cs(s.btnSubmit)}
    >
      {renderButton()}
    </ButtonWrapper2>
  );
});

export default SubmitButton;
