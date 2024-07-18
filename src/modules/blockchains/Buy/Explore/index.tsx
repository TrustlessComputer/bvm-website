import useL2Service from '@/hooks/useL2Service';
import ChainsGrid from './ChainsGrid';
import SkeletonLoading from './SkeletonLoading';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
} from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';

type Props = {
  cloneItemCallback: (item: OrderItem) => void;
};

const ExplorePage = (props: Props) => {
  const { cloneItemCallback } = props;
  const { getAllOrderList } = useL2Service();
  const { isFetchedAllOrders } = useAppSelector(getL2ServicesStateSelector);

  const allOrders = useAppSelector(allOrdersSelector);

  useEffect(() => {
    getAllOrderList();
  }, []);

  return !isFetchedAllOrders ? (
    <SkeletonLoading />
  ) : (
    <ChainsGrid orderList={allOrders} cloneItemCallback={cloneItemCallback} />
  );
};

export default ExplorePage;
