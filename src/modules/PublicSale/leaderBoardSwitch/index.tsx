import { Flex } from '@chakra-ui/layout';
import React from 'react';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import cs from 'classnames';
import { compareString } from '@/utils/string';
import { commonSelector } from '@/stores/states/common/selector';
import { setLeaderBoardMode } from '@/stores/states/common/reducer';

export const LEADER_BOARD_MODE = {
  DAY: 0,
  ALL: 1,
}


type IProp = {
  classNames: string
}
const LeaderBoardSwitch = ({classNames}: IProp) => {
  const leaderBoardMode = useSelector(commonSelector).leaderBoardMode;
  const dispatch = useDispatch();

  return (
    <Flex className={`${s.container} ${classNames}`}>
      <Button
        className={cs(
          s.btn,
          compareString(leaderBoardMode, LEADER_BOARD_MODE.DAY) && s.active,
        )}
        onClick={() => dispatch(setLeaderBoardMode(LEADER_BOARD_MODE.DAY))}
      >
        24H
      </Button>
      <Button
        className={cs(
          s.btn,
          compareString(leaderBoardMode, LEADER_BOARD_MODE.ALL) && s.active,
        )}
        onClick={() => dispatch(setLeaderBoardMode(LEADER_BOARD_MODE.ALL))}
      >
        ALL
      </Button>
    </Flex>
  );
};

export default LeaderBoardSwitch;
