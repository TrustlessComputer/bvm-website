import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import s from './Schedule.module.scss';
import { DOMAIN_URL } from '@/config';

type Props = {};

const Schedule = (props: Props) => {
  const handleViewImage = () => {
    window.open(`${DOMAIN_URL}/images/unlock-chart.png`, '_blank');
  };

  return (
    <Box
      className={s.wrapper}
      py={{ base: '40px', md: '100px' }}
      position={'relative'}
    >
      <Box
        bgColor={'#fff'}
        w="100vw"
        position={'absolute'}
        top={0}
        left={'calc(-50vw + 50%)'}
        h="100%"
        zIndex={0}
      ></Box>
      <Box zIndex={1} position={'relative'}>
        <Text as="h3" className={s.heading} textAlign={'center'}>
          BVM Unlock Schedule
        </Text>
        <Box onClick={handleViewImage}>
          <Image
            src={'/images/unlock-chart.png'}
            alt={'Unlock chart'}
            maxW={['100%']}
            mx="auto"
          ></Image>
        </Box>
      </Box>
    </Box>
  );
};

export default Schedule;
