import { NetworkEnum, RollupEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';
import { Text } from '@chakra-ui/react';

const RollupProtocolSection = () => {
  const {
    availableListData,
    isMainnet,
    rollupProtocolSelected,
    setRollupProtocolSelected,
  } = useBuy();

  const dataWithNetwork = availableListData?.rollupProtocol;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Rollup Protocol'}
      description={'Which rollup protocol is right for you?'}
      descriptionDetail={{
        title: 'Rollup Protocol',
        content: (
          <p>
            You can choose from two types of rollups with different security
            models:
            <br />
            <br />
            <Text as={'span'} fontWeight={600}>
              • Optimistic rollups:
            </Text>{' '}
            assumes transactions are valid by default and only runs computation,
            via a fraud proof, in the event of a challenge.
            <br />
            <br />
            <p>
              <Text as={'span'} fontWeight={600}>
                • Zero-knowledge rollups:
              </Text>{' '}
              runs computation off-chain and submits a validity proof to the
              chain.
            </p>
          </p>
        ),
      }}
    >
      {dataList?.map((item, index) => {
        return (
          <Item
            key={`${item.valueStr} ${index}`}
            isMainnet={isMainnet}
            item={item}
            value={item.value}
            isSelected={item.value === rollupProtocolSelected}
            title={item.valueStr}
            content={item.price}
            priceNote={item.priceNote}
            onClickCallback={(value) => {}}
            onClickCB={(item) => {
              setRollupProtocolSelected(item.value!);
            }}
          />
        );
      })}
    </Section>
  );
};

export default RollupProtocolSection;
