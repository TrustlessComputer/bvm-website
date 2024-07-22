import useL2Service from '@/hooks/useL2Service';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useEffect } from 'react';
import MainPage from './MainPage';
import SkeletonLoading from './SkeletonLoading';

type Props = {
  cloneItemCallback: (template: IModelCategory[]) => void;
};

const ExplorePage = (props: Props) => {
  const { cloneItemCallback } = props;
  const { getTemplateV2 } = useL2Service();
  const { isTempalteFetched } = useAppSelector(getL2ServicesStateSelector);

  useEffect(() => {
    if (!isTempalteFetched) {
      getTemplateV2();
    }
  }, [isTempalteFetched]);

  return !isTempalteFetched ? (
    <SkeletonLoading />
  ) : (
    <MainPage
      cloneItemCallback={(item) => {
        cloneItemCallback && cloneItemCallback(item.template);
      }}
    />
  );
};

export default ExplorePage;
