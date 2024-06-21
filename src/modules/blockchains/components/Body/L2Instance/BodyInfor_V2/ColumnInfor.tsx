'use client';

import { Flex, Text } from '@chakra-ui/react';
import s from '../styleFont.module.scss';

type Props = {
  title?: string;
  content?: string;
  isPendingPayment?: boolean;
};

const ColumnInfor = (props: Props) => {
  const { title, content, isPendingPayment = false } = props;

  return (
    <Flex flexDir={'column'} align={'flex-start'} gap={'8px'}>
      <Text
        fontSize={'16px'}
        lineHeight={'23px'}
        fontWeight={500}
        color={'#000'}
        className={s.fontSFProDisplay}
      >
        {title || '--'}
      </Text>
      <Text
        fontSize={'16px'}
        lineHeight={'23px'}
        color={isPendingPayment ? '#FFA500' : '#000'}
        opacity={0.7}
        fontWeight={isPendingPayment ? 500 : 400}
        className={s.fontSFProDisplay}
      >
        {content || '--'}
      </Text>
    </Flex>
  );
};

export default ColumnInfor;
