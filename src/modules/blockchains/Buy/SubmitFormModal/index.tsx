import BaseModal from '@/components/BaseModal';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';

import { useCallback, useMemo, useState } from 'react';
import { useBuy } from '../../providers/Buy.hook';
import { RollupEnum } from '../Buy.constanst';
import s from './styles.module.scss';
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import BigNumber from 'bignumber.js';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

// const MAX_CLICK = 5;
const MIN_BVM_REQUIRED = 1;

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
  onTopupNow?: () => Promise<void>;
}

const SubmitFormModal = (props: IProps) => {
  const { show, onClose, onSuccess, onTopupNow } = props;
  const {
    computerNameField,
    projectWebSiteField,
    projectXField,
    submitFormParams,
    orderBuyHandler,
    rollupProtocolSelected,
    isMainnet,
    isSubmiting,
  } = useBuy();

  const { onConnect, isLoading } = useL2Service();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  const { loggedIn, setShowLoginModalCustomize } = useWeb3Auth();

  // const [countClick, setCountClick] = useState(0);

  const buttonSubmitObj = useMemo(() => {
    let title = 'Submit';
    let exec: any = () => {};

    if (isMainnet) {
      title = 'Submit';
      exec = onSuccess;
    } else {
      // if (!isL2ServiceLogged || !accountInforL2Service) {
      //   title = 'Connect Wallet';
      //   exec = onConnect;
      // } else {
      //   const isNotEnoughtBalance = new BigNumber(
      //     accountInforL2Service.balanceFormatted,
      //   ).lt(MIN_BVM_REQUIRED); // balance < 1 BVM

      //   // const isNotEnoughtBalance = true;

      //   if (isNotEnoughtBalance) {
      //     title = 'Topup Now';
      //     exec = onTopupNow;
      //   } else {
      //     title = 'Submit';
      //     exec = onSuccess;
      //   }
      // }
      title = 'Submit';
      exec = onSuccess;
    }
    return {
      title,
      exec,
    };
  }, [
    accountInforL2Service,
    onConnect,
    onSuccess,
    isMainnet,
    loggedIn,
    setShowLoginModalCustomize,
  ]);

  const renderRowInfor = (label = '', content = '') => {
    return (
      <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
        <Text fontSize={'18px'} fontWeight={500} color={'#000'}>
          {label}
        </Text>
        <Text fontSize={'18px'} fontWeight={400} color={'#1c1c1c'}>
          {content}
        </Text>
      </Flex>
    );
  };

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="extra"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex flexDir={'column'}>
        {/* <Button
          position={'absolute'}
          top={0}
          left={0}
          w={'150px'}
          h={'150px'}
          _hover={{
            cursor: 'auto',
          }}
          onClick={() => {
            if (countClick < MAX_CLICK) {
              setCountClick((prev) => prev + 1);
            } else {
              orderBuyHandler();
              onClose && onClose();
            }
          }}
        /> */}

        <Flex flexDir={'column'} gap={'20px'} mt={'20px'}>
          {renderRowInfor(
            'ZK-powered Blockchain:',
            submitFormParams?.bitcoinL2Name,
          )}
          {renderRowInfor('Network:', submitFormParams?.network)}
          {renderRowInfor('Block Time:', submitFormParams?.blockTime)}
          {renderRowInfor('Rollup Protocol:', submitFormParams?.rollupProtocol)}
          {rollupProtocolSelected === RollupEnum.Rollup_OpStack &&
            renderRowInfor(
              'Withdrawal Period:',
              submitFormParams?.withdrawPeriod,
            )}
        </Flex>
        <Divider my={'20px'} borderColor="gray.200" />
        <Text fontSize={'22px'} fontWeight={500} color={'#000'}>
          YOUR CONTACT INFO:
        </Text>

        <Flex flexDir={'column'} gap={'20px'} mt={'20px'}>
          {renderRowInfor('Twitter:', submitFormParams?.twName)}
          {renderRowInfor('Telegram:', submitFormParams?.telegram)}

          <Flex flexDir={'row'} gap={'30px'}>
            {/* <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton onClick={onSuccess}>Submit</SubmitButton> */}

            <Button
              flex={1}
              borderColor={'#17066C'}
              color={'#000'}
              minH={'50px'}
              borderRadius={'100px'}
              borderWidth={'1px'}
              onClick={onClose}
            >
              {'Cancel'}
            </Button>
            <Button
              flex={1}
              bgColor={'#17066C'}
              color={'#fff'}
              borderRadius={'100px'}
              minH={'50px'}
              isLoading={isSubmiting || isLoading}
              _hover={{
                opacity: 0.8,
              }}
              onClick={buttonSubmitObj.exec}
            >
              {buttonSubmitObj.title}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default SubmitFormModal;
