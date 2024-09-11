import { useMemo, useRef } from 'react';

import { formatCurrency } from '@/utils/format';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ActiveAddressPerChain = ({ data = [] }: { data: any }) => {
  const chartComponentRef = useRef<any>(null);
  const options: any = useMemo(() => {
    return {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: '',
      },
      height: 200,
      legend: {
        reversed: true,
        verticalAlign: 'center',
        horizontalAlign: 'right',
      },
      axisY: {
        title: '',
        includeZero: true,
        gridColor: '#f5f5f5',
        lineColor: '#f5f5f5',
        labelFontSize: 10,
        labelFontColor: '#434343',
        tickColor: '#f5f5f5',
      },
      axisX: {
        lineColor: '#f5f5f5',
        gridColor: '#f5f5f5',
        labelFontSize: 10,
        labelFontColor: '#434343',
        tickColor: '#f5f5f5',
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e: any) {
          const dataPoint = e.entries?.[0]?.dataPoint?.label;
          let str =
            '<h4 style="font-weight: 800;font-size: 18px;margin-bottom: 5px" >' +
            dataPoint +
            '</h4>';
          for (let i = 0; i < e.entries.length; i++) {
            const entryData = e.entries[i];
            if (entryData.dataPoint.y) {
              const temp =
                '<div><span style="width: 5px;height:5px;background-color: ' +
                entryData.dataSeries.color +
                '"></div><b style="color: ' +
                entryData.dataSeries.color +
                '" >' +
                entryData.dataSeries.name +
                ': </b>' +
                formatCurrency(entryData.dataPoint.y, 0, 2, 'BTC', true) +
                '</div>';
              str = str.concat(temp);
            }
          }
          return str;
        },
      },
      //   legend: {
      //     verticalAlign: 'center',
      //     horizontalAlign: 'right',
      //     reversed: true,
      //     cursor: 'pointer',
      //   },
      data: data,
    };
  }, [data]);

  return (
    <CanvasJSChart
      options={options}
      onRef={(ref: any) => (chartComponentRef.current = ref)}
    />
  );
};

export default ActiveAddressPerChain;
