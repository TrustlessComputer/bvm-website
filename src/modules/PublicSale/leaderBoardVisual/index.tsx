import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import { ILeaderBoardPoint } from '@/interfaces/leader-board-point';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { leaderBoardSelector } from '@/stores/states/user/selector';
import { setLeaderBoard } from '@/stores/states/user/reducer';
import { getPublicSaleLeaderBoards } from '@/services/public-sale';
import AvatarItem from '@/modules/PublicSale/leaderBoardVisual/AvatarItem';
import AnimatedText from '@/modules/PublicSale/leaderBoardVisual/FloatTexts';
import Image from 'next/image';
import AvatarYou from '@/modules/PublicSale/leaderBoardVisual/AvatarYou';
import AddMoreContribution from '@/modules/PublicSale/addMoreContribution';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import s from '@/modules/PublicSale/BuyForm/styles.module.scss';
import HorizontalItem from '@/components/HorizontalItem';

const valueToClassName: any = {
  '10': 'boost_10',
  '20': 'boost_20',
  '30': 'boost_30',
};

const valueToImage: any = {
  '10': 'flash_normal.svg',
  '20': 'flash_fast.svg',
  '30': 'flash_supper.svg',
};

export const LEADER_BOARD_ID = 'LEADER_BOARD_ID';

interface IProps {
}

const LeaderBoardVisual = (props: IProps) => {
  const { list } = useAppSelector(leaderBoardSelector);
  const [listRender, setListRender] = useState<ILeaderBoardPoint[]>([]);
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const emptyArray: number[] = Array.from({ length: (13 * 5) });
  const indexUserInsert = Math.floor(Math.random() * emptyArray.length);

  const hasIncrementedPageRef = useRef(false);
  const refParams = useRef({
    page: 1,
    limit: 50,
  });
  const refInitial = useRef(false);

  useEffect(() => {
    fetchData(true);
  }, [needReload]);

  const removeOwnerRecord = (arr: ILeaderBoardPoint[] = []) => {
    return arr;
  };

  const fetchData = async (isNew?: boolean) => {
    try {
      const sortList = (arr: ILeaderBoardPoint[]) => {
        return uniqBy(
          orderBy(arr, (item) => Number(item.need_active || false), 'desc'),
          (item: ILeaderBoardPoint) => item.twitter_id,
        );
      };
      const { data: response, count } = await getPublicSaleLeaderBoards({
        ...refParams.current,
      });
      if (isNew) {
        const { data: response2 } = await getPublicSaleLeaderBoards({
          page: 1,
          limit: 0,
        });
        refParams.current = {
          ...refParams.current,
          page: 1,
        };
        const reArr = removeOwnerRecord(response);
        const arr = sortList(response2.concat(reArr));
        dispatch(
          setLeaderBoard({
            list: arr,
            count,
          }),
        );
      } else {
        const reArr = removeOwnerRecord(response);
        const arr = sortList([...reArr]);
        dispatch(
          setLeaderBoard({
            list: arr,
            count,
          }),
        );
      }
    } catch (error) {
    } finally {
      // setIsFetching(false);
      hasIncrementedPageRef.current = false;
      refInitial.current = true;
    }
  };


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

  const ContributorInfo = () => {
    return (
      <Flex direction={'column'} w={'284px'} gap={4} className={s.contributorInfo}>
        <HorizontalItem className={s.rowData} label={'USER'} value={'clinkzchan'} />
        <HorizontalItem className={s.rowData} label={'RANK'} value={'1,000'} />
        <HorizontalItem className={s.rowData} label={'CONTRIBUTION'} value={'$120,000'} />
        <HorizontalItem className={s.rowData} label={'ALLOCATION'} value={<Text color={'#FF5312'}>15 BVM</Text>} />
        <HorizontalItem className={s.rowData} label={'BOOST'} value={
          <Flex gap={1} alignItems={'center'}>
            <svg width='14' height='20' viewBox='0 0 14 20' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.6663 8.18093H8.21179L9.42391 0.908203L0.333008 11.8173H5.78755L4.57543 19.09L13.6663 8.18093Z'
                fill='url(#paint0_linear_29823_6261)' />
              <defs>
                <linearGradient id='paint0_linear_29823_6261' x1='0.333008' y1='9.99911' x2='13.6663'
                                y2='9.99911' gradientUnits='userSpaceOnUse'>
                  <stop stop-color='#007659' />
                  <stop offset='1' stop-color='#35CCA6' />
                </linearGradient>
              </defs>
            </svg>
            <Text fontSize={'16px'} fontWeight={'500'} className={s.boostLight}>10%</Text>
          </Flex>
        } />
      </Flex>
    );
  };

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
                         <ContributorInfo />
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
        <AddMoreContribution />
      </ScrollWrapper>
      <AnimatedText />
    </div>
  );
};

export default LeaderBoardVisual;
