'use client';

import { Button, Flex, Text } from '@chakra-ui/react';
import LaunchButton from '../../../Buy/components3/LaunchButton';
import s from './styles.module.scss';

type Props = {
  tabSelected: number;
  onTabSelected: (tabIndex: number) => void;
  hideRightView?: boolean;
  priceBVM?: string;
  priceBVMtoUSD?: string;
};

const ToolBar = (props: Props) => {
  const {
    tabSelected,
    onTabSelected,
    hideRightView = false,
    priceBVM,
    priceBVMtoUSD,
  } = props;

  return (
    <Flex
      flexDir={'row'}
      className={s.container}
      justify={'space-between'}
      align={'center'}
      w={'100%'}
    >
      <Flex flex={1} align={'center'} justify={'flex-start'} gap={'10px'}>
        <Button
          minW={['200px']}
          minH={['50px']}
          fontSize={['20px']}
          fontWeight={400}
          className={`${
            tabSelected === 0 ? s.buttonActive : s.buttonNotActive
          }`}
          onClick={() => onTabSelected(0)}
          _hover={{
            cursor: 'pointer',
            opacity: 0.7,
          }}
        >
          Code
        </Button>
        <Button
          minW={['200px']}
          minH={['50px']}
          fontSize={['20px']}
          fontWeight={400}
          className={`${
            tabSelected === 1 ? s.buttonActive : s.buttonNotActive
          }`}
          onClick={() => onTabSelected(1)}
          _hover={{
            cursor: 'pointer',
            opacity: 0.7,
          }}
        >
          Explore
        </Button>
      </Flex>
      {!hideRightView && (
        <Flex
          flex={1}
          flexDir={'row'}
          align={'center'}
          justify={'flex-end'}
          gap={['24px']}
        >
          <Flex flexDir={'column'} align={'flex-start'} justify={'flex-start'}>
            <Text fontSize={['18px']} fontWeight={500} color={'#333333'}>
              {`${priceBVM || '--'} BVM/month`}
            </Text>
            <Text fontSize={['13px']} fontWeight={400} color={'#777777'}>
              {`$${priceBVMtoUSD || '--'}/month`}
            </Text>
          </Flex>
          <LaunchButton data={[]} originalData={[]} />
        </Flex>
      )}
    </Flex>
  );
};

export default ToolBar;
