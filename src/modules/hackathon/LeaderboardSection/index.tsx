import React from 'react';
import s from './LeaderboardSection.module.scss';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import Leaderboard from './Leaderboard';

type Props = {};

const LeaderboardSection = (props: Props) => {
  return (
    <Box bgColor={'#000'}>
      <div className={cn(s.wrapper, 'containerV3')}>
        <div className={s.left}>
          <h4>Examp Topic</h4>
        </div>
        <div className={s.right}>
          <h4>Leaderboard</h4>
          <Leaderboard />
        </div>
      </div>
    </Box>
  );
};

export default LeaderboardSection;
