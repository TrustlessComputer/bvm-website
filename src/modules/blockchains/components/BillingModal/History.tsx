import { useAppSelector } from '@/stores/hooks';
import { historyInfoSelector } from '@/stores/states/l2services/selector';
import { HistoryItemResp } from '@/stores/states/l2services/types';
import { formatAmountV3 } from '@/utils/format';
import { formatDateTime } from '@/utils/time';
import {
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  HistoryStatusColorMap,
  HistoryStatusMap,
  HistoryType,
  HistoryTypeMap,
} from './History.types';

export default () => {
  const { historyList } = useAppSelector(historyInfoSelector);

  const renderDataEmptyView = () => {
    return (
      <Flex
        flexDir={'column'}
        flex={1}
        height={'300px'}
        width={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Text fontSize={'25px'} fontWeight={700} color={'#000'}>
          No Bitcoin L2s available
        </Text>
        <Image
          src={'/blockchains/customize/ic-empty.svg'}
          w={'150px'}
          h={'auto'}
          objectFit={'contain'}
          style={{ filter: 'invert(100%)' }}
        />
      </Flex>
    );
  };

  const renderItem = (item: HistoryItemResp, index: number) => {
    const { created_at, amount, status, type } = item;

    const formatAmountColor = () => {
      const result = {
        color: '#000',
        prefix: '',
      };

      switch (type) {
        case HistoryType.HistoryType_Topup:
          {
            result.color = '#0ec00e';
            result.prefix = '+';
          }
          break;
        case HistoryType.HistoryType_WithdrawBalance:
        case HistoryType.HistoryType_ChargeOperationFee:
        case HistoryType.HistoryType_ChargeServiceFee:
          {
            result.color = '#FF4747';
            result.prefix = '-';
          }
          break;
        default:
      }
      return result;
    };

    const formatValue = formatAmountColor();

    return (
      <Tr key={index} h={'70px'} fontWeight={500}>
        <Th width="20%">
          {formatDateTime({
            dateTime: new Date(created_at).getTime(),
          }).toLocaleString()}
        </Th>
        <Th width="50%" color={'#000'}>
          {HistoryTypeMap[type] || '--'}
        </Th>
        <Th width="50%" color={HistoryStatusColorMap[status] || '#000'}>
          {HistoryStatusMap[status] || '--'}
        </Th>

        <Th width="20%" color={formatValue.color}>
          {formatValue.prefix + ` ` + formatAmountV3(amount) + ' BVM'}
        </Th>
        {/* <Th width="20%">
          <Image
            src={'/blockchains/customize/ic-copy-1.svg'}
            w={'18px'}
            h={'auto'}
            objectFit={'contain'}
          ></Image>
        </Th> */}
      </Tr>
    );
  };

  const renderHistoryList = () => {
    return historyList.map((item, index) => renderItem(item, index));
  };

  return (
    <TableContainer
      mt={'20px'}
      maxH="600px"
      overflowY="auto"
      color={'#000'}
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          width: '4px',
          backgroundColor: '#5e5e5e',
          borderRadius: '4px',
        },
      }}
    >
      <Table variant="unstyled">
        <Thead
          position={'sticky'}
          top={0}
          bgColor={'#F6F6F6'}
          overflow="auto"
          zIndex={1}
        >
          <Tr
            h={'70px'}
            bgColor={'#F6F6F6'}
            overflow="auto"
            position={'sticky'}
            top={0}
            zIndex={1}
          >
            <Th width="20%" fontWeight={600} fontSize={'16px'}>
              Date
            </Th>
            <Th width="20%" fontWeight={600} fontSize={'16px'}>
              Description
            </Th>
            <Th width="50%" fontWeight={600} fontSize={'16px'}>
              Status
            </Th>
            <Th width="20%" fontWeight={600} fontSize={'16px'}>
              Amount
            </Th>
            {/* <Th width="20%"></Th> */}
          </Tr>
        </Thead>

        <Tbody>
          {!historyList || historyList.length < 0
            ? renderDataEmptyView()
            : renderHistoryList()}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
