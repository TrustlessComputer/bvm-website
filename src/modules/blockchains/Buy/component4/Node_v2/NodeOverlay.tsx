import { NodeOverlayProps } from '@/types/node';

import Loading from '@/components/Loading';
// import Button from '../Button';
import styles from './styles.module.scss';
import { Flex, Text, Image, Button } from '@chakra-ui/react';

const NodeOverlay = ({ ...props }: NodeOverlayProps) => {
  return (
    <div className={styles.nodeOverlay}>
      <div className={styles.nodeOverlay__content}>
        {props.type === 'loading' && (
          <Flex
            flexDir={'column'}
            align={'center'}
            justify={'center'}
            gap={'2px'}
          >
            {/* <Loading /> */}
            {props.iconUrl && (
              <Image
                src={props.iconUrl}
                alt={'loading'}
                width={70}
                height={70}
              />
            )}
            {props.message && (
              <Text
                fontSize={'16px'}
                color={'#fff'}
                fontWeight={600}
                textAlign={'center'}
              >
                {props.message}
              </Text>
            )}
          </Flex>
        )}

        {props.type === 'action' && (
          <Button
            borderRadius={'100px'}
            onClick={props.action.onClick}
            bgColor={props.action.bgColor || '#fff'}
            color={props.action.textColor || '#000'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.7,
            }}
          >
            {props.action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NodeOverlay;
