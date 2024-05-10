import { Box, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import ModalVideo from 'react-modal-video';
import { useState } from 'react';
import { isDesktop } from 'react-device-detect';

export const AboveTheFoldEternalAIInfo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Flex className={s.listInfo}>
        <Flex
          className={s.frameWrapper}
          onClick={() => {
            window.open('https://eternalai.org/', '_blank');
          }}
        >
          <img
            className={s.frameImage}
            src={'/images/launchpad/eternal_ai/ai_image.png'}
            alt={'EXPERIENCE AI'}
          />
          <Text>EXPERIENCE ETERNAL AI</Text>
        </Flex>
        <Flex className={s.frameWrapper} onClick={() => setOpen(true)}>
          <img
            className={s.imgGif}
            src={'/images/launchpad/eternal_ai/gif_hero.gif'}
            alt={'FILM'}
          />
          <img
            className={s.frameImage}
            src={'/images/launchpad/eternal_ai/frame.png'}
            alt={'FILM'}
          />
          <Text>WATCH THE FILM</Text>
        </Flex>
        <Flex
          className={s.frameWrapper}
          onClick={() => {
            window.open(
              'https://cdn.eternalai.org/docs/whitepaper.pdf',
              '_blank',
            );
          }}
        >
          <img
            className={s.frameImage}
            src={'/images/launchpad/eternal_ai/paper_image.png'}
            alt={'WHITEPAPER'}
          />
          <Text>READ THE WHITEPAPER</Text>
        </Flex>
      </Flex>
      <ModalVideo
        channel="custom"
        url={'/images/launchpad/eternal_ai/video_intro2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

interface IProps {
  className?: string;
}

const AboveTheFoldEternalAI = ({ className }: IProps) => {
  return (
    <Flex className={`${s.container} ${className || ''}`}>
      <Flex className={s.projectName}>
        ✨<Text>Eternal AI</Text>
      </Flex>
      <Text className={s.title}>TRULY OPEN AI</Text>
      <Text className={s.description}>
        Eternal AI is the community-run Bitcoin L2 blockchain that powers the
        first fully on-chain AIs.
      </Text>
      <Box height="16px" />
      {isDesktop && <AboveTheFoldEternalAIInfo />}
    </Flex>
  );
};

export default AboveTheFoldEternalAI;
