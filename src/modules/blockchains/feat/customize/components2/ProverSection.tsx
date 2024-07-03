import { NetworkEnum } from '../Buy.constanst';
import Item from './Item';
import Section from './Section';
import { useBuy } from '../../../providers/Buy.hook';
import { Flex } from '@chakra-ui/react';
import { ItemDetail } from '../Buy.types';

const ProverSection = () => {
  const { availableListData, isMainnet, setProverSelected, proverSelected } =
    useBuy();

  const dataWithNetwork = availableListData?.prover;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Prover'}
      description={''}
      descriptionDetail={{
        title: 'Prover',
        content: undefined,
      }}
    >
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
    </Section>
  );
};

export default ProverSection;
