import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';
import CRollupL2API from '@/services/api/dapp/rollupl2';
import ActiveAddressChart from './ActiveAddressChart';
import { IActiveAddressChart } from '@/services/api/dapp/rollupl2/interface';
import dayjs from 'dayjs';

const AddressesEngagement = () => {
  const rollupApi = useRef(new CRollupL2API()).current;
  const [charts, setCharts] = useState<IActiveAddressChart[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const rs = await rollupApi.getActiveAddress1D();
      setCharts(rs.charts);
    } catch (error) {}
  };

  const activeAddresses = useMemo(() => {
    let _charts = [];
    if (charts.length > 360) {
      _charts = charts.slice(charts.length - 360, charts.length);
    } else {
      _charts = charts;
    }
    return _charts.map((c) => [c.timestamp * 1000, c.address_actived_day]);
  }, [charts]);

  return (
    <>
      <Text className={s.title}>Layer 2 Weekly Engagement</Text>
      <Text className={s.desc}>
        Number of distinct addresses interacting with one or multiple Layer 2s
        in a given week.
      </Text>
      <Box className={s.chartWrapper}>
        <Tabs>
          <TabList>
            <Tab>Active Address</Tab>
            <Tab>Active Address per Chain</Tab>
            <Tab>Percentage</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ActiveAddressChart data={activeAddresses} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default AddressesEngagement;
