import React from 'react';
import { Text } from '@chakra-ui/react';

export type Props = {
  message?: string;
};

const ErrorMessage = React.memo((props: Props) => {
  const { message = 'Error' } = props;
  if (!message || message.length < 1)
    return <div style={{ height: '22px' }}></div>;
  return (
    <Text fontSize={'14px'} color={'#ee2525'}>
      {message || ''}
    </Text>
  );
});

export default ErrorMessage;
