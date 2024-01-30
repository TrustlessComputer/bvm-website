import React from 'react';
import useTradeNakaData from '@/modules/PublicSale/activities/hooks/useTradeNakaData';
import { SimpleGrid } from '@chakra-ui/react';

const NakaCountDown = React.memo(() => {
  const { bestPNL } = useTradeNakaData();
  if (!bestPNL) return <></>;

  return (
    <SimpleGrid gridTemplateColumns={{  }}>

    </SimpleGrid>
  )
})

NakaCountDown.displayName = 'NakaCountDown';

export default NakaCountDown;
