'use client';
import { fetchAllOrders } from '@/stores/states/l2services/actions';
import { ReactElement, useEffect, useMemo } from 'react';
import HeadingText from './HeadingText';
import LabContent from './LabContent';
import { Modules, Portfolio, Research } from './data';
import s from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  allOrdersSelector,
  getL2ServicesStateSelector,
} from '@/stores/states/l2services/selector';
import { orderAdapter } from './adapter';

const Lab = ({ tab, isDark }: { tab: number; isDark: boolean }) => {
  const dispatch = useAppDispatch();
  const { isFetchedAllOrders, isFetchingAllOrders } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const allOrders = useAppSelector(allOrdersSelector);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllOrders());
    }, 1000);
  }, []);

  const dataList = useMemo(() => {
    const newDataListFromAPI = allOrders.map((item) => orderAdapter(item));
    // console.log('newDataListFromAPI using Adapter', {
    //   newDataListFromAPI,
    // });

    return [...Portfolio, ...newDataListFromAPI];
  }, [Portfolio, isFetchedAllOrders, isFetchingAllOrders, allOrders]);

  const background = useMemo(() => {
    if (isDark) {
      return '#000';
    } else {
      if (tab === 2) {
        return '#fff';
      } else {
        return '#fff';
      }
    }
  }, [tab]);

  return (
    <div
      className={`${s.lab} ${isDark && s.darkTheme}`}
      style={{ backgroundColor: background }}
    >
      <div>
        <LabContent
          isHaveNumber
          heading={<HeadingText first={'Rollups'} headings={['']} />}
          landingData={dataList}
          isDataFetching={!isFetchedAllOrders}
        >
          We partner with bold builders to build apps and protocols that
          reinvent Bitcoin. As technical investors, we invest at the earliest
          stage and take a hands-on approach to help builders build and launch.
        </LabContent>
      </div>
    </div>
  );
};

export default Lab;
