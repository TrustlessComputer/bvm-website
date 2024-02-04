import { Box, Table, Text } from '@chakra-ui/react';
import React from 'react';
import s from './Vesting.module.scss';
import BoxContent from '@/layouts/BoxContent';

const Vesting = () => {
  return (
    <Box
      className={s.wrapper}
      position={'relative'}
    >
      <Box className={s.table_wrapper}>
        <Text mb={{ base: "32px", lg: "60px" }} fontSize="24px">BVM Vesting 5 Year Schedule</Text>
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
              <td>Community</td>
              <td>5 years</td>
              <td>No cliff</td>
              <td>Monthly</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Vesting;
