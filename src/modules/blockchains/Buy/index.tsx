import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { useBuy } from '../providers/Buy.hook';
import SubmitFormModal from './SubmitFormModal';
import SubmitResultFormModal from './SubmitResultFormModal';
import LeftView from './components2/LeftView';
import RightView from './components2/RightView';
import FooterView from './FooterView';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BlockieAvatar } from '../components/BlockieAvatar';
import useL2ServiceAuth from '@/hooks/useL2ServiceAuth';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import s from './styles.module.scss';

export type Props = {
  onSuccess?: () => void;
};

export const BuyPage = React.memo((props: Props) => {
  const { onSuccess } = props;
  const {
    availableListData,
    isAvailableListFetching,
    confirmSubmitHandler,
    showSubmitForm,
    setShowSubmitForm,
    showSubmitFormResult,
    setShowSubmitFormResult,
    rollupProtocolSelected,
  } = useBuy();

  if (isAvailableListFetching)
    return (
      <Flex height={'100dvh'} align={'center'} justify={'center'}>
        <Spinner color="#000" size="xl" />
      </Flex>
    );

  if (!availableListData) return <></>;

  return (
    <Flex
      direction={'column'}
      maxH={'100dvh'}
      py="20px"
      gap={'20px'}
      className={s.container}
    >
      <Flex direction={'row'} align={'center'} justify={'space-between'}>
        <Breadcrumb
          spacing="8px"
          color={'#3f51bc'}
          fontWeight={600}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/blockchains">Blockchains</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Customize</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {/* {isL2ServiceLogged &&
          accountInforL2Service &&
          accountInforL2Service.topUpWalletAddress && (
            <Flex bgColor={'red'} width={'200px'}>
              <BlockieAvatar
                address={accountInforL2Service.topUpWalletAddress}
                size={30}
                ensImage={null}
              />
            </Flex>
          )} */}
      </Flex>

      <Flex
        p={'30px'}
        direction={'column'}
        borderRadius={'20px'}
        display={'flex'}
        overflow={'hidden'}
        bgColor={'#fff'}
        gap={'30px'}
      >
        <Flex direction={'row'} flex={1} overflow={'hidden'}>
          <LeftView />
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
    </Flex>
  );
});
