'use client';

import { Divider, Flex } from '@chakra-ui/react';
import AppList from './AppList';
import BottomView from './BottomView';
import HeaderView from './HeaderView';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';

type Props = {
  itemOnClick: (item: IModelOption) => void;
  onExport?: () => void;
  onShare?: () => void;
};

const AppViewer = (props: Props) => {
  const { itemOnClick, onExport, onShare } = props;
  const router = useRouter();

  const itemOnClickProxy = (item: IModelOption) => {
    console.log('item ', item);
    const currentPath = window.location.pathname;
    console.log('currentPath ', currentPath);

    switch (item.key) {
      case 'my_blockchain':
        router.back();
        break;

      //Account Abstraction
      case 'flex_pay':
        if (!currentPath?.includes('account-abstraction')) {
          router.push(currentPath + '/account-abstraction');
        }
        break;

      //Staking (TO DO)
      case 'staking':
        break;

      //Issues Token (TO DO)
      case 'issue_token':
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
      <HeaderView />
      <Divider backgroundColor={'#E0E0E0'} />
      <AppList itemOnClick={itemOnClickProxy} />
      <BottomView
        onExportClick={onExportHandler}
        onShareClick={onShareHandler}
      />
    </Flex>
  );
};

export default AppViewer;
