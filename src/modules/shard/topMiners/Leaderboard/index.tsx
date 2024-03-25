import styles from './styles.module.scss';
import { stakeLeaderBoards, stakeUserSelector } from '@/stores/states/stakingV2/selector';
import React, { useEffect, useMemo, useRef } from 'react';
import stakeV2Services from '@/services/stakeV2';
import { setStakeLeaderBoard } from '@/stores/states/stakingV2/reducer';
import { orderBy, uniqBy } from 'lodash';
import { StakeLeaderBoard } from '@/services/interfaces/stakeV2';
import { compareString } from '@/utils/string';
import { Text } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import { commonSelector } from '@/stores/states/common/selector';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import ListTable, { ColumnProp } from '@components/ListTable';
import LeaderboardItem from '@/modules/shard/topMiners/Leaderboard/Leaderboard.Item';

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(stakeLeaderBoards);
  const stakeUser = useAppSelector(stakeUserSelector);
  const hasIncrementedPageRef = useRef(false);
  const needReload = useAppSelector(commonSelector).needReload;
  const refParams = useRef({
    page: 1,
    limit: 100,
  });

  const sortList = (arr: StakeLeaderBoard[]): StakeLeaderBoard[] => {
    return uniqBy(
      orderBy(
        arr,
        [
          (item: StakeLeaderBoard) =>
            compareString(item.team_code, stakeUser?.userTeamCode),
          (item: StakeLeaderBoard) => new BigNumberJS(item.rewarded).toNumber(),
        ],
        ['desc', 'desc'],
      ),
      (item: StakeLeaderBoard) => item.team_code,
    );
  };

  const data = React.useMemo(() => {
    return sortList(boards).map((item: StakeLeaderBoard) => {
      return {
        ...item,
        need_active: compareString(item.team_code, stakeUser?.userTeamCode),
      };
    });
  }, [boards, stakeUser?.userTeamCode]);

  const refInitial = useRef(false);

  const fetchData = async (isNew?: boolean) => {
    try {
      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
      }
      const response = await stakeV2Services.getLeaderBoard({
        ...refParams.current,
      });
      if (isNew) {
        const response2 = await stakeV2Services.getLeaderBoard({
          page: 1,
          limit: 0,
        });

        refParams.current = {
          ...refParams.current,
          page: 1,
        };

        const newList = sortList(response2.concat(response));
        if (!newList.length) return;
        dispatch(setStakeLeaderBoard(newList));
      } else {
        const newList = sortList([...data, ...response]);
        if (!newList.length) return;
        dispatch(setStakeLeaderBoard(newList));
      }
    } catch (error) {
      // TODO
    } finally {
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [needReload]);

  const labelConfig = {
    color: 'black',
    textDecoration: 'uppercase',
  };

  const columns: ColumnProp[] = useMemo(() => {
    return [
      {
        id: 'Captain',
        label: (
          <Text fontSize="12px" textTransform="uppercase">
            User
          </Text>
        ),
        labelConfig,
      },
      {
        id: 'Total',
        label: (
          <Text fontSize="12px" textTransform="uppercase">
            Total staking
          </Text>
        ),
        labelConfig,
      },
      {
        id: 'Members',
        label: (
          <Text textAlign="center" fontSize="12px" textTransform="uppercase">
            Members
          </Text>
        ),
        labelConfig,
      },
      {
        id: 'Earned',
        label: (
          <Text textAlign="center" fontSize="12px" textTransform="uppercase">
            Earned
          </Text>
        ),
        labelConfig,
      },
    ];
  }, []);

  return (
    <div className={styles.container}>
      <ListTable
        data={data}
        columns={columns}
        className={styles.tableContainer}
        ItemListComponent={(row, _extraData, _columns, i) => (
          <LeaderboardItem data={row} i={i} cols={columns} />
        )}
      />
    </div>
  );
};

export default Leaderboard;
