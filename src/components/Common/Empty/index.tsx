'use client';
import React from 'react';
import cn from 'classnames';

import s from './styles.module.scss';
import { Flex, Text, Image } from '@chakra-ui/react';

const Empty = ({
  className,
  text,
  hideIcon = false,
}: {
  className?: string;
  text?: string;
  hideIcon?: boolean;
}) => {
  return (
    <Flex className={cn(s.empty, className)}>
      {!hideIcon && <Image src={`/icons/icon-empty.svg`} />}

      {text && <Text className={s.empty_text}>{text}</Text>}
    </Flex>
  );
};

export default Empty;
