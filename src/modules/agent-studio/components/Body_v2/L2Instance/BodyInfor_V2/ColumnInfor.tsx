'use client';

import { Flex, Text, Link } from '@chakra-ui/react';
import s from '../styleFont.module.scss';

type Props = {
  title?: string;
  content?: string;
  isPendingPayment?: boolean;
  isLink?: boolean;
};

const ColumnInfor = (props: Props) => {
  const { title, content, isPendingPayment = false, isLink = false } = props;

  return (
    <Flex flexDir={'column'} align={'flex-start'} gap={['5px', '6px', '8px']}>
      <Text
        fontSize={['14px', '15px', '16px']}
        fontWeight={500}
        color={'#000'}
        className={s.fontSFProDisplay}
      >
        {title || '--'}
      </Text>
      {!isLink ? (
        <Text
          fontSize={['14px', '15px', '16px']}
          color={isPendingPayment ? '#FFA500' : '#000'}
          opacity={0.7}
          fontWeight={isPendingPayment ? 500 : 400}
          className={s.fontSFProDisplay}
        >
          {content || '--'}
        </Text>
      ) : (
        <Link
          fontSize={['14px', '15px', '16px']}
          color={isPendingPayment ? '#FFA500' : '#000'}
          opacity={0.7}
          fontWeight={isPendingPayment ? 500 : 400}
          className={s.fontSFProDisplay}
          target="_blank"
          href={content}
          _hover={{
            color: '#3300ff',
            textDecorationLine: 'underline',
          }}
        >
          {content || '--'}
        </Link>
      )}
    </Flex>
  );
};

export default ColumnInfor;
