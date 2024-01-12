import { Box, Table, Text } from '@chakra-ui/react';
import React from 'react';
import s from './Vesting.module.scss';
import BoxContent from '@/layouts/BoxContent';

type Props = {};

const Vesting = (props: Props) => {
  return (
    <Box
      className={s.wrapper}
      py={{ base: '40px', md: '100px' }}
      position={'relative'}
    >
      <Box
        bgColor={'#000'}
        w="100vw"
        position={'absolute'}
        top={0}
        left={'calc(-50vw + 50%)'}
        h="100%"
        zIndex={0}
      ></Box>
      <Box className={s.header} zIndex={1} position={'relative'}>
        <Text as="h4" className={s.heading}>
          BVM Vesting
        </Text>
        <Text className={s.desc} maxW={'63ch'} mx={'auto'}>
          Tokens are subject to the following vesting schedule, which aims to
          minimize the negative impacts of vesting unlocks and better align
          incentives.
        </Text>
      </Box>
      <Box className={s.table_wrapper}>
        <table className={s.vesting_table}>
          <thead>
            <tr>
              <th>Role</th>
              <th>Length</th>
              <th>Cliff</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Team</td>
              <td>5 years</td>
              <td>12 months</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>Advisors</td>
              <td>3 years</td>
              <td>6 months</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>Advisors</td>
              <td>2 years</td>
              <td>6 months</td>
              <td>Monthly</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Vesting;
