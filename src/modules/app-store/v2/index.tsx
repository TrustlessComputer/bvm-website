import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from './item';
import { useEffect, useMemo } from 'react';
import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getDAListSelector } from '@/stores/states/l2services/selector';
import { useRouter } from 'next/navigation';
import { APP_STORE } from '@/constants/route-path';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { IDApp } from '@/services/api/DAServices/types';
import Section from '@/modules/app-store/v2/section';
import AppItem2 from '@/modules/app-store/v2/item2';
import AppItem3 from '@/modules/app-store/v2/item3';
import Hero from '@/modules/app-store/v2/Hero';
import { DA_DUMMY_LIST } from '@/services/api/DAServices/constants';

const AppStoreModule = () => {
  const { getDappsList, getMyOrderList, getAccountInfor } = useL2Service();
  const { loggedIn, login } = useWeb3Auth();
  const DAppList = useAppSelector(getDAListSelector);

  const activeApps = useMemo(() => {
    return DAppList.filter(da => da.status === 'active');
  }, [DAppList]);

  const walletApps = useMemo(() => {
    return DAppList.filter(da => da.category === 'wallet_apps');
  }, [DAppList]);

  const bridgeApps = useMemo(() => {
    return DAppList.filter(da => da.category === 'bridge_apps');
  }, [DAppList]);

  const defiApps = useMemo(() => {
    return DA_DUMMY_LIST.filter(da => da.category === 'defi_apps');
  }, [DAppList]);

  const router = useRouter();

  useEffect(() => {
    getDappsList();
    if (loggedIn) {
      getMyOrderList();
      getAccountInfor();
    }
  }, [loggedIn]);

  const handleSelectAppCb = (item: IDApp) => {
    router.push(`${APP_STORE}/${item?.id}`);
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
        <Hero data={activeApps}/>
        <Section title={'Wallet'}>
          <SimpleGrid columns={[1, 2]} gap={'24px'}>
            {walletApps?.map((d) => {
              return <AppItem3 data={d} handleSelectApp={handleSelectAppCb} />;
            })}
          </SimpleGrid>
        </Section>
        <Section title={'Bridge'}>
          <SimpleGrid columns={[1, 2]} gap={'24px'}>
            {bridgeApps?.map((d) => {
              return <AppItem3 data={d} handleSelectApp={handleSelectAppCb} />;
            })}
          </SimpleGrid>
        </Section>
        <Section title={'DeFi'}>
          <SimpleGrid columns={[1, 2]} gap={'24px'}>
            {defiApps?.map((d) => {
              return <AppItem2 data={d} handleSelectApp={handleSelectAppCb} />;
            })}
          </SimpleGrid>
        </Section>
        <Section title={'Gaming'}>
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
    </Box>
  );
};

export default AppStoreModule;
