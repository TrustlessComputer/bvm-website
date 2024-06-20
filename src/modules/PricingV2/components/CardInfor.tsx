import { Flex, ListItem, Text, UnorderedList, Image } from '@chakra-ui/react';
import s from '../styles.module.scss';

export type CardInforProps = {
  title?: string;
  desc?: string;
  color?: string;
  bgColor?: any;
  bgGradient?: any;
  price?: any;
  ctaButton?: any;
  isHideHardware?: boolean;
  isHideBlockchainInfor?: boolean;
  isHidePreInstallDapps?: boolean;
  isHideSupport?: boolean;
  hardwareList?: any[];
  blockChainInforsList?: any[];
  preInstallDAppList?: any[];
  supportList?: any[];
  includes?: any[];
};

const CardInfor = (props: CardInforProps) => {
  const {
    title,
    bgColor = '#fff',
    desc,
    color = '#000',
    price,
    ctaButton,
    hardwareList,
    bgGradient,
    blockChainInforsList,
    supportList,
    preInstallDAppList,

    isHideHardware = false,
    isHideBlockchainInfor = false,
    isHidePreInstallDapps = false,
    isHideSupport = false,
    includes,
  } = props;
  return (
    <Flex
      className={s.container}
      flexDir={'column'}
      alignItems={'center'}
      p={'20px'}
      borderRadius={'12px'}
      minH={'600px'}
      width={'auto'}
      gap={'25px'}
      boxShadow="0px 0px 20px rgba(0, 0, 0, 0.15)"
      bgColor={bgColor}
      color={color}
      bgGradient={bgGradient}
    >
      <Flex flexDir={'column'} gap="20px" minH={'170px'}>
        <Text
          fontSize={'18px'}
          lineHeight={'22px'}
          fontWeight={500}
          textAlign={'center'}
          opacity={0.7}
        >
          {title}
        </Text>
        <Text
          fontSize={'15px'}
          lineHeight={'20px'}
          fontWeight={400}
          textAlign={'center'}
          px={'10px'}
          minH={'30px'}
          title={desc}
          className={s.fontType2}
        >
          {desc}
        </Text>
        {price}
      </Flex>

      {ctaButton}
      {!isHideHardware && (
        <Flex
          flexDir={'column'}
          align={'flex-start'}
          justify={'flex-start'}
          gap={'10px'}
          minH={'130px'}
          w={'100%'}
        >
          <Text
            fontSize={'15px'}
            lineHeight={'18px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Hardware'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
            fontSize={'14px'}
            className={s.fontType2}
          >
            {hardwareList?.map((item, index) => (
              <ListItem key={`${item}-${index}`}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}

      {!isHideBlockchainInfor && (
        <Flex
          flexDir={'column'}
          align={'flex-start'}
          justify={'flex-start'}
          gap={'10px'}
          minH={'150px'}
          w={'100%'}
        >
          <Text
            fontSize={'15px'}
            lineHeight={'18px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Blockchain'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
            className={s.fontType2}
            fontSize={'14px'}
          >
            {blockChainInforsList?.map((item, index) => (
              <ListItem key={`${item}-${index}`}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}

      {!isHidePreInstallDapps && (
        <Flex
          flexDir={'column'}
          align={'flex-start'}
          justify={'flex-start'}
          gap={'10px'}
          minH={'150px'}
          w={'100%'}
        >
          <Text
            fontSize={'15px'}
            lineHeight={'18px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Pre-installed dapps'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
            className={s.fontType2}
            fontSize={'14px'}
          >
            {preInstallDAppList?.map((item, index) => (
              <ListItem key={`${item}-${index}`}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}

      {!isHideSupport && (
        <Flex
          flexDir={'column'}
          align={'flex-start'}
          justify={'flex-start'}
          gap={'10px'}
          minH={'150px'}
          w={'100%'}
        >
          <Text
            fontSize={'15px'}
            lineHeight={'18px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Support'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
            className={s.fontType2}
            fontSize={'14px'}
          >
            {supportList?.map((item, index) => (
              <ListItem key={`${item}-${index}`}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}

      {includes && (
        <Flex
          flexDir={'column'}
          align={'flex-start'}
          justify={'flex-start'}
          gap={'10px'}
          minH={'150px'}
          w={'100%'}
        >
          <Text
            fontSize={'16px'}
            lineHeight={'20px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Includes:'}
          </Text>
          {includes.map((item) => {
            return (
              <Flex align={'center'} flexDir={'row'} gap="8px">
                <Image src={`/icons/check_green.svg`} w={'16px'} h={'16px'} />
                <Text className={s.fontType2} fontSize={'15px'}>
                  {item}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default CardInfor;
