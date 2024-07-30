import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import s from './styles.module.scss';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { gsap } from 'gsap';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { getCollectEternalSeedAttr } from '@/modules/staking/components/EternalSeeds/helpers';

const ContributionIDItem = ({
  id,
  hideID,
  onHideCard,
  isHideBrain,
}: {
  id: number;
  hideID?: boolean;
  onHideCard?: (cardID: number) => void;
  isHideBrain?: boolean;
}) => {
  const seedInfo = useMemo(() => getCollectEternalSeedAttr(id), [id]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isInview = useIsInViewport(containerRef, { threshold: 1 });

  const lottieRef = useRef<any>();

  React.useEffect(() => {
    if (isHideBrain && isInview) {
      gsap.to(containerRef.current, {
        opacity: 0.6,
        // scale: 1.2,
        duration: 1,
        ease: 'power3.inOut',
        onStart: () => {
          if (!lottieRef.current) return;
          lottieRef.current.setLoop(1);
          lottieRef.current.play();
        },
        onComplete: () => {
          onHideCard && onHideCard(id);
        },
      });
    }
  }, [isInview, isHideBrain, id]);
  if (!seedInfo) {
    return <></>;
  }

  return (
    <Flex className={s.seedItem} ref={containerRef}>
      <Box className={s.seedHead} style={seedInfo?.style}>
        <Text>{seedInfo?.label}</Text>
      </Box>
      <Image src={seedInfo?.icon} opacity={isInview && isHideBrain ? 0 : 1} />
      {!hideID && <Text className={s.seedId}>#{id}</Text>}
      <DotLottiePlayer
        ref={lottieRef}
        className={`${s.lottie} ${isHideBrain && s.lottie_isRun}`}
        src={`/icons/brain-burn-${seedInfo?.label?.toLowerCase()}.lottie`}
      />
    </Flex>
  );
};

export default ContributionIDItem;
