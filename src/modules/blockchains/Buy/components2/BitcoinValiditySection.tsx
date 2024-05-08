import { NetworkEnum } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';

const BitcoinValiditySection = () => {
  const {
    availableListData,
    isMainnet,
    bitcoinValiditySelected,
    setBitcoinValiditySelected,
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
      {dataList?.map((item, index) => {
        return (
          <Item
            key={`${item.valueStr} ${index}`}
            isMainnet={isMainnet}
            item={item}
            value={item.value}
            isSelected={item.value === bitcoinValiditySelected}
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
    </Section>
  );
};

export default BitcoinValiditySection;
