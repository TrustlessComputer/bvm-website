import { Flex, Skeleton, Spinner } from '@chakra-ui/react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useEffect, useState } from 'react';

const withLoading =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const {
      isOrderDetailFetched,
      isAvailableListTemplateFetched,
      isModelCategoriesFetched,
    } = useAppSelector(getL2ServicesStateSelector);

    const [delay, setDelay] = useState(true);

    // useEffect(() => {
    //   setTimeout(() => {
    //     setDelay(false);
    //   }, 1000);
    // }, []);

    if (
      !delay &&
      isOrderDetailFetched &&
      isAvailableListTemplateFetched &&
      isModelCategoriesFetched
    ) {
      return <WrappedComponent {...props} />;
    }

    return (
      <Flex w={'100%'} h="100dvh" justify={'center'} align={'center'}>
        <Spinner color="black" />
      </Flex>
    );
  };

export default withLoading;
