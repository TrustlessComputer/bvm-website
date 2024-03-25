import { Box, Table, Text, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import s from './Vesting.module.scss';
import BoxContent from '@/layouts/BoxContent';
import { apiClient } from '@/services/index';
import { DEX_API } from '@/config';
import { abbreviateNumber } from '@/utils/format';
import dayjs from 'dayjs';

interface IVesting {
  id: number;
  role: string;
  length: string;
  cliff: string;
  frequency: string;
  unclocked?: string;
  next_vesting?: string;
  next_vesting_amount?: string;
}

const Vesting = () => {
  const [vestings, setVestings] = useState<IVesting[]>();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    onGetVesting();
  }, []);

  const onGetVesting = async () => {
    try {
      const results: IVesting[] = await apiClient.get(
        `${DEX_API}/vesting/bvm/list`,
      );
      const _vestings = [];
      for (const res of results) {
        const result: any = await apiClient.get(
          `${DEX_API}/vesting/bvm/detail/${res.id}`,
        );
        if (result && result.length > 0) {
          _vestings.push({
            ...res,
            unclocked: result[0]?.unclocked,
            next_vesting: result[0]?.next_vesting,
            next_vesting_amount: result[0]?.next_vesting_amount,
          });
        }
      }
      setVestings(_vestings);
    } catch (error) {}
  };

  const onClickVesting = () => {
    setShowDetail(!showDetail);
  };

  return (
    <Box className={s.wrapper} position={'relative'}>
      <Box className={s.table_wrapper}>
        <Text fontSize="24px">BVM Vesting 5 Year Schedule</Text>
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Text
            mt={{ base: '24px', lg: '32px' }}
            mb={'12px'}
            onClick={onClickVesting}
            fontSize="16px"
            w="fit-content"
            textAlign="center"
            cursor={'pointer'}
            opacity={0.8}
            textDecoration={'underline'}
          >
            {showDetail ? 'Back' : 'More details'}
          </Text>
        </Flex>
        <table className={s.vesting_table}>
          <thead>
            {showDetail ? (
              <tr>
                <th>Role</th>
                <th>Released</th>
                <th>Next release</th>
                <th>Release amount</th>
              </tr>
            ) : (
              <tr>
                <th>Role</th>
                <th>Length</th>
                <th>Cliff</th>
                <th>Frequency</th>
              </tr>
            )}
          </thead>
          <tbody>
            {showDetail ? (
              <>
                {vestings &&
                  vestings.length > 0 &&
                  vestings.map((vesting) => {
                    return (
                      <tr>
                        <td>{vesting.role}</td>
                        <td style={{ textAlign: 'center' }}>
                          {abbreviateNumber(vesting?.unclocked)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {dayjs(vesting?.next_vesting).format('MMM D, YYYY')}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {abbreviateNumber(vesting?.next_vesting_amount)}
                        </td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <>
                {vestings &&
                  vestings.length > 0 &&
                  vestings.map((vesting) => {
                    return (
                      <tr>
                        <td>{vesting.role}</td>
                        <td>{vesting.length}</td>
                        <td>{vesting.cliff}</td>
                        <td>{vesting.frequency}</td>
                      </tr>
                    );
                  })}
              </>
            )}
          </tbody>
        </table>
        {/* <Flex w="100%" justifyContent="center" alignItems="center">
          <Text
            mt={{ base: '24px', lg: '32px' }}
            fontSize="16px"
            w="fit-content"
            textAlign="center"
            cursor={'pointer'}
            opacity={0.8}
            textDecoration={'underline'}
          >
            {'View contract'}
          </Text>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default Vesting;
