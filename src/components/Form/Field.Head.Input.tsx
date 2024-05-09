import React from 'react';
import s from './styles.module.scss';
import { Flex, FormLabel } from '@chakra-ui/react';

interface IFieldHeadInput {
  label: string;
  labelRight?: any;
}

const FieldHeadInput: React.FC<IFieldHeadInput> = ({ label, labelRight }) => {
  return (
    <Flex className={s.labelContainer}>
      <FormLabel className={s.__label}>{label}</FormLabel>
      {labelRight &&
        (typeof labelRight === 'object' ? (
          <div className={s.labelRight}>{labelRight}</div>
        ) : (
          <div
            className={s.labelRight}
            dangerouslySetInnerHTML={{ __html: labelRight }}
          />
        ))}
    </Flex>
  );
};

export default FieldHeadInput;
