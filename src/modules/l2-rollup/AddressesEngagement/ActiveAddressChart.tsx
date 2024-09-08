import React, { useMemo, useRef } from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/format';

const ActiveAddressChart = ({ data = [] }: { data: any }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const options: Highcharts.Options = useMemo(() => {
    return {
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%b %y}',
          style: {
            fontSize: '10px',
            color: '#434343',
          },
        },
        gridLineColor: '#f5f5f5',
        minorGridLineColor: '#f5f5f5',
        lineColor: '#f5f5f5',
        minorTickColor: '#f5f5f5',
        tickColor: '#b3b3b3',
        tickLength: 6,
        tickPixelInterval: 180,
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          data: data,
        },
      ],
      chart: {
        type: 'column',
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          allowPointSelect: true,
          lineWidth: 4,
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
        },
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
          //@ts-ignore
          const _this = this as any;
          return (
            '<span class="tooltip-title">' +
            dayjs.unix((_this.x / 1000) as any).format('ll') +
            '</span><br/><span class="tooltip-desc">' +
            formatCurrency(_this.y, 0, 2, 'BTC', true) +
            '</span>'
          );
        } as any,
      },
    } as unknown as Highcharts.Options;
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default ActiveAddressChart;
