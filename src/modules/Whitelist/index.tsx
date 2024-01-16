import { Flex } from '@chakra-ui/react';
import React from 'react';
import LeaderBoard from './leaderBoard';
import s from './styles.module.scss';
import useElementHeight from '@/hooks/useElementHeight';
import { HEADER_ID } from '@/layouts/Header';
import Steps from '@/modules/Whitelist/steps';
import BoxContent from '@/layouts/BoxContent';

const CONTAINER_ID = 'WHITE_LIST_CONTAINER_ID';

const Whitelist = () => {
  const { height } = useElementHeight({ elementID: HEADER_ID });

  React.useEffect(() => {
    const element = document.getElementById(CONTAINER_ID)
    if (height && element) {
      element.style.paddingTop = `${height + 32}px`
    }
  }, [height])

  return (
    <BoxContent className={s.container} id={CONTAINER_ID}>
      <p className={s.title}>Get a bigger multiplier</p>
      <div className={s.tokenSection}>
        <LeaderBoard />
        <Steps />
      </div>
    </BoxContent>
  )
};

export default Whitelist;
