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
        height={'300px'}
        w={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Image
          src={'/blockchains/customize/ic-empty.svg'}
          w={'150px'}
          h={'auto'}
          objectFit={'contain'}
          alignSelf={'center'}
          style={{ filter: 'invert(100%)' }}
        />
      </Flex>
    );
  };

  const renderItem = (item: HistoryItemResp, index: number) => {
    const { created_at, amount, status, type, instanceInfo, orderTypeVersion } =
      item;

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
        fontSize={['14px', '15px', '16px']}
        className={s.font}
      >
        <Th width="20%" className={s.font}>
          {formatDateTime({
            dateTime: new Date(created_at).getTime(),
          }).toLocaleString()}
        </Th>
        <Th
          width="20%"
          color={'#000'}
          textTransform={'capitalize'}
          className={s.font}
        >
          {type === 3
            ? orderTypeVersion != 3
              ? 'Monthly Fee'
              : 'Daily Fee'
            : HistoryTypeMap[type] || '--'}
        </Th>
        <Th
          width="20%"
          color={'#000'}
          textTransform={'capitalize'}
          textAlign={'center'}
          className={s.font}
        >
          {type === HistoryType.HistoryType_Topup ||
          type === HistoryType.HistoryType_WithdrawBalance
            ? '--'
            : instanceInfo?.chainName || '--'}
        </Th>

        <Th
          width="20%"
          color={HistoryStatusColorMap[status] || '#000'}
          textTransform={'capitalize'}
          className={s.font}
          textAlign={'center'}
        >
          {HistoryStatusMap[status] || '--'}
        </Th>

        <Th width="20%" color={formatValue.color} className={s.font}>
          {formatValue.prefix + ` ` + formatAmountV3(amount) + ' BVM'}
        </Th>
      </Tr>
    );
  };

  const renderHistoryList = () => {
    return historyList.map((item, index) => renderItem(item, index));
  };

  return (
    <TableContainer
      maxH="600px"
      w={'100%'}
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
      <Table variant="unstyled" w={'100%'}>
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
            fontSize={['10px', '11px', '12px']}
            className={s.font}
          >
            <Th
              width="20%"
              fontWeight={700}
              fontSize={['10px', '11px', '12px']}
              className={s.font}
              style={{
                fontSize: 12,
              }}
            >
              Date
            </Th>
            <Th
              maxW="20%"
              fontWeight={700}
              fontSize={['10px', '11px', '12px']}
              className={s.font}
            >
              <Flex flexDir={'row'} align="center" gap={'5px'}>
                <Text
                  className={s.font}
                  fontSize={['10px', '11px', '12px']}
                  fontWeight={700}
                  style={{
                    fontSize: 12,
                  }}
                >
                  Description
                </Text>
              </Flex>
            </Th>
            <Th
              width="20%"
              fontWeight={700}
              fontSize={['10px', '11px', '12px']}
              className={s.font}
              textAlign={'center'}
              style={{
                fontSize: 12,
              }}
            >
              Rollup
            </Th>
            <Th
              width="20%"
              fontWeight={700}
              fontSize={['10px', '11px', '12px']}
              textAlign={'center'}
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
              fontSize={['10px', '11px', '12px']}
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
          {!historyList || historyList.length < 1
            ? renderDataEmptyView()
            : renderHistoryList()}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
