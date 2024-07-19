import { SimpleGrid, Skeleton, Flex, Spinner } from '@chakra-ui/react';

const SkeletonLoading = () => {
  return (
    <SimpleGrid
      columns={[1, 2, 3]}
      w={'100%'}
      maxH={'max-content'}
      spacing={['24px']}
      mt={'25px'}
    >
      {new Array(6).fill(0).map((item, index) => (
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
  );
};

export default SkeletonLoading;
