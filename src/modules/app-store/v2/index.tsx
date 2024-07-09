import { Box, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from './item';
import { useEffect } from 'react';
import useL2Service from '@/hooks/useL2Service';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getDAListSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';
import { APP_STORE } from '@/constants/route-path';
// import { AccountAbstractionDAppModal } from '../blockchains/components/DAppModal';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { setDAppSelected } from '@/stores/states/l2services/reducer';
import { DA_CODES, IDApp } from '@/services/api/DAServices/types';
import { AccountAbstractionDAppModal } from '@/modules/blockchains/components/DAppModal';
import Section from '@/modules/app-store/v2/section';
import AppItem2 from '@/modules/app-store/v2/item2';

const AppStoreModule = () => {
  const dispatch = useAppDispatch();
  const { getDappsList, getMyOrderList, getAccountInfor } = useL2Service();
  const { loggedIn, login } = useWeb3Auth();
  const DAppList = useAppSelector(getDAListSelector); // TO DO

  const router = useRouter();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure({
    id: 'INSTALL_ACCOUNT_ABSTRACTION_MODAL',
  });

  useEffect(() => {
    getDappsList();
    if (loggedIn) {
      getMyOrderList();
      getAccountInfor();
    }
  }, [loggedIn]);

  const handleSelectAppCb = (item: IDApp) => {
    if (item.code === DA_CODES.account_abstraction) {
      if (loggedIn) {
        dispatch(setDAppSelected(item));
        onOpenModal();
      } else {
        login();
      }
    } else {
      router.push(`${APP_STORE}/${item?.id}`);
    }
  };

  return (
    <Box className={s.container}>
      <Flex className={'containerV3'} direction={'column'} rowGap={'60px'}>
        <Flex direction={'column'} gap={'12px'}>
          <Text className={s.title}>Dapps Store</Text>
          <Text className={s.description}>
            You can choose any app to install
          </Text>
        </Flex>
        <Section title={"Gaming Apps"}>
          <SimpleGrid columns={[1, 2]} gap={'60px'}>
            {DAppList?.map((d) => {
              return <AppItem data={d} handleSelectApp={handleSelectAppCb} />;
            })}
          </SimpleGrid>
          <SimpleGrid columns={[1, 2]} gap={'24px'}>
            {DAppList?.map((d) => {
              return <AppItem2 data={d} handleSelectApp={handleSelectAppCb} />;
            })}
          </SimpleGrid>
        </Section>

      </Flex>

      {isOpenModal && (
        <AccountAbstractionDAppModal
          show={isOpenModal}
          onClose={onCloseModal}
        />
      )}
    </Box>
  );
};

export default AppStoreModule;
