import { BitcoinValidityEnum, NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';
import { Flex } from '@chakra-ui/react';

const BitcoinValiditySection = () => {
  const {
    availableListData,
    isMainnet,
    bitcoinValiditySelected,
    setBitcoinValiditySelected,
    isStandardMode,
  } = useBuy();

  const dataWithNetwork = availableListData?.bitcoinValidity;

  if (!dataWithNetwork) return <></>;

  const dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  return (
    <Section
      title={'Bitcoin Validity'}
      description={'Which Bitcoin Validity is right for you?'}
      descriptionDetail={undefined}
    >
      <Flex flexDir={'row'} align={'center'} gap={'10px'}>
        {dataList?.map((item, index) => {
          return (
            <Item
              key={`${item.valueStr} ${index}`}
              isMainnet={isMainnet}
              item={item}
              value={item.value}
              isSelected={item.value === bitcoinValiditySelected}
              disabled={
                isStandardMode &&
                item.value === BitcoinValidityEnum.BitcoinValidity_Stamps
              }
              title={item.valueStr}
              content={item.price}
              priceNote={item.priceNote}
              onClickCallback={(value) => {}}
              onClickCB={(item) => {
                setBitcoinValiditySelected(item.value!);
              }}
            />
          );
        })}
      </Flex>
    </Section>
  );
};

export default BitcoinValiditySection;
