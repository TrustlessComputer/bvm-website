import { IDaySecond } from '@/stores/states/activities/types';
import activitiesAPI from '@/services/activities';
import { CurrentBestPNL, TopWinner } from '@/services/interfaces/activities';
import { useAppDispatch } from '@/stores/hooks';
import { setDaySecondActivities } from '@/stores/states/activities/reducer';
import React from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import debounce from 'lodash/debounce'

const useTradeNakaEvent = () => {
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const dispatch = useAppDispatch()

  const fetchData = async () => {
    let daySecond: IDaySecond = {
      topWinners: [],
      bestPNL: undefined
    }
    try {
      const [topWinners, bestPNL] = (
        await Promise.all([
          activitiesAPI.getTopWinnersNaka(),
          activitiesAPI.getBestPNL()
        ])
      ) as [TopWinner[], CurrentBestPNL];
      daySecond = {
        ...daySecond,
        topWinners,
        bestPNL
      }
    } catch (e) {
      // TODO: handle error
    }

    dispatch(setDaySecondActivities(daySecond))
  };

  const debounceFetchData = React.useCallback(debounce(fetchData, 200), [])

  React.useEffect(() => {
    debounceFetchData()
    setInterval(() => {
      debounceFetchData()
    }, 10000)
  }, [token])

};


export default useTradeNakaEvent;
