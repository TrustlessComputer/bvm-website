import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector, myOrderListFilteredByNetwork } from '@/stores/states/l2services/selector';
import { Box, Flex } from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import React, { useEffect } from 'react';
import Loading from '@components/Loading';
import s from './styles.module.scss';

const SettingView = () => {
  const { getMyOrderList } = useL2Service();
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  useEffect(() => {
    getMyOrderList();
  }, []);

  const myOrders = useAppSelector(myOrderListFilteredByNetwork);
  console.log('myOrders', myOrders);
  console.log('accountInforL2Service', accountInforL2Service);
  console.log('isMyOrderListFetched', isMyOrderListFetched);
  console.log('======')

  return (
    <Box>
      {
        isMyOrderListFetched ? (
          <Box>SettingView</Box>
        ) : (
          <Flex className={s.loadingContainer}>
            <Loading />
          </Flex>
        )
      }

    </Box>
  );
};

export default SettingView;
