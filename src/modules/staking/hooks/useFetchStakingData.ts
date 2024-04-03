import CStakeV2 from '@/contract/stakeV2/stakeV2.class';
import React from 'react';
import CStakingAPI from '@/services/staking';
import { HistoryType, StakeHistory } from '@/services/interfaces/stakeV2';
import { commonSelector } from '@/stores/states/common/selector';
import {
  setStakeUser,
  removeStakeUser,
  setFetched,
  setMembers,
  setHistory,
  setStakingPercent
} from '@/stores/states/stakingV2/reducer';
import { stakeUserSelector } from '@/stores/states/stakingV2/selector';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

const useFetchStakingData = () => {
  const cStake = new CStakeV2();
  const dispatch = useAppDispatch();
  const needReload = useAppSelector(commonSelector).needReload;
  const stakeUser = useAppSelector(stakeUserSelector);
  const stakingUserAddress = useAppSelector(nakaAddressSelector);
  const stakingAPI = new CStakingAPI();

  const fetchData = async () => {
    if (!stakingUserAddress) return;
    try {
      const stakeUser = await cStake.getStakingInfo();
      console.log('useFetchStakingData', stakeUser);
      dispatch(setStakeUser(stakeUser));
    } catch (error) {
      console.log('useFetchStakingData error: ', { stakingUserAddress, error });
      dispatch(removeStakeUser());
    } finally {
      dispatch(setFetched(true));
    }
  };

  const getStakeMembers = async () => {
    if (!stakingUserAddress || !stakeUser?.userTeamCode) {
      return;
    }
    try {
      const members = await stakingAPI.getTeamMembers({
        teamCode: stakeUser?.userTeamCode || '',
      });
      dispatch(setMembers(members));
    } catch (e) {
      dispatch(setMembers([]));
    }
  };

  const getStakeHistory = async () => {
    if (!stakingUserAddress) {
      return;
    }
    try {
      const history = (
        (await stakingAPI.getStakeHistory({
          address: stakingUserAddress,
        })) || []
      ).map((item: StakeHistory) => ({
        ...item,
        type: item?.restake_at ? HistoryType.restake : item.type,
      })) as StakeHistory[];
      dispatch(setHistory(history));
    } catch (e) {
      dispatch(setHistory([]));
    }
  };

  const getStakingPercent = async () => {
    try {
      const { amountBVMForStaking, percent, maxSupply } =
        await cStake.getStakingPercent();
      dispatch(
        setStakingPercent({
          stakingPercent: percent,
          totalStake: amountBVMForStaking,
          supplyStake: maxSupply,
        }),
      );
    } catch (e) {
      // TODO
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [needReload, stakingUserAddress]);

  React.useEffect(() => {
    getStakeMembers();
    getStakeHistory();
  }, [needReload, stakingUserAddress, stakeUser?.userTeamCode]);

  React.useEffect(() => {
    getStakingPercent();
  }, [needReload]);
};

export default useFetchStakingData;
