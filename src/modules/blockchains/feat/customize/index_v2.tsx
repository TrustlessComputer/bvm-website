import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useBuy } from '../../providers/Buy.hook';
import SubmitFormModal from './SubmitFormModal';
import SubmitResultFormModal from './SubmitResultFormModal';
import LeftView from './components2/LeftView';
// import RightView from './components2/RightView';
import RightView from './components2/RightView_vs2';

import FooterView from './FooterView';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BlockieAvatar } from '../../components/BlockieAvatar';
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import s from './styles.module.scss';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import TopupModal from '../../components/TopupModal';
import SendFormModal from '../../components/SendFormModal';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { ProverEnum, WITHDRAWAL_PERIOD_DEFAULT } from './Buy.constanst';

export type Props = {
  onSuccess?: () => void;
};

export const BuyPage = React.memo((props: Props) => {
  const { onSuccess } = props;
  const {
    confirmSubmitHandler,
    showSubmitForm,
    setShowSubmitForm,
    showSubmitFormResult,
    setShowSubmitFormResult,
    rollupProtocolSelected,
    showTopupModal,
    setShowTopupModal,
    showSendFormModal,
    setShowSendFormModal,
    setProverSelected,
    proverSelected,
    setWithdrawalPeriodSelected,
    isMainnet,
  } = useBuy();

  const { accountInforL2Service, availableListFetching } = useAppSelector(
    getL2ServicesStateSelector,
  );

  if (availableListFetching)
    return (
      <Flex
        height={'80dvh'}
        flexDir={'column'}
        margin={'auto'}
        align={'center'}
        justify={'center'}
      >
        <Spinner color="#000" size="xl" />
      </Flex>
    );

  return (
    <Flex
      direction={'column'}
      p={['2px', '8px', '10px']}
      gap={'20px'}
      className={s.container}
    >
      <Flex
        p={['20px', '28px', '40px', '50x']}
        direction={'column'}
        borderRadius={'20px'}
        display={'flex'}
        overflow={'visible'}
        bgColor={'#fff'}
        gap={'30px'}
      >
        <Flex direction={'row'} flex={1} overflow={'visible'}>
          {/* <LeftView /> */}
          <RightView />
        </Flex>
        <FooterView />
      </Flex>

      {showSubmitForm && (
        <SubmitFormModal
          show={showSubmitForm}
          onClose={() => {
            setShowSubmitForm(false);
          }}
          onSuccess={async () => {
            confirmSubmitHandler();
          }}
          onTopupNow={async () => {
            setShowTopupModal(true);
          }}
        />
      )}

      {showSubmitFormResult && (
        <SubmitResultFormModal
          show={showSubmitFormResult}
          onClose={() => {
            setShowSubmitFormResult(false);
          }}
          onSuccess={async () => {}}
        />
      )}

      {showTopupModal && (
        <TopupModal
          show={showTopupModal}
          warningMessage={
            'Operating your Bitcoin L2 testnet requires 1 $BVM per day.'
          }
          infor={{
            paymentAddress: `${accountInforL2Service?.topUpWalletAddress}`,
          }}
          onClose={() => {
            setShowTopupModal(false);
          }}
          onSuccess={async () => {}}
          payWithNakaWalletCB={() => {
            setShowSendFormModal(true);
          }}
        />
      )}

      {showSendFormModal && (
        <SendFormModal
          show={showSendFormModal}
          onClose={() => {
            setShowSendFormModal(false);
          }}
          onSuccess={async () => {
            setShowSendFormModal(false);
          }}
        />
      )}
    </Flex>
  );
});
