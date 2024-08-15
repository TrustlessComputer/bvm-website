import { NodeOverlayProps } from '@/types/node';

import Loading from '@/components/Loading';
import Button from '../Button';
import styles from './styles.module.scss';
import { Flex, Text } from '@chakra-ui/react';

const NodeOverlay = ({ ...props }: NodeOverlayProps) => {
  return (
    <div className={styles.nodeOverlay}>
      <div className={styles.nodeOverlay__content}>
        {props.type === 'loading' && (
          <Flex
            flexDir={'column'}
            align={'center'}
            justify={'center'}
            gap={'5px'}
          >
            <Loading />
            {props.message && (
              <Text fontSize={'16px'} color={'#fff'} fontWeight={600}>
                {props.message}
              </Text>
            )}
          </Flex>
        )}

        {props.type === 'action' && (
          <Button onClick={props.action.onClick}>{props.action.label}</Button>
        )}
      </div>
    </div>
  );
};

export default NodeOverlay;
