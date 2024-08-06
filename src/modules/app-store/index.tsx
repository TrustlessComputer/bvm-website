import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from '@/modules/app-store/item';
import { useEffect } from 'react';
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getDAListSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';
import { APP_STORE } from '@/constants/route-path';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { IDApp } from '@/services/api/DAServices/types';

const AppStoreModule = () => {
  const { getDappsList, getMyOrderList } = useL2Service();
  const { loggedIn, login } = useWeb3Auth();
  const DAppList = useAppSelector(getDAListSelector); // TO DO

  const router = useRouter();

  useEffect(() => {
    getDappsList();
    if (loggedIn) {
      getMyOrderList();
    }
  }, [loggedIn]);

  const handleSelectAppCb = (item: IDApp) => {
    if (loggedIn) {
      router.push(`${APP_STORE}/${item?.id}`);
    } else {
      login();
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
        <SimpleGrid columns={[1, 2]} gap={'60px'}>
          {DAppList?.map((d) => {
            return <AppItem data={d} handleSelectApp={handleSelectAppCb} />;
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default AppStoreModule;
