import { DALayerEnum, NetworkEnum, STANDARD_VALUES } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from './Item';
import Section from './Section';
import { useBuy } from '../../../providers/Buy.hook';
import { Select, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const DataAvailabilitySection = () => {
  const {
    availableListData,
    isMainnet,
    dataValiditySelected,
    setDataValiditySelected,
    isStandardMode,
  } = useBuy();

  const dataWithNetwork = availableListData?.dataAvaibilityChain;

  if (!dataWithNetwork) return <></>;

  let dataList: ItemDetail[] = isMainnet
    ? dataWithNetwork[NetworkEnum.Network_Mainnet]
    : dataWithNetwork[NetworkEnum.Network_Testnet];

  dataList = useMemo(() => {
    if (isStandardMode) {
      return dataList.filter(
        (item) => item.value === STANDARD_VALUES.dataAvailability,
      );
    } else {
      return dataList;
    }
  }, [isStandardMode]);

  const renderDropDownList = () => {
    return (
      <Select
        defaultValue={dataValiditySelected}
        value={dataValiditySelected}
        height={'60px'}
        fontSize={'19px'}
        borderRadius={'8px'}
        border={'1px solid #c2c2c2'}
        color={'#000'}
        aria-selected={isStandardMode}
        _hover={{
          cursor: isStandardMode ? 'no-drop' : 'pointer',
          borderColor: isStandardMode ? '' : '#2b35e4',
        }}
        _active={{
          borderColor: isStandardMode ? '#2b35e4' : '',
        }}
        _selected={{
          borderColor: isStandardMode ? '#2b35e4' : '',
        }}
        iconColor={isStandardMode ? 'transparent' : 'grey'}
        onChange={(e) => {
          setDataValiditySelected(Number(e.target.value));
        }}
      >
        {dataList?.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.valueStr}
            </option>
          );
        })}
      </Select>
    );
  };

  const renderFlattenList = () => {
    return dataList?.map((item, index) => {
      const isBitCoinSyscoin = item.value === DALayerEnum.DALayer_SYSCOIN;
      return (
        <Item
          key={`${item.valueStr} ${index}`}
          isMainnet={isMainnet}
          item={item}
          value={item.value}
          isSelected={item.value === dataValiditySelected}
          title={item.valueStr}
          content={item.price}
          priceNote={item.priceNote}
          onClickCallback={(value) => {}}
          onClickCB={(item) => {
            setDataValiditySelected(item.value!);
          }}
          infor={
            isBitCoinSyscoin
              ? "Your rollup will use Syscoin's DA protocol called BitcoinDA, which secures your rollup with Bitcoin's network through merged mining while supplementing with an additive decentralized finality. Syscoin's solution intersects Bitcoin yet is scalable and cost-effective"
              : undefined
          }
        />
      );
    });
  };

  return (
    <Section
      title={'Data Availability'}
      description={'Which data availability layer is right for you?'}
      descriptionDetail={undefined}
      // descriptionDetail={{
      //   title: 'Data Availability',
      //   content: (
      //     <p>
      //       Initially, there are two types of data availability options:
      //       <br />
      //       <br />
      //       <Text as={'span'} fontWeight={600}>
      //         • Bitcoin + Polygon:
      //       </Text>{' '}
      //       the data is written to the Polygon network. This is a pragmatic and
      //       hybrid approach, where data availability is on Polygon, and data
      //       validation is on Bitcoin.
      //       <br />
      //       <br />
      //       <p>
      //         <Text as={'span'} fontWeight={600}>
      //           • Bitcoin:
      //         </Text>{' '}
      //         thanks to the Taproot-type transaction, it is now possible to
      //         embed any data into a Bitcoin Blockchain, which will be
      //         permanently stored on the Bitcoin network and inherit its
      //         features, such as availability, immutability, and determinism.
      //       </p>
      //     </p>
      //   ),
      // }}
    >
      {/* {renderFlattenList()} */}
      {renderDropDownList()}
    </Section>
  );
};

export default DataAvailabilitySection;
