import { Flex, Skeleton, Spinner } from '@chakra-ui/react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useEffect, useMemo, useState } from 'react';

const withSkeleton =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const {
      isOrderDetailFetched,
      isAvailableListTemplateFetched,
      isModelCategoriesFetched,
    } = useAppSelector(getL2ServicesStateSelector);

    // const [delay, setDelay] = useState(true);

    const isFetching = useMemo(
      () =>
        !isOrderDetailFetched ||
        !isAvailableListTemplateFetched ||
        !isModelCategoriesFetched,
      [
        isOrderDetailFetched,
        isModelCategoriesFetched,
        isAvailableListTemplateFetched,
      ],
    );

    if (!isFetching) {
      return <WrappedComponent {...props} />;
    }

    return (
      <Flex w={'100%'} h="100dvh" flexDir={'column'} gap={'20px'} p={'30px'}>
        <Skeleton w={'50%'} h={'30px'} alignSelf={'center'} />

        <Flex justify={'space-between'} align={'center'}>
          <Flex flexDir={'row'} align={'center'} gap={'20px'}>
            <Skeleton w={'200px'} h={'60px'} />
            <Skeleton w={'200px'} h={'60px'} />
          </Flex>
          <Skeleton w={'300px'} h={'60px'} />
        </Flex>
        <Flex flexDir={'row'} w={'100%'} h={'100%'} gap={'10px'}>
          <Flex
            flexDir={'column'}
            w={'100px'}
            h={'100%'}
            bgColor={'#fff'}
            gap={'30px'}
            p="12px"
            borderWidth={'1px'}
            borderColor={'#ededed'}
          >
            {new Array(8).fill(0).map((item) => (
              <Skeleton h={'50px'} w="100%" />
            ))}
          </Flex>
          <Flex
            w={'550px'}
            h={'100%'}
            flexDir={'column'}
            bgColor={'#fff'}
            gap={'60px'}
            p="12px"
            borderWidth={'1px'}
            borderColor={'#ededed'}
          >
            {new Array(5).fill(0).map((item) => (
              <Flex flexDir={'column'} gap={'15px'}>
                <Skeleton h={'20px'} w="50%" />
                <Flex flexDir={'row'} align={'center'} gap={'25px'}>
                  <Skeleton h={'40px'} w="100%" />
                  <Skeleton h={'40px'} w="100%" />
                </Flex>
              </Flex>
            ))}
          </Flex>

          <Flex
            flex={1}
            flexDir={'column'}
            h={'100%'}
            justify={'center'}
            align={'center'}
            bgColor={'#fff'}
            gap={'8px'}
            p="12px"
            borderWidth={'1px'}
            borderColor={'#ededed'}
          >
            {new Array(5).fill(0).map((item) => (
              <Skeleton h={'40px'} w="400px" />
            ))}
          </Flex>
          <Flex
            w={'200px'}
            h={'100%'}
            flexDir={'column'}
            bgColor={'#fff'}
            gap={'8px'}
            p="12px"
            borderWidth={'1px'}
            borderColor={'#ededed'}
          >
            {new Array(5).fill(0).map((item) => (
              <Skeleton h={'40px'} w="200px" />
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  };

export default withSkeleton;
