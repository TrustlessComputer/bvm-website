import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { IFormValues } from '@/modules/Bridges/types';
import { useFormikContext } from 'formik';
import styles from './styles.module.scss';

const Recipient: React.FC = () => {
  const { values, touched, errors, setFieldValue } = useFormikContext();
  const { recipient } = values as IFormValues;

  return (
    <Flex className={styles.container}>
      <Text color="rgba(101, 119, 134, 1)" fontSize="14px" fontWeight="400">
        Receiving wallet address
      </Text>
      <input
        placeholder="Enter an address"
        type="text"
        style={{
          width: '100%',
          height: '52px',
          borderRadius: '8px',
          border: '1px solid rgba(229, 231, 235, 1)',
          padding: '12px',
          fontSize: '14px',
          fontWeight: '400',
          color: 'black',
          backgroundColor: 'transparent',
        }}
        value={recipient as unknown as string}
        onChange={(e) => {
          setFieldValue('recipient', e.target.value);
        }}
      />
      {(touched as IFormValues)?.recipient &&
        !!(errors as IFormValues)?.recipient && (
          <Text fontSize={'12px'} fontWeight={'400'} color={'red'}>
            {(errors as IFormValues)?.recipient}
          </Text>
        )}
    </Flex>
  );
};

export default Recipient;
