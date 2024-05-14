'use client';

import { Divider, Flex, Box } from '@chakra-ui/react';
import BodyInfor from './BodyInfor';
import BottomInfor from './BottomInfor';
import HeaderRow from './HeaderRow';
import { OrderItem } from '@/stores/states/l2services/types';
import { useState } from 'react';
import BillingModal from '../../BillingModal';
import TopupModal from '../../TopupModal';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useAppSelector } from '@/stores/hooks';
import SendFormModal from '../../SendFormModal';

type Props = {
  item: OrderItem;
  onClick: () => void;
  viewBillingCB?: () => void;
  isOwner?: boolean;
};

const L2Instance = (props: Props) => {
  const { item, onClick, isOwner, viewBillingCB } = props;

  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [showSendFormModal, setShowSendFormModal] = useState(false);

  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  const viewBillingOnClickHandler = () => {
    setShowBillingModal(true);
  };

  const viewPaymentOnClickHandler = () => {
    setShowTopupModal(true);
  };

  return (
    <>
      <Flex
        flexDir={'column'}
        gap={'15px'}
        p={'5px'}
        bgColor={'transparent'}
        onClick={onClick}
      >
        <Box
          bgColor={'#fff'}
          flexDir={'column'}
          minH={'410px'}
          p={'20px'}
          _hover={{
            cursor: 'pointer',
            borderColor: '#b6b7b7b1',
            boxShadow: 'md',
          }}
        >
          <HeaderRow item={item} />
          <Divider my={'20px'} borderColor="gray.200" />
          <BodyInfor item={item} />
          <Divider my={'20px'} borderColor="gray.200" />
          <BottomInfor
            item={item}
            isOwner={isOwner}
            viewBillingOnClick={viewBillingOnClickHandler}
          />
        </Box>
      </Flex>

      {showBillingModal && (
        <BillingModal
          show={showBillingModal}
          item={item}
          viewPaymentOnClick={viewPaymentOnClickHandler}
          onClose={() => {
            setShowBillingModal(false);
          }}
          onSuccess={async () => {}}
        />
      )}

      {showTopupModal && (
        <TopupModal
          show={showTopupModal}
          infor={{
            paymentAddress: accountInforL2Service?.topUpWalletAddress,
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
          onSuccess={async () => {}}
        />
      )}
    </>
  );
};

export default L2Instance;
