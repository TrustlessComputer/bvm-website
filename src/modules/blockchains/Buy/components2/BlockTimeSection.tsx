import { memo } from 'react';
import { DALayerEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';
import { Text } from '@chakra-ui/react';

const BlockTimeSection = () => {
  const {
    availableListData,
    isMainnet,
    blockTimeSelected,
    setBlockTimeSelected,
    dataValiditySelected,
  } = useBuy();

  const blockTime = availableListData?.blockTime;
  if (!blockTime) return <></>;

  const dataWithNetwork = isMainnet
    ? blockTime[NetworkEnum.Network_Mainnet]
    : blockTime[NetworkEnum.Network_Testnet];
  const DAValue = dataValiditySelected || DALayerEnum.DALayer_BTC;

  const blockTimeList = dataWithNetwork[DAValue];

  return (
    <Section
      title={'Block Time'}
      description={'How fast do you want your Bitcoin L2 to go?'}
      descriptionDetail={{
        title: 'Block Time',
        content: (
          <p>
            There are three types of block time options:
            <br />
            <br />
            <Text as={'span'} fontWeight={600}>
              • 2 seconds:
            </Text>{' '}
            this block time is perfectly suited for use cases like gaming.
            <br />
            <p>
              <Text as={'span'} fontWeight={600}>
                • 5 seconds:
              </Text>{' '}
              for use cases requiring slightly less extreme speed, this option
              is suitable.
            </p>
            <p>
              <Text as={'span'} fontWeight={600}>
                • 10 seconds:
              </Text>{' '}
              the most cost-effective rollup solution when speed is not a
              priority aligned with your preferences.
            </p>
          </p>
        ),
      }}
    >
      {blockTimeList?.map((item, index) => {
        return (
          <Item
            key={`${item.valueStr} ${index}`}
            isMainnet={isMainnet}
            item={item}
            value={item.value}
            isSelected={item.value === blockTimeSelected}
            title={item.valueStr}
            content={item.price}
            priceNote={item.priceNote}
            onClickCallback={(value) => {}}
            onClickCB={(item) => {
              setBlockTimeSelected(item.value!);
            }}
          />
        );
      })}
    </Section>
  );
};

export default memo(BlockTimeSection);
