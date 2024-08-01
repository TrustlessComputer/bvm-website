'use client';

import { Divider, Flex } from '@chakra-ui/react';
import AppList from './AppList';
import BottomView from './BottomView';
import HeaderView from './HeaderView';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/stores/hooks';
import { getOrderDetailSelected } from '@/stores/states/l2services/selector';
import PreviewMapModal from '@/modules/blockchains/blockchain-map/components/PreviewMapModal';
import React, { useState } from 'react';

type Props = {
  itemOnClick: (item: IModelOption) => void;
  onExport?: () => void;
  onShare?: () => void;
};

const AppViewer = (props: Props) => {
  const { itemOnClick, onExport, onShare } = props;
  const router = useRouter();
  const { dAppConfigSelected, orderDetail } = useAppSelector(
    getOrderDetailSelected,
  );
  const [isShowModalPreview, setIsShowModalPreview] = useState<boolean>(false);

  const itemOnClickProxy = (item: IModelOption) => {
    const currentPath = window.location.pathname;

    if (dAppConfigSelected?.key?.toLowerCase() === item.key?.toLowerCase()) {
      return;
    }

    switch (item.key) {
      case 'my_blockchain':
        router.push(`/chainsv2/${orderDetail?.orderId}`);
        break;

      //Account Abstraction
      case 'flex_pay':
      case 'account_abstraction':
        if (!currentPath?.includes('account-abstraction')) {
          router.push(`/chainsv2/${orderDetail?.orderId}/account-abstraction`);
        }
        break;

      case 'staking':
        if (!currentPath?.includes('dapp=staking')) {
          router.push(
            `/rollups/rollups-dapp/${orderDetail?.orderId}?dapp=staking`,
          );
        }
        break;

      case 'token_generation':
        if (!currentPath?.includes('dapp=token_generation')) {
          router.push(
            `/rollups/rollups-dapp/${orderDetail?.orderId}?dapp=token_generation`,
          );
        }
        break;

      case 'airdrop':
        if (!currentPath?.includes('dapp=airdrop')) {
          router.push(
            `/rollups/rollups-dapp/${orderDetail?.orderId}?dapp=token_generation`,
          );
        }
        break;

      default:
        break;
    }
    itemOnClick(item);
  };

  const onExportHandler = () => {
    onExport && onExport();
  };

  const onShareHandler = () => {
    onShare && onShare();
  };

  return (
    <Flex
      position={'relative'}
      className={s.container}
      w={'100%'}
      flexDir={'column'}
      align={'center'}
      justify={'flex-start'}
      bgColor={'#fff'}
      borderRadius={'12px'}
      borderWidth={'1px'}
      borderColor={'#e0e0e0'}
      boxShadow="0px 0px 16px 0px #00000012"
    >
      <HeaderView setIsShowModalPreview={setIsShowModalPreview}/>
      <Divider backgroundColor={'#E0E0E0'} />
      <AppList itemOnClick={itemOnClickProxy} />
      <BottomView
        onExportClick={onExportHandler}
        onShareClick={onShareHandler}
      />
      <PreviewMapModal
        show={isShowModalPreview}
        onClose={() => setIsShowModalPreview(false)}
      />
    </Flex>
  );
};

export default AppViewer;
