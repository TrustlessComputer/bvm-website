import { Flex, Skeleton } from '@chakra-ui/react';

const SkeletonLoading = () => {
  return (
    <Flex flexDir={'column'} gap={'20px'}>
      <Skeleton
        h="50px"
        w="50px"
        borderRadius={'100%'}
        alignSelf={'center'}
      ></Skeleton>

      {new Array(3).fill(0).map((item, index) => (
        <Flex key={`${item}-${index}`} flexDir={'column'} gap="10px">
          <Skeleton h="50px" w={'100px'}></Skeleton>
          <Skeleton h="50px"></Skeleton>
        </Flex>
      ))}

      <Skeleton
        h="50px"
        w="200px"
        alignSelf={'center'}
        borderRadius={'8px'}
      ></Skeleton>
    </Flex>
  );
};

export default SkeletonLoading;
