import React, { memo, useMemo, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import cn from 'classnames';
import Leaderboard from './Leaderboard';
import { AnimatePresence, motion } from 'framer-motion';
import { IUserContest } from '@/services/api/EternalServices/types';
import { useWindowSize } from 'usehooks-ts';
import ExportPrivateKey, {
  EXPORT_PRIVATE_KEY_MODAL_ID,
} from '@/modules/hackathon/ConnectedWallets/ExportPrivateKey';
import { openModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import Problems from './Problems';
import s from './CompetitionSection.module.scss';
import SvgInset from '@/components/SvgInset';
import Link from 'next/link';
import SocialToken from '@/modules/Launchpad/components/Social';
import Congrats from './Congrats';
import { useAuthenticatedAddress } from '@/Providers/AuthenticatedProvider/hooks';

type Props = {
  currentUserContest?: IUserContest;
  contestType: number;
  isEnd: boolean;
};

const CompetitionSection = (props: Props) => {
  const { currentUserContest, isEnd } = props;
  const [isProblemPanelMaximized, setIsProblemPanelMaximized] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isShowActionPrepare, setIsShowActionPrepare] = useState<boolean>(true);

  const { width } = useWindowSize();
  const { tracking } = useL2ServiceTracking();

  const { loggedIn, login, wallet } = useWeb3Auth();
  const dispatch = useDispatch();

  const exportPrivateKeyHandler = () => {
    if (wallet?.privateKey) {
      dispatch(
        openModal({
          id: EXPORT_PRIVATE_KEY_MODAL_ID,
          modalProps: {
            size: 'md',
          },
          className: s.modalBody,
          render: () => <ExportPrivateKey />,
        }),
      );
    } else {
      login();
    }
  };

  const handleClickPractice = () => {
    // scroll to #practice-section
    const practiceSection = document.getElementById('practice-section');
    if (practiceSection) {
      practiceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRegisterModal = () => {
    if (!loggedIn) {
      login();
    }
  };

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
        >
          <div className={s.header}>
            <p className={s.title}>Proof of Code competition 2</p>
            <p className={s.desc}>
              <Box mb="12px">
                You’ve got 3 problems and 2 hours to solve them! Solve as
                <br />
                many as you can with lower gas fees to climb higher on the
                leaderboard.
              </Box>
              <Box>
                Prizes for the top 5 are{' '}
                <Text as="span" color="#fff" fontWeight={500}>
                  $300, $100, $50, $25, and $25.
                </Text>{' '}
                One day after the competition,
                <br /> winners will submit their BTC wallet addresses on the
                Proof of Code site to receive prizes.
              </Box>
            </p>
            <Flex
              position={'absolute'}
              top="20px"
              right={0}
              gap="12px"
              alignItems={'center'}
              className={s.teleWrapper}
            >
              <SvgInset svgUrl="/icons/tele-ic.svg" size={40} />
              <Flex flexDir={'column'} gap="2px">
                <Text
                  fontSize={'14px'}
                  fontWeight={500}
                  fontFamily={'SF Pro Display'}
                  color="rgba(255, 255, 255, 0.70)"
                >
                  If you run into any issues
                </Text>
                <Link
                  target="_blank"
                  href="https://t.me/+oqT2XbJ-ne5jNzA9"
                  className={s.teleLink}
                >
                  Ping us
                  <SvgInset
                    svgUrl="/icons/ic_chevron_right.svg"
                    className={s.chevronArrow}
                    size={14}
                  />
                </Link>
              </Flex>
            </Flex>
          </div>

          {isEnd && !!currentUserContest && currentUserContest.rank <= 5 && (
            <Congrats />
          )}

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
                    : '40%',
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
            >
              <h4>Problems</h4>
              <Problems
                isProblemPanelMaximized={isProblemPanelMaximized}
                setIsProblemPanelMaximized={setIsProblemPanelMaximized}
                setShowLeaderboard={setShowLeaderboard}
              />
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
                  </Flex>
                  <Leaderboard
                    currentUserContest={props.currentUserContest}
                    contestType={props.contestType}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Flex>
        </Box>
      </div>
    </Box>
  );
};

export default memo(CompetitionSection);
