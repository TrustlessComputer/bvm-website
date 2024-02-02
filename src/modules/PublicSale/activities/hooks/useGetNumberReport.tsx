import React from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { getActivitiesReport } from '@/services/public-sale';
import { setNumberReport } from '@/stores/states/activities/reducer';

const useGetNumberReport = () => {
  const dispatch = useAppDispatch();
  
  const fetchData = async () => {
    try {
      const report = await getActivitiesReport();
      if (report) {
        dispatch(setNumberReport(report))
      }
    } catch (error) {
      // TODO:
    }
  }

  React.useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData()
    }, 10000)
  }, []);
};

export default useGetNumberReport;
