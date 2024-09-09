import CRollupL2API from '@/services/api/dapp/rollupl2';
import {
  IActiveAddressChart,
  IRollupL2Info,
} from '@/services/api/dapp/rollupl2/interface';
import { compareString } from '@/utils/string';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import cs from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import ActiveAddressChart from './ActiveAddressChart';
import ActiveAddressPerChain from './ActiveAddressPerChain';
import s from './styles.module.scss';
import dayjs from 'dayjs';
import ActiveAddressChainPercent from './ActiveAddressChainPercent';
import BigNumber from 'bignumber.js';

const DAY_FILTERS = [
  {
    value: 90,
    label: '90 days',
  },
  {
    value: 180,
    label: '180 days',
  },
  {
    value: 360,
    label: '1 year',
  },
  {
    value: -1,
    label: 'Maximum',
  },
];

const AddressesEngagement = () => {
  const rollupApi = useRef(new CRollupL2API()).current;
  const [charts, setCharts] = useState<IActiveAddressChart[]>([]);
  const [rollupData, setRollupData] = useState<IRollupL2Info[]>([]);
  const [day, setDay] = useState(DAY_FILTERS[0].value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const rs = await rollupApi.getActiveAddress1D();
      setCharts(rs.charts);
      setRollupData(rs.rollup_datas);
    } catch (error) {}
  };

  const reCharts: IActiveAddressChart[] = useMemo(() => {
    let _charts: IActiveAddressChart[] = [];
    if (charts.length > day) {
      _charts = charts.slice(charts.length - day, charts.length);
    } else {
      _charts = charts;
    }
    return _charts as unknown as IActiveAddressChart[];
  }, [charts, day]);

  const activeAddresses = useMemo(() => {
    return reCharts.map((c) => [c.timestamp * 1000, c.address_actived_day]);
  }, [reCharts]);

  const activeAddressPerChain = useMemo(() => {
    return rollupData.map((c) => {
      return {
        type: 'stackedColumn',
        name: c.name,
        showInLegend: false,
        yValueFormatString: '#,###',
        dataPoints: reCharts.map((v) => ({
          label: dayjs.unix(v.timestamp).format('DD MMM, YY'),
          y: v.chain_charts.find((_v) => compareString(_v.rollup_data_id, c.id))
            ?.address_actived_day,
        })),
      };
    });
  }, [reCharts, rollupData]);

  const activeAddressChainPercent = useMemo(() => {
    return rollupData.map((c) => {
      return {
        type: 'stackedColumn100',
        name: c.name,
        showInLegend: false,
        dataPoints: reCharts.map((v) => ({
          label: dayjs.unix(v.timestamp).format('DD MMM, YY'),
          y: Number(
            new BigNumber(
              v.chain_charts.find((_v) =>
                compareString(_v.rollup_data_id, c.id),
              )?.address_actived_day || 0,
            )
              .dividedBy(v.address_actived_day)
              .multipliedBy(100)
              .toFixed(2),
          ),
        })),
      };
    });
  }, [reCharts, rollupData]);

  return (
    <>
      <Text className={s.title}>Layer 2 Weekly Engagement</Text>
      <Text className={s.desc}>
        Number of distinct addresses interacting with one or multiple Layer 2s
        in a given week.
      </Text>
      <Box className={s.chartWrapper}>
        <Tabs isLazy={true} lazyBehavior="keepMounted" defaultIndex={0}>
          <Flex
            flex={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap="12px"
          >
            <TabList>
              <Tab>Active Address</Tab>
              <Tab>Active Address per Chain</Tab>
              <Tab>Percentage</Tab>
            </TabList>
            <Flex className={s.filterWrapper}>
              {DAY_FILTERS.map((d) => (
                <Flex
                  key={d.value}
                  className={cs(
                    s.btnFilter,
                    compareString(day, d.value) && s.btnFilterActive,
                  )}
                  onClick={() => setDay(d.value)}
                >
                  <Text>{d.label}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              <ActiveAddressChart data={activeAddresses} />
            </TabPanel>
            <TabPanel>
              <ActiveAddressPerChain data={activeAddressPerChain} />
            </TabPanel>
            <TabPanel>
              <ActiveAddressChainPercent data={activeAddressChainPercent} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default AddressesEngagement;
