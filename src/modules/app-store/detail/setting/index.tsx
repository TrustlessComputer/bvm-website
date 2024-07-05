import { useAppSelector } from '@/stores/hooks';
import { myOrderListFilteredByNetwork } from '@/stores/states/l2services/selector';
import { Box } from '@chakra-ui/react';
import useL2Service from '@hooks/useL2Service';
import { useEffect } from 'react';

const SettingView = () => {
  const { getMyOrderList } = useL2Service();

  useEffect(() => {
    getMyOrderList();
  }, []);

  const myOrders = useAppSelector(myOrderListFilteredByNetwork);
  console.log('myOrders', myOrders);

  return (
    <Box>
      SettingView
    </Box>
  );
};

export default SettingView;
