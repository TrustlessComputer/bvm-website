'use client';

import { Button } from '@chakra-ui/react';
import s from './styles.module.scss';

type Props = {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const ButtonV1 = (props: Props) => {
  const { title, isSelected, onClick } = props;
  return (
    <Button
      minW={['200px']}
      minH={['50px']}
      fontSize={['20px']}
      fontWeight={400}
      className={`${s.container} ${!!isSelected && s.isSelected}`}
      onClick={onClick}
      _hover={{
        cursor: 'pointer',
        opacity: 0.7,
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonV1;
