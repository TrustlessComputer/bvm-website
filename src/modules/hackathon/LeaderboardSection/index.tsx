import React, { useState } from 'react';
import s from './LeaderboardSection.module.scss';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import cn from 'classnames';
import Leaderboard from './Leaderboard';
import Problems from '../Problems';
import { AnimatePresence, motion } from 'framer-motion';
import { IUserContest } from '@/services/api/EternalServices/types';
import { useWindowSize } from 'usehooks-ts';
import SubmitProblem from '@/modules/hackathon/SubmitProblem';
import CompetitionTimer from '../CompetitionTimer';

type Props = {
  currentUserContest?: IUserContest;
};

const LeaderboardSection = (props: Props) => {
  const [isProblemPanelMaximized, setIsProblemPanelMaximized] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const { width } = useWindowSize();

  return (
    <Box bgColor={'#000'}>
      <div className="containerV3">
        <Box
          as={motion.div}
          className={cn(
            s.container,
            {
              [s.maximized]: isProblemPanelMaximized,
            },
            {
              [s.minimized]: !isProblemPanelMaximized,
            },
          )}
          transitionDelay={'400ms'}
          transition={'all 0.3s ease'}
          // maxHeight={isProblemPanelMaximized ? '1000px' : 'unset'}
          // layout
        >
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
                width:
                  width <= 768
                    ? '100%'
                    : isProblemPanelMaximized
                    ? '100%'
                    : '50%',
                height: 'auto',
                transition: {
                  type: 'keyframes',
                  delay: isProblemPanelMaximized ? 0.4 : 0,
                  duration: 0.5,
                },
              }}
              onAnimationComplete={() => {
                if (!isProblemPanelMaximized) {
                  setShowLeaderboard(true);
                }
              }}
              // exit={{
              //   width: '50%',
              // }}
            >
              <h4>Problems</h4>
              <Problems
                isProblemPanelMaximized={isProblemPanelMaximized}
                setIsProblemPanelMaximized={setIsProblemPanelMaximized}
                setShowLeaderboard={setShowLeaderboard}
              />
              <Text
                m="32px 0 20px 0"
                fontSize="24px"
                fontWeight="700"
                fontFamily="JetBrains Mono"
                letterSpacing="0.72px"
              >
                Submit
              </Text>
              <SubmitProblem />
            </Box>
            <AnimatePresence>
              {(showLeaderboard || width <= 768) && (
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
                  <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <h4>Leaderboard</h4>
                    <CompetitionTimer />
                  </Flex>
                  <Leaderboard currentUserContest={props.currentUserContest} />
                </motion.div>
              )}
            </AnimatePresence>
          </Flex>
        </Box>
      </div>
    </Box>
  );
};

export default LeaderboardSection;
