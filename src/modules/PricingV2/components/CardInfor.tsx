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
  hardwareList?: any[];
  blockChainInforsList?: any[];
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
    isHideHardware = false,
    isHideBlockchainInfor = false,
    includes,
  } = props;
  return (
    <Flex
      className={s.container}
      flexDir={'column'}
      alignItems={'center'}
      p={'32px'}
      borderRadius={'12px'}
      minH={'600px'}
      minW={'400px'}
      gap={'25px'}
      boxShadow="0px 0px 20px rgba(0, 0, 0, 0.15)"
      bgColor={bgColor}
      color={color}
      bgGradient={bgGradient}
    >
      <Flex flexDir={'column'} gap="20px" minH={'150px'}>
        <Text
          fontSize={'20px'}
          lineHeight={'26px'}
          fontWeight={500}
          textAlign={'center'}
          opacity={0.7}
        >
          {title}
        </Text>
        <Text
          fontSize={'16px'}
          lineHeight={'22.4px'}
          fontWeight={4000}
          textAlign={'center'}
          px={'30px'}
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
          gap={'20px'}
          minH={'130px'}
          w={'100%'}
        >
          <Text
            fontSize={'16px'}
            lineHeight={'20px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Hardware'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
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
          gap={'20px'}
          minH={'150px'}
          w={'100%'}
        >
          <Text
            fontSize={'16px'}
            lineHeight={'20px'}
            fontWeight={600}
            className={s.fontType2}
          >
            {'Blockchain Information'}
          </Text>
          <UnorderedList
            spacing={'10px'}
            paddingLeft={'20px'}
            className={s.fontType2}
          >
            {blockChainInforsList?.map((item, index) => (
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
          gap={'20px'}
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
                <Image src={`/icons/check_green.svg`} />
                <Text className={s.fontType2}>{item}</Text>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default CardInfor;
