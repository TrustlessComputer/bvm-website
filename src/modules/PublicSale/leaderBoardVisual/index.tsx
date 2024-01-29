import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { publicSaleLeaderBoardVisualSelector } from '@/stores/states/user/selector';
import { setPublicSaleLeaderBoardVisual } from '@/stores/states/user/reducer';
import { getPublicSaleContributionLatest, getPublicSaleLeaderBoards, getPublicSaleTop } from '@/services/public-sale';
import AvatarItem from '@/modules/PublicSale/leaderBoardVisual/AvatarItem';
import AnimatedText from '@/modules/PublicSale/leaderBoardVisual/FloatTexts';
import { Tooltip } from '@chakra-ui/react';
import ContributorInfo from '@/modules/PublicSale/components/contributorInfo';
import { useSelector } from 'react-redux';
import { LEADER_BOARD_MODE } from '@/modules/PublicSale/leaderBoardSwitch';

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

interface IProps {
}

const LeaderBoardVisual = (props: IProps) => {
  const { list } = useAppSelector(publicSaleLeaderBoardVisualSelector);
  const [listRender, setListRender] = useState<ILeaderBoardPoint[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const emptyArray: number[] = Array.from({ length: (13 * 5) });
  const indexUserInsert = Math.floor(Math.random() * emptyArray.length);
  const leaderBoardMode = useSelector(commonSelector).leaderBoardMode;
  const [latestContributors, setLatestContributors] = useState<ILeaderBoardPoint[]>([]);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 24,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestData();
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [needReload, leaderBoardMode]);

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardPoint[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardPoint) => item.twitter_id,
        );
      };

      const fnLoadData = leaderBoardMode === LEADER_BOARD_MODE.DAY ? getPublicSaleTop : getPublicSaleLeaderBoards;

      const { data: response, count } = await fnLoadData({
        ...refParams.current,
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
      console.log('LeaderBoardVisual error', error)
    } finally {
      // setIsFetching(false);
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
    }
  };

  const fetchLatestData = async () => {
    const res = await getPublicSaleContributionLatest();
    setLatestContributors(res);
  }

  useEffect(() => {

    let refLevel = 0;
    const levels = [1, 3, 5, 6, 8];
    const tmsss = list.map((el, index) => {

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

    setListRender(tmsss);

  }, [list]);

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
          listRender.slice(0, 23).map((item, index) => {
            return <>
              <Tooltip minW='220px'
                       bg='white'
                       boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
                       borderRadius='4px'
                       padding='16px'
                       hasArrow
                       label={
                         <ContributorInfo data={item}/>
                       }
              >
                <AvatarItem data={item} />
              </Tooltip>
              {
                item.lastRender && <span className={styles.lastRender}></span>
              }
            </>;
          })
        }
        {/*<div className={styles.emptyArray}>*/}
        {/*  {*/}
        {/*    emptyArray.map((item, index) => {*/}

        {/*      if (index === indexUserInsert) {*/}
        {/*        return (*/}
        {/*          <Tooltip minW='220px'*/}
        {/*                   bg='white'*/}
        {/*                   boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'*/}
        {/*                   borderRadius='4px'*/}
        {/*                   padding='16px'*/}
        {/*                   hasArrow*/}
        {/*                   label={*/}
        {/*                     <ContributorInfo />*/}
        {/*                   }*/}
        {/*          >*/}
        {/*            <AvatarYou />*/}
        {/*          </Tooltip>*/}
        {/*        );*/}
        {/*      }*/}
        {/*      return <>*/}
        {/*        <Image*/}
        {/*          className={styles.emptyArray_label}*/}
        {/*          width={120}*/}
        {/*          height={120}*/}
        {/*          src={'/images/elipse.jpg'} alt={'elipse'} />*/}
        {/*      </>;*/}
        {/*    })*/}
        {/*  }*/}
        {/*</div>*/}
        {/*<AddMoreContribution />*/}
      </ScrollWrapper>
      <AnimatedText latestContributors={latestContributors}/>
    </div>
  );
};

export default LeaderBoardVisual;
