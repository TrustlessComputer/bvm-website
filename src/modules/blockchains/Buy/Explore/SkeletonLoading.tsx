import { SimpleGrid, Skeleton, Flex, Spinner } from '@chakra-ui/react';

const SkeletonLoading = () => {
  return (
    <Flex flexDir={'column'} gap="20px" my="40px">
      {new Array(3).fill(0).map((_, index) => (
        <Flex key={`${index}`} flexDir={'column'} gap="20px">
          <Skeleton
            w="400px"
            h={'40px'}
            startColor="#bfbfbf"
            endColor="#efefef"
          ></Skeleton>
          <Skeleton
            w="100%"
            h={'40px'}
            startColor="#bfbfbf"
            endColor="#efefef"
          ></Skeleton>
          <SimpleGrid
            columns={[1, 2, 3]}
            w={'100%'}
            maxH={'max-content'}
            spacing={['24px']}
            mt={'25px'}
          >
            {new Array(3).fill(0).map((item, index) => (
              <Flex
                key={`${item}-${index}`}
                h={['450px']}
                borderRadius={'12px'}
                align={'center'}
                justify={'center'}
                bgColor={'#fff'}
                border={'1px solid #4343430f'}
              >
                <Spinner />
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      ))}
    </Flex>
  );
};

export default SkeletonLoading;
