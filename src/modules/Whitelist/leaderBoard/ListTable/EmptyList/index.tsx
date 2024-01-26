/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import IcEmpty from '@/components/ListTable/EmptyList/IcEmpty';
import { Center, Text } from '@chakra-ui/react';
import clsx from 'clsx';
import s from '../styles.module.scss';

interface EmptyListProps {
  className?: string;
  link?: string;
  label?: string;
  labelText?: React.ReactNode;
  type?: string;
  imageSize?: number;
  dark?: boolean;
  positive?: boolean;
  hideIcon?: boolean;
  emptyIcon?: any;
  color?: string;
}

const EmptyList = (props: EmptyListProps) => {
  const { className, labelText = 'No result found', emptyIcon, color } = props;

  return (
    <Center
      flexDirection="column"
      className={clsx(className, 'empty-container')}
      p={8}
      gap={4}
      pt={20}
    >
      {!props.hideIcon && <>{emptyIcon ? emptyIcon : <IcEmpty />}</>}
      <Text
        className={clsx(s.emptyLabel, 'empty-label')}
        style={{
          color: color ? color : 'rgba(0, 0, 0, 0.5)',
          fontSize: '14px',
          whiteSpace: 'break-spaces',
          lineHeight: '140%',
          opacity: '70%',
        }}
      >
        {labelText}
      </Text>
    </Center>
  );
};

export default EmptyList;
