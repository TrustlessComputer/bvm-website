import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Flex, Spinner } from '@chakra-ui/react';

const withLoading = (WrappedComponent: any) => (props: any) => {
  const { isAvailableListTemplateFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  if (isAvailableListTemplateFetched) {
    return <WrappedComponent {...props} />;
  }

  return (
    <Flex w={'100%'} h="100dvh" justify={'center'} align={'center'}>
      <Spinner color="black" />
    </Flex>
  );
};

export default withLoading;
