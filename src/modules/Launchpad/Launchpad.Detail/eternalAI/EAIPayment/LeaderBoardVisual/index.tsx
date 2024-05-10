import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import AvatarItem from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/LeaderBoardVisual/AvatarItem';
import AnimatedText from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/LeaderBoardVisual/FloatTexts';

import { isMobile } from 'react-device-detect';
import BigNumber from 'bignumber.js';
import { arrayRange } from '../ContributionIDs';
import { first, groupBy, last, map } from 'lodash';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import {
  needCheckDepositSelector,
  publicSaleLeaderBoardVisualSelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { useAppSelector } from '@/stores/hooks';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import { commonSelector } from '@/stores/states/common/selector';
import { useDispatch } from 'react-redux';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { userSelector } from '@/stores/states/user/selector';
import {
  setAnimatedLatestContributors,
  setNeedCheckDeposit,
  setPublicSaleLeaderBoardVisual,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { requestReload } from '@/stores/states/common/reducer';
import { getCollectEternalSeedAttr } from '@/modules/staking/components/EternalSeeds/helpers';

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

export const LEADER_BOARD_MODE = {
  DAY: 0,
  ALL: 1,
};

const LeaderBoardVisual = () => {
  const launchpadAPI = useRef(new CPaymentEAIAPI()).current;
  const { list } = useAppSelector(publicSaleLeaderBoardVisualSelector);

  const [listRender, setListRender] = useState<ILeaderBoardEAI[]>([]);
  const [listRender100, setListRender100] = useState<ILeaderBoardEAI[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const leaderBoardMode = LEADER_BOARD_MODE.ALL;
  const latestContributors = useRef<ILeaderBoardEAI[]>([]);
  const animatedLatestContributors = useRef<ILeaderBoardEAI[]>([]);
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const refInterval = useRef<any>();
  const needCheckDeposit = useAppSelector(needCheckDepositSelector);
  const token = useAppSelector(userSelector);
  const TOTALs = 79;

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: TOTALs,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    dispatch(setNeedCheckDeposit(false));
    fetchLatestData();
    const interval = setInterval(() => {
      fetchLatestData();
    }, 10000);

    setTimeout(() => {
      dispatch(setNeedCheckDeposit(true));
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchData(true);

    if (refInterval.current) {
      clearInterval(refInterval.current);
    }

    refInterval.current = setInterval(() => {
      fetchData(true);
    }, 30000);

    return () => {
      clearInterval(refInterval.current);
    };
  }, [needReload, leaderBoardMode]);

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardEAI[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardEAI) => item.id,
        );
      };

      const fnLoadData =
        leaderBoardMode === LEADER_BOARD_MODE.DAY
          ? launchpadAPI.getPublicSaleTop
          : launchpadAPI.getPublicSaleLeaderBoards;

      const getLimit = () => {
        const limitMobile = isMobile ? TOTALs - 7 : TOTALs;
        return leaderBoardMode === LEADER_BOARD_MODE.DAY
          ? limitMobile
          : token
          ? TOTALs - 1
          : limitMobile;
      };

      const { data: response, count } = await fnLoadData({
        ...refParams.current,
        limit: getLimit(),
      });

      if (isNew) {
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const arr = sortList([...response]);
        dispatch(
          setPublicSaleLeaderBoardVisual({
            list: arr,
            count,
          }),
        );
      } else {
        const arr = sortList([...response]);
        dispatch(
          setPublicSaleLeaderBoardVisual({
            list: arr,
            count,
          }),
        );
      }
    } catch (error) {
      console.log('LeaderBoardVisual error', error);
    } finally {
      // setIsFetching(false);
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
    }
  };

  const fetchLatestData = async () => {
    const res = await launchpadAPI.getPublicSaleContributionLatest();

    const oldContributors = latestContributors?.current;

    const newRes = res.filter(function (el) {
      return (
        oldContributors?.findIndex((a) => a.deposit_id === el.deposit_id) < 0
      );
    });

    if (newRes?.length > 0) {
      latestContributors.current = [...newRes].concat(
        latestContributors.current,
      );
      dispatch(requestReload());
    }
    animatedLatestContributors.current = newRes || [];
    dispatch(setAnimatedLatestContributors(newRes || []));
  };

  useEffect(() => {
    let refLevel = 0;
    const levels = (
      isMobile ? [1, 3, 4, 4, 5] : [1, 3, 5, 6, 8, 8, 8, 8, 8, 8, 8, 8]
    ) as any[];
    const missingLength = (isMobile ? TOTALs - 1 : TOTALs) - list.length;
    const missingArray = Array.from({ length: missingLength }).map(() => ({
      ranking: 1000,
      usdt_value: 0,
      twitter_id: '',
      twitter_username: '',
      twitter_avatar: '/none-avatar.jpeg',
    })) as unknown as ILeaderBoardEAI[];

    const sortList = [...list].sort((a, b) => {
      return Number(b?.usdt_value) - Number(a?.usdt_value);
    });

    const tmsss = sortList.concat(missingArray).map((el) => {
      const tmp: ILeaderBoardEAI = {
        ...el,
        levelRender: refLevel,
        lastRender: false,
      };
      tmp.levelRender = refLevel;
      if (levels[refLevel] > 0) {
        levels[refLevel]--;
        if (levels[refLevel] === 0) {
          refLevel++;
          tmp.lastRender = true;
        }
      }

      return tmp;
    });

    setListRender(tmsss.slice(0, isMobile ? TOTALs - 7 : TOTALs));
    setListRender100(tmsss.slice(0, 100));
  }, [list]);

  const topBrains = useMemo(() => {
    const _total = listRender100.reduce(
      (p: number, c) => parseFloat(c.usdt_value || '0') + p,
      0,
    );

    const brainTops = [];
    let currentBrainNumber = 650;

    const groups = (arr: any[] = []) => {
      return map(
        groupBy(
          arr.map((a) => getCollectEternalSeedAttr(a)),
          'label',
        ),
        (v, k) => {
          return {
            title: k,
            num: v.length,
            obj: first(v),
            first: first(v).id,
            last: last(v).id,
          };
        },
      );
    };

    for (let i = 0; i < listRender.length; i++) {
      const v = listRender[i];
      const brain = Math.floor(
        new BigNumber(new BigNumber(v?.usdt_value || '0').dividedBy(_total))
          .multipliedBy(1350)
          .toNumber(),
      );

      brainTops.push({
        address: v?.address,
        brains: groups(
          arrayRange(
            currentBrainNumber,
            currentBrainNumber + brain - 1,
            1,
          ) as any[],
        ),
      });
      currentBrainNumber += brain;
    }

    return brainTops;
  }, [listRender100, listRender]);

  return (
    <div className={styles.container} id={LEADER_BOARD_ID}>
      <ScrollWrapper
        hasIncrementedPageRef={hasIncrementedPageRef}
        wrapClassName={styles.wrapScroll}
        // hideScrollBar={false}
        onFetch={() => {}}
        isFetching={true}
        onFetchNewData={() => {}}
      >
        {listRender.map((item, index) => {
          return (
            <>
              <AvatarItem
                data={item}
                idx={index}
                isShowName={index < 4}
                isYou={address === item?.address}
                key={item?.twitter_id || item?.address}
                topBrains={topBrains as any}
              />
              {item?.lastRender && (
                <span
                  className={`${styles.lastRender} ${
                    styles[`lastRender__${item?.levelRender}`]
                  }`}
                />
              )}
            </>
          );
        })}
      </ScrollWrapper>
      <AnimatedText
        latestContributors={
          (needCheckDeposit ? animatedLatestContributors?.current : []) as any[]
        }
      />
    </div>
  );
};

export default LeaderBoardVisual;
