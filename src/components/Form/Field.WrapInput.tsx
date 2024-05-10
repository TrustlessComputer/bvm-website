import { Flex } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';
import cs from 'classnames';

const FieldWrapInput: React.FC<any> = ({ children, isInvalid, right }) => {
  return (
    <Flex className={cs(s.contentContainer, isInvalid && s.inputInvalid)}>
      {children}
      {right}
    </Flex>
  );
};

export default FieldWrapInput;
