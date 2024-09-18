import { useEffect, useMemo, useRef } from 'react';

import { formatCurrency } from '@/utils/format';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ActiveAddressChainPercent = ({ data = [] }: { data: any }) => {
  const chartComponentRef = useRef<any>(null);
  const options: any = useMemo(() => {
    return {
      animationEnabled: true,
      exportEnabled: false,
      dataPointWidth: 0,
      height: 200,
      title: {
        text: '',
      },
      legend: {
        verticalAlign: 'center',
        horizontalAlign: 'right',
      },
      axisX: {
        lineColor: '#f5f5f5',
        gridColor: '#f5f5f5',
        labelFontSize: 10,
        labelFontColor: '#434343',
        tickColor: '#f5f5f5',
      },
      axisY: {
        suffix: '%',
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
                '%</div>';
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

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.set(
        'dataPointWidth',
        Math.ceil(
          chartComponentRef.current.axisX[0].bounds.width /
            chartComponentRef.current.data[0].dataPoints.length,
        ),
        true,
      );
    }
  }, []);

  return (
    <CanvasJSChart
      options={options}
      onRef={(ref: any) => (chartComponentRef.current = ref)}
    />
  );
};

export default ActiveAddressChainPercent;
