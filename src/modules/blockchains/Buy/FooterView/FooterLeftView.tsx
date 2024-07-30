import { Flex, Image, Text } from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import {
  DALayerEnum,
  DALayerEnumMap,
  NetworkEnumMap,
  ProverEnumMap,
  RollupEnum,
  RollupEnumMap,
} from '../Buy.constanst';
import { dayDescribe } from '../Buy.helpers';
import { formatCurrencyV2 } from '@/utils/format';

const FooterLeftView = () => {
  const {
    withdrawalPeriodSelected,
    networkSelected,
    blockTimeSelected,
    rollupProtocolSelected,
    dataValiditySelected,
    blockGasLimitField,
    proverSelected,
  } = useBuy();
  const rollupProcolStr =
    RollupEnumMap[rollupProtocolSelected || RollupEnum.Rollup_ZK];

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
          ZK-powered Blockchain
        </Text>
      </Flex>

      <Flex flexDir={'column'} gap={'10px'} color={'#000'}>
        <Flex flexDir={'row'}>
          {renderRow(
            '• Data Availability:',
            `${DALayerEnumMap[DALayerEnum.DALayer_PLG]}`,
            1,
          )}
          {renderRow(
            '• Block gas limit:',
            `${formatCurrencyV2({
              amount: blockGasLimitField.value || 0,
              decimals: 0,
            })}`,
            1,
          )}
        </Flex>

        <Flex flexDir={'row'}>
          {renderRow('• Prover:', `${ProverEnumMap[proverSelected || 0]}`, 1)}
          {renderRow(
            '• Withdrawal period :',
            `${withdrawalPeriodSelected} hours`,
            1,
          )}
        </Flex>
      </Flex>

      <Text fontSize={'16px'} fontWeight={400} color={'#363636c2'}>
        This process can take up to 2 hours
      </Text>
    </Flex>
  );
};

export default FooterLeftView;
