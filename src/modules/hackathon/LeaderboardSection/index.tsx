import React, { useState } from 'react';
import s from './LeaderboardSection.module.scss';
import { Box, Flex, Grid } from '@chakra-ui/react';
import cn from 'classnames';
import Leaderboard from './Leaderboard';
import Problems from '../Problems';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {};

const LeaderboardSection = (props: Props) => {
  const [isProblemExpand, setIsProblemExpand] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  return (
    <Box bgColor={'#000'}>
      <div className="containerV3">
        <div className={cn(s.container)}>
          <div className={s.header}>
            <p className={s.title}>Practice Session</p>
            <p className={s.desc}>
              To improve your chances of winning the competitions, practice
              regularly to be the best
            </p>
          </div>
          <Flex className={cn(s.wrapper)} as={motion.div}>
            <Box
              as={motion.div}
              className={s.left}
              initial={false}
              animate={{
                width: isProblemExpand ? '100%' : '50%',
                transition: {
                  type: 'keyframes',
                  delay: isProblemExpand ? 0.4 : 0,
                  duration: 0.5,
                },
              }}
              onAnimationComplete={() => {
                if (!isProblemExpand) {
                  setShowLeaderboard(true);
                }
              }}
              // exit={{
              //   width: '50%',
              // }}
            >
              <h4>Problems</h4>
              <Problems
                isProblemExpand={isProblemExpand}
                setIsProblemExpand={setIsProblemExpand}
                setShowLeaderboard={setShowLeaderboard}
              />
            </Box>
            <AnimatePresence>
              {showLeaderboard && (
                <motion.div
                  key="leaderboard"
                  className={s.right}
                  initial={{
                    y: 100,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      // delay: 0.1,
                    },
                  }}
                  exit={{
                    y: 100,
                    opacity: 0,
                  }}
                >
                  <h4>Leaderboard</h4>
                  <Leaderboard />
                </motion.div>
              )}
            </AnimatePresence>
          </Flex>
        </div>
      </div>
    </Box>
  );
};

export default LeaderboardSection;
