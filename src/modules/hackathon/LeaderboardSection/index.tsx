import React from 'react';
import s from './LeaderboardSection.module.scss';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import Leaderboard from './Leaderboard';
import Problems from '../Problems';

type Props = {};

const LeaderboardSection = (props: Props) => {
  return (
    <Box bgColor={'#000'}>
      <div className="containerV3">
        <div className={cn(s.wrapper)}>
          <div className={s.left}>
            <h4>Problems</h4>
            <Problems />
          </div>
          <div className={s.right}>
            <h4>Leaderboard</h4>
            <Leaderboard />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default LeaderboardSection;
