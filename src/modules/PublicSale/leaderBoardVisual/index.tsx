import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { publicSaleLeaderBoardVisualSelector, userSelector } from '@/stores/states/user/selector';
import { setPublicSaleLeaderBoardVisual } from '@/stores/states/user/reducer';
import { getPublicSaleContributionLatest, getPublicSaleLeaderBoards, getPublicSaleTop } from '@/services/public-sale';
import AvatarItem from '@/modules/PublicSale/leaderBoardVisual/AvatarItem';
import AnimatedText from '@/modules/PublicSale/leaderBoardVisual/FloatTexts';
import { useSelector } from 'react-redux';
import { LEADER_BOARD_MODE } from '@/modules/PublicSale/leaderBoardSwitch';
import { requestReload, setAnimatedLatestContributors, setNeedCheckDeposit } from '@/stores/states/common/reducer';
import AuthenStorage from '@/utils/storage/authen.storage';
import useWindowSize from '@/hooks/useWindowSize';

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

interface IProps {
}

const LeaderBoardVisual = (props: IProps) => {
  const { list } = useAppSelector(publicSaleLeaderBoardVisualSelector);
  const [listRender, setListRender] = useState<ILeaderBoardPoint[]>([]);
  const [listMissingRender, setListMissingRender] = useState<ILeaderBoardPoint[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const leaderBoardMode = useSelector(commonSelector).leaderBoardMode;
  const latestContributors = useRef<ILeaderBoardPoint[]>([]);
  const animatedLatestContributors = useRef<ILeaderBoardPoint[]>([]);
  const user = useAppSelector(userSelector);
  const refInterval = useRef<any>();
  const needCheckDeposit = useAppSelector(commonSelector).needCheckDeposit;
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const { mobileScreen } = useWindowSize();
  const TOTALs = 39;

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
  }, [needReload, leaderBoardMode, mobileScreen]);

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardPoint[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardPoint) => item.twitter_id,
        );
      };

      const fnLoadData = leaderBoardMode === LEADER_BOARD_MODE.DAY ? getPublicSaleTop : getPublicSaleLeaderBoards;

      const getLimit = () => {
        const limitMobile = mobileScreen ? (TOTALs - 2) : TOTALs;
        return leaderBoardMode === LEADER_BOARD_MODE.DAY ? limitMobile : token ? (TOTALs - 1) : limitMobile;
      };

      const { data: response, count } = await fnLoadData({
        ...refParams.current,
        limit: getLimit(),
      });
      if (isNew) {
        // const { data: response2 } = await fnLoadData({
        //   page: 1,
        //   limit: 0,
        // });
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
    let res = await getPublicSaleContributionLatest();
    const oldContributors = latestContributors?.current;

    const newRes = res.filter(function(el) {
      return oldContributors?.findIndex(a => a.deposit_id === el.deposit_id) < 0;
    });

    if (newRes?.length > 0) {
      latestContributors.current = [...newRes].concat(latestContributors.current);
      dispatch(requestReload());
    }
    animatedLatestContributors.current = newRes || [];
    dispatch(setAnimatedLatestContributors(newRes || []));
  };

  useEffect(() => {

    let refLevel = 0;
    const levels = mobileScreen ? [1, 3, 4, 4, 5, 5, 5, 5, 5] : [1, 3, 5, 6, 8, 8, 8];
    const missingLength = (mobileScreen ? (TOTALs - 1) : TOTALs) - list.length;
    const missingArray = Array.from({ length: missingLength }).map((u, i) => ({
      ranking: 1000,
      usdt_value: 0,
      twitter_id: '',
      twitter_username: '',
      twitter_avatar: '/none-avatar.jpeg',
    })) as unknown as ILeaderBoardPoint[];

    let sortList = [...list].sort((a, b) => {
      return Number(b?.usdt_value) - Number(a?.usdt_value);
    })

    const tmsss = sortList.concat(missingArray).map((el, index) => {
      const tmp: ILeaderBoardPoint = { ...el, levelRender: refLevel, lastRender: false };
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

    setListRender(tmsss.slice(0, mobileScreen ? (TOTALs - 2) : TOTALs));
    setListMissingRender(missingArray);
  }, [list, mobileScreen]);

  return (
    <div className={styles.container} id={LEADER_BOARD_ID}>
      <ScrollWrapper
        hasIncrementedPageRef={hasIncrementedPageRef}
        wrapClassName={styles.wrapScroll}
        hideScrollBar={false}
        onFetch={() => {
        }}
        isFetching={true}
        onFetchNewData={() => {
        }}
      >
        {
          listRender.map((item, index) => {
            return <>
              <AvatarItem data={item} idx={index} isShowName={index < 4}
                          isYou={user?.twitter_id === item?.twitter_id} />
              {
                item?.lastRender &&
                <span className={`${styles.lastRender} ${styles[`lastRender__${item?.levelRender}`]}`}></span>
              }
            </>;
          })
        }
      </ScrollWrapper>
      <AnimatedText latestContributors={needCheckDeposit ? animatedLatestContributors?.current : []} />
    </div>
  );
};

export default LeaderBoardVisual;
