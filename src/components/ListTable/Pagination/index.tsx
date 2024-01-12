
import { Flex, IconButton, Text } from '@chakra-ui/react';

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onChangePage: Function;
  flexConfig?: any;
}

const Pagination = (props: PaginationProps) => {
  const { page, pageSize, total, onChangePage, flexConfig } = props;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <Flex
      className={'pagingContainer'}
      alignItems="center"
      gap={4}
      {...flexConfig}
    >
      <Text>
        Showing {start} - {end} of {total}
      </Text>
      <IconButton
        size={'sm'}
        borderColor={'#000'}
        borderWidth={1}
        colorScheme="whiteAlpha"
        isRound
        variant="outline"
        onClick={() => onChangePage(page - 1)}
        isDisabled={page <= 1}
        aria-label="prev"
        icon={<>&#10094;</>}
      />
      <IconButton
        size={'sm'}
        borderColor={'#000'}
        borderWidth={1}
        colorScheme="whiteAlpha"
        isRound
        variant="outline"
        onClick={() => onChangePage(page + 1)}
        isDisabled={page * pageSize >= total}
        aria-label="next"
        icon={<>&#10095;</>}
      />
    </Flex>
  );
};

export default Pagination;
