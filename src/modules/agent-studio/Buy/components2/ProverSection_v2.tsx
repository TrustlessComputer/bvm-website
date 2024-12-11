import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { useBuy } from '../../providers/Buy.hook';
import { NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';

const ProverSection = () => {
  const { availableListData, isMainnet, setProverSelected, proverSelected } =
    useBuy();

  const dataWithNetwork = availableListData?.prover;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Flex flexDir={'column'} gap="20px">
      <Flex flexDir={'row'} gap="10px" align={'center'}>
        <Text fontWeight={600} fontSize={'20px'} color={'#000'}>
          Prover
        </Text>
        <Tooltip
          p={'15px'}
          bg="#fff"
          color={'#262626'}
          hasArrow
          arrowSize={10}
          placement="top"
          label={`Prover is a component responsible for generating cryptographic proofs that verify the correctness of transactions processed off-chain by the blockchain's sequencer.`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2b35e4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </Tooltip>
      </Flex>

      <Flex flexDir={'row'} align={'center'} gap={'10px'}>
        {dataList?.map((item, index) => {
          return (
            <Item
              isMainnet={isMainnet}
              item={item}
              key={`${item.valueStr}-${index}`}
              value={item.value}
              isSelected={item.value === proverSelected}
              title={item.valueStr}
              content={item.price}
              onClickCallback={(value) => {
                setProverSelected(item.value);
              }}
              onClickCB={(item) => {
                setProverSelected(item.value);
              }}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ProverSection;
