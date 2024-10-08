import { DALayerEnum, NetworkEnum, STANDARD_VALUES } from '../Buy.constanst';
import { ItemDetail } from '../Buy.types';
import Item from '../components/Item';
import Section from '../components/Section';
import { useBuy } from '../../providers/Buy.hook';
import { Flex, Select, SimpleGrid, Text, Image } from '@chakra-ui/react';
import { useMemo } from 'react';

const DATA_LIST = [
  {
    key: 'Polygon',
    imageUrl: '/icons/customize/polygon_ic.svg',
    name: 'Polygon',
    isCommingSoon: false,
    availableNetworks: [
      NetworkEnum.Network_Mainnet,
      NetworkEnum.Network_Testnet,
    ],
    value: DALayerEnum.DALayer_PLG,
  },
  {
    key: 'Celestia',
    imageUrl: '/icons/customize/celestia_ic.svg',
    name: 'Celestia',
    isCommingSoon: true,
    availableNetworks: [
      NetworkEnum.Network_Mainnet,
      NetworkEnum.Network_Testnet,
    ],
    value: DALayerEnum.DALayer_Celestia,
  },
  {
    key: 'Avail',
    imageUrl: '/icons/customize/avail_ic.svg',
    name: 'Avail',
    isCommingSoon: true,
    availableNetworks: [NetworkEnum.Network_Testnet],
    value: DALayerEnum.DALayer_AVAIL,
  },
  {
    key: 'NearDA',
    imageUrl: '/icons/customize/near_ic.svg',
    name: 'NearDA',
    isCommingSoon: true,
    availableNetworks: [],
    value: DALayerEnum.DALayer_NearDa,
  },
  {
    key: 'Eigen',
    imageUrl: '/icons/customize/eigen_ic.svg',
    name: 'Eigen',
    isCommingSoon: true,
    value: DALayerEnum.DALayer_Eigen,
  },
  {
    key: 'Filecoin',
    imageUrl: '/icons/customize/filecoin_ic.svg',
    name: 'Filecoin',
    isCommingSoon: true,
    availableNetworks: [],
    value: DALayerEnum.DALayer_FILECOIN,
  },
];

const DataAvailabilitySection = () => {
  const {
    availableListData,
    isMainnet,
    dataValiditySelected,
    setDataValiditySelected,
    networkSelected,
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

  const renderDAList = () => {
    return (
      <SimpleGrid columns={[2, 3]} spacing={'10px'}>
        {DATA_LIST.map((item, index) => {
          const { isCommingSoon, name, imageUrl, value } = item;
          const isSelected = dataValiditySelected === value;
          const isAvailable = item.availableNetworks?.includes(
            networkSelected!,
          );
          return (
            <Flex
              key={`${name}-${index}`}
              flexDir={'row'}
              align={'center'}
              borderRadius={'8px'}
              borderWidth={isSelected ? '2px' : '1px'}
              borderColor={isSelected ? '#2b35e4' : '#B6B6B6'}
              p="12px"
              h={['45px', '55px', '65px']}
              gap={'8px'}
              opacity={!isAvailable ? 0.5 : 1}
              onClick={() => {
                if (isAvailable) {
                  setDataValiditySelected(value);
                }
              }}
              _hover={
                !isAvailable
                  ? {}
                  : {
                      cursor: 'pointer',
                      opacity: 0.8,
                    }
              }
            >
              <Image src={item.imageUrl} width={'25px'} height={'25px'} />
              <Text
                fontSize={['14px', '15px', '17px']}
                fontWeight={400}
                lineHeight={'20px'}
              >
                {name}
              </Text>
              {/* {isCommingSoon && (
                <Text fontSize={'17px'} fontWeight={400} lineHeight={'20px'}>
                  {'(Comming soon)'}
                </Text>
              )} */}
            </Flex>
          );
        })}
      </SimpleGrid>
    );
  };

  return (
    <Section
      title={'Data Availability'}
      description={'Which data availability layer is right for you?'}
      descriptionDetail={{
        title: 'Data Availability',
        content: (
          <p>
            The data of your blockchain is written to a Data Availability layer
            such as Polygon, Celestia, NearDA, Eigen, Filecoin or Avail.
          </p>
        ),
      }}
    >
      {/* {renderDropDownList()} */}
      {renderDAList()}
    </Section>
  );
};

export default DataAvailabilitySection;
