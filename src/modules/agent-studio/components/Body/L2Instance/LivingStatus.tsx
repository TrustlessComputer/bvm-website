'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './style.module.scss';

type Props = {
  color: string;
};

const LivingStatus = (props: Props) => {
  const color = props.color;
  return (
    <Flex
      className={s.livingStatus}
      sx={{
        '--color': `${color}`,
      }}
    ></Flex>
  );
};

export default LivingStatus;
