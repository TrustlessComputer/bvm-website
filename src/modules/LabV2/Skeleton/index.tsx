import { Skeleton } from '@chakra-ui/react';

const GridSkeleton = () => {
  return new Array(6)
    .fill(0)
    .map((item, index) => (
      <Skeleton
        key={`${item}-${index}`}
        w={'100%'}
        height={'240px'}
        borderRadius={'12px'}
      ></Skeleton>
    ));
};

export default GridSkeleton;
