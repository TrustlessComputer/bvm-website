import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
  Text,
  Button,
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
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import TopupModal from '../components/TopupModal';
import SendFormModal from '../components/SendFormModal';

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
    showTopupModal,
    setShowTopupModal,
    showSendFormModal,
    setShowSendFormModal,
    isMainnet,
  } = useBuy();
  const router = useRouter();
  const { isL2ServiceLogged, onConnect } = useL2Service();
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  if (isAvailableListFetching)
    return (
      <Flex height={'100dvh'} align={'center'} justify={'center'}>
        <Spinner color="#000" size="xl" />
      </Flex>
    );

  if (!availableListData) return <></>;

  return (
    <Flex direction={'column'} py="10px" gap={'20px'} className={s.container}>
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

        {!isL2ServiceLogged ? (
          <Flex
            align={'center'}
            fontSize={'16px'}
            fontWeight={500}
            color={'#000'}
          >
            <Text>
              {`Check Your Bitcoin L2 Setup and Status - `}
              <Text
                as="span"
                color={'#4E4A8D'}
                textDecorationLine={'underline'}
                textUnderlineOffset={2}
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
                onClick={() => {
                  // onLogin();
                  onConnect && onConnect();
                }}
              >
                {`Connect wallet`}
              </Text>
            </Text>
          </Flex>
        ) : (
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            alignSelf={'flex-end'}
            px={'28px'}
            py={'16px'}
            minW={['180px']}
            height={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            _hover={{
              bgColor: '#e5601b',
            }}
            onClick={() => {
              router.push('/blockchains');
            }}
          >
            Check your Bitcoin L2
          </Button>
        )}
      </Flex>

      <Flex
        px={'50px'}
        py={'20px'}
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
