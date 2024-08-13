import { Box, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import styles from '../styles.module.scss';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const L2RollupFee = ({ data }: { data: number[] }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const options: Highcharts.Options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        type: 'area',
        data: data,
      },
    ],
  };

  return (
    <Box>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </Box>
  );
};

export default L2RollupFee;
