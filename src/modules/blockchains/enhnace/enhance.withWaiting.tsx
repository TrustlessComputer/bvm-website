import { useEffect, useState } from 'react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import { Flex, Spinner } from '@chakra-ui/react';

const enhance =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    const [isInitDone, setInitDone] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setInitDone(true);
      }, 1000);
    }, []);

    if (!isInitDone)
      return (
        <Flex
          display={'flex'}
          w={'100dvw'}
          h={'100dvh'}
          bgColor={'#fff'}
          align={'center'}
          justify={'center'}
        >
          <Spinner color="#000" />
        </Flex>
      );
    return <WrappedComponent {...props} />;
  };

export default enhance;
