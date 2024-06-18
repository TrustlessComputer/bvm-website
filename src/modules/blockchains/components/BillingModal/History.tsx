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

import s from './styles.module.scss';

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
          No ZK-powered Blockchains available
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
      <Tr
        key={index}
        h={'70px'}
        fontWeight={500}
        fontSize={'16px'}
        className={s.font}
      >
        <Th width="20%" className={s.font}>
          {formatDateTime({
            dateTime: new Date(created_at).getTime(),
          }).toLocaleString()}
        </Th>
        <Th
          width="50%"
          color={'#000'}
          textTransform={'capitalize'}
          className={s.font}
        >
          {HistoryTypeMap[type] || '--'}
        </Th>
        <Th
          width="50%"
          color={HistoryStatusColorMap[status] || '#000'}
          textTransform={'capitalize'}
          className={s.font}
        >
          {HistoryStatusMap[status] || '--'}
        </Th>

        <Th width="20%" color={formatValue.color} className={s.font}>
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
      className={s.font}
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
            h="46px"
            bgColor={'#F6F6F6'}
            overflow="auto"
            position={'sticky'}
            top={0}
            zIndex={1}
            fontWeight={700}
            fontSize={'12px'}
            className={s.font}
          >
            <Th
              width="20%"
              fontWeight={700}
              fontSize={'12px'}
              className={s.font}
              style={{
                fontSize: 12,
              }}
            >
              Date
            </Th>
            <Th
              width="20%"
              fontWeight={700}
              fontSize={'12px'}
              className={s.font}
              style={{
                fontSize: 12,
              }}
            >
              <Flex flexDir={'row'} align="center" gap={'5px'}>
                <Text fontSize={'12px'} fontWeight={700}>
                  Description
                </Text>
                <Image
                  src={'/blockchains/customize/ic-black-infor.svg'}
                  w={'15px'}
                  h={'auto'}
                  objectFit={'contain'}
                />
              </Flex>
            </Th>
            <Th
              width="50%"
              fontWeight={700}
              fontSize={'12px'}
              className={s.font}
              style={{
                fontSize: 12,
              }}
            >
              Status
            </Th>
            <Th
              width="20%"
              fontWeight={700}
              fontSize={'12px'}
              className={s.font}
              style={{
                fontSize: 12,
              }}
            >
              Amount
            </Th>
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
