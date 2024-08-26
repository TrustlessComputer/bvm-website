import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import s from './styles.module.scss';

const L2RollupFee = ({
  data,
  header,
  prefix,
}: {
  data: number[];
  header: any;
  prefix: string;
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      visible: false,
      type: 'datetime',
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'area',
        data: data,
      },
    ],
    chart: {
      height: '176px',
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0,
      //   marginRight: 0,
      //   marginLeft: 0,
    },
    plotOptions: {
      area: {
        marker: {
          radius: 2,
        },
        lineWidth: 2,
        lineColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, 'rgba(250, 78, 14, 0.7)'],
            [1, 'rgba(250, 78, 14, 1)'],
          ],
        },
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, 'rgba(250, 78, 14, 0.2)'],
            [1, 'rgba(250, 78, 14, 0.5)'],
          ],
        },
        states: {
          hover: {
            lineWidth: 4,
          },
        },
        threshold: null,
      },
    },
    tooltip: {
      formatter: function () {
        return (
          '<span class="tooltip-title">' +
          dayjs.unix(this.x as any).format('ll') +
          '</span><br/><span class="tooltip-desc">' +
          prefix +
          formatCurrency(this.y, 0, 2) +
          '</span>'
        );
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const addressChart =
        document.getElementsByClassName('highcharts-title')?.[1];

      if (addressChart) {
        const span = addressChart.getElementsByTagName('span');
        if (span[0]) {
          span[0].setAttribute('flow', 'down');
          span[0].setAttribute(
            'tooltip',
            'Active addresses are those that have executed at least one transaction.\nThe count of addresses is specific to Layer 2 on Bitcoin, excluding BTC addresses',
          );
          console.log('span[0]', span[0]);
        }
        // console.log('span', span);
      }
    }, 1000);
  }, []);

  return (
    <Box className={s.chartContainer}>
      {header}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </Box>
  );
};

export default L2RollupFee;
