import useL2Service from '@/hooks/useL2Service';
import ChainsGrid from './ChainsGrid';
import SkeletonLoading from './SkeletonLoading';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
  templateV2Selector,
} from '@/stores/states/l2services/selector';

type Props = {
  cloneItemCallback: (template: IModelCategory[]) => void;
};

const ExplorePage = (props: Props) => {
  const { cloneItemCallback } = props;
  const { getAllOrderList, getTemplateV2 } = useL2Service();
  const { isFetchedAllOrders, isTempalteFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const dataList = useAppSelector(templateV2Selector);

  useEffect(() => {
    if (!isTempalteFetched) {
      getTemplateV2();
    }
  }, [isTempalteFetched]);

  return !isTempalteFetched ? (
    <SkeletonLoading />
  ) : (
    <ChainsGrid orderList={dataList} cloneItemCallback={cloneItemCallback} />
  );
};

export default ExplorePage;
