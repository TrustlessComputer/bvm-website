import React, { memo, useState } from 'react';
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
import s from './LeaderboardSection.module.scss';

type Props = {
  currentUserContest?: IUserContest;
};

const LeaderboardSection = (props: Props) => {
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
          // maxHeight={isProblemPanelMaximized ? '1000px' : 'unset'}
          // layout
        >
          <div className={s.header}>
            <p className={s.title}>Practice Session</p>
            <p className={s.desc}>
              Gear up for the first official Proof-of-Code programming
              tournament starting on August 29th!
              <br /> Sharpen your Solidity coding skills and tackle practice
              problems to boost your chances of winning.
            </p>
          </div>

          <Box
            className={s.warning}
            display={isShowActionPrepare === false ? 'none' : 'block'}
          >
            <Flex
              alignItems={'center'}
              gap="12px"
              mb="24px"
              position="relative"
            >
              <Image src={'/hackathon/ic-trophy.svg'} />
              <Text className={s.warning_heading}>
                Before you start competing
              </Text>

              <Box
                className={s.warning_closeBtn}
                onClick={() => {
                  setIsShowActionPrepare(false);
                  tracking('POC_CLICK_CLOSE_PREPARE');
                }}
              >
                <Image src={'/hackathon/ic-close.svg'} />
              </Box>
            </Flex>
            <Flex gap="32px" flexDirection={{ md: 'row', base: 'column' }}>
              <Flex
                gap="8px"
                alignItems="center"
                className={s.warning_prepare}
                onClick={
                  loggedIn ? handleClickPractice : handleOpenRegisterModal
                }
              >
                <span>1.</span> Create an account
                <Image src="/hackathon/ic-add.svg" alt="add" />
              </Flex>
              <Flex gap="8px" className={s.warning_prepare} alignItems="center">
                <a
                  href="https://github.com/TrustlessComputer/poc-practice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>2.</span> Set up your development environment
                  <Image src="/hackathon/ic-arrow-up.svg" alt="add" />
                </a>
              </Flex>
              <Flex
                gap="8px"
                className={s.warning_prepare}
                alignItems="center"
                whiteSpace={'nowrap'}
                onClick={exportPrivateKeyHandler}
              >
                <span>3.</span> Back up your private key
                <Image src="/hackathon/ic-restore.svg" alt="add" />
              </Flex>
              <Flex
                gap="8px"
                alignItems="center"
                className={s.warning_prepare}
                onClick={() => {
                  const prepareElm = document.getElementById('faq-sol-prepare');
                  prepareElm?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    if (
                      prepareElm?.querySelector('.chakra-collapse')
                        ?.clientHeight === 0
                    ) {
                      prepareElm?.querySelector('button')?.click();
                    }
                  }, 1000);
                }}
              >
                <span>4.</span> New to Solidity? Learn it easily with these
                resources
                <Image
                  src="/hackathon/img-sol.png"
                  alt="solidity"
                  backgroundColor={'#fff'}
                  borderRadius={'50%'}
                  width="24px"
                  height="24px"
                />
              </Flex>
            </Flex>
          </Box>

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
                    : '65%',
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
              //   width: '65%',
              // }}
            >
              <h4>Problems</h4>
              <Problems
                isProblemPanelMaximized={isProblemPanelMaximized}
                setIsProblemPanelMaximized={setIsProblemPanelMaximized}
                setShowLeaderboard={setShowLeaderboard}
              />
              {/* <Text
                m="32px 0 20px 0"
                fontSize="24px"
                fontWeight="700"
                fontFamily="JetBrains Mono"
                letterSpacing="0.72px"
              >
                Submit solutions
              </Text>
              <SubmitProblem /> */}
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
                    {/* <CompetitionTimer /> */}
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

export default memo(LeaderboardSection);
