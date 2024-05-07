import { Flex, Image, Text } from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import { NetworkEnumMap, RollupEnum, RollupEnumMap } from '../Buy.constanst';
import { dayDescribe } from '../Buy.helpers';

const FooterLeftView = () => {
  const {
    withdrawalPeriodSelected,
    networkSelected,
    blockTimeSelected,
    rollupProtocolSelected,
  } = useBuy();
  const rollupProcolStr =
    RollupEnumMap[rollupProtocolSelected || RollupEnum.Rollup_OpStack];

  const renderRow = (lable: string, content: string, flex: number) => {
    return (
      <Flex flex={flex} gap={'5px'}>
        <Text fontSize={'18px'} fontWeight={500}>
          {lable}
        </Text>
        <Text fontSize={'18px'} fontWeight={400} color={'#1c1c1c'}>
          {`${content}`}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex flex={1} width={'50%'} height="auto" flexDir={'column'} gap={'20px'}>
      <Flex flexDir={'row'} align={'center'} gap={'10px'}>
        <Image
          src={'/blockchains/customize/ic-computer.svg'}
          w={'35px'}
          h={'auto'}
          objectFit={'contain'}
        />
        <Text fontSize={'20px'} fontWeight={600} color={'#000'}>
          Bitcoin L2
        </Text>
      </Flex>

      <Flex flexDir={'column'} gap={'10px'} color={'#000'}>
        <Flex flexDir={'row'}>
          {renderRow(
            '• Network:',
            `Bitcoin ${NetworkEnumMap[networkSelected || 1]}`,
            1,
          )}
          {renderRow('• Rollup Protocol:', `${rollupProcolStr || '--'}`, 1.7)}
        </Flex>

        <Flex flexDir={'row'}>
          {renderRow('• Bitcoin Time:', `${blockTimeSelected}s`, 1)}
          {rollupProtocolSelected === RollupEnum.Rollup_OpStack &&
            renderRow(
              '• Withdrawal Period:',
              `${dayDescribe(withdrawalPeriodSelected).timer}s`,
              1.7,
            )}
        </Flex>
      </Flex>

      <Text fontSize={'16px'} fontWeight={400} color={'#363636c2'}>
        This process can take up to 12 hours
      </Text>
    </Flex>
  );
};

export default FooterLeftView;
