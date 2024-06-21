import { Flex, Tbody, Th, Thead, Tr, Text } from '@chakra-ui/react';
import s from '../styles.module.scss';

type Props = {
  type: 'Hacker' | 'Growth' | 'Secure' | 'Enterprise';
  description?: string;
  ctaButtonElement?: any;
  priceUSD?: string | number;
  priceBVM?: string | number;
  isEnterprice?: boolean;
};

const MainCell = (props: Props) => {
  const {
    type,
    description,
    ctaButtonElement,
    priceUSD,
    priceBVM,
    isEnterprice,
  } = props;

  const getRadianColor = () => {
    switch (type) {
      case 'Hacker':
        return ['#A1E3CB', '#A1E3CB'];
      case 'Growth':
        return ['#004FC5', '#95BFFF'];
      case 'Secure':
        return ['#FF7E21', '#FFC397'];
      case 'Enterprise':
        return ['#4F43E2', '#A8A1FE'];
      default:
        return ['#A1E3CB', '#A1E3CB'];
    }
  };

  const color = getRadianColor();

  return (
    <Flex
      flexDir={'column'}
      minH={'230px'}
      align={'center'}
      position={'relative'}
      overflow={'visible'}
      textTransform={'none'}
    >
      <Flex
        position={'absolute'}
        borderRadius={'100px'}
        top={'-40px'}
        margin={'auto'}
        height={'50px'}
        w={'200px'}
        gap="10px"
        p="10px"
        justify={'center'}
        align={'center'}
        fontSize={'24px'}
        fontWeight={500}
        color={'#fff'}
        bgGradient={`linear(to-r, ${color[0]}, ${color[1]})`}
        className={s.fontJetBrains}
      >
        {type}
      </Flex>
      <Text
        mt={'30px'}
        fontSize={'15px'}
        lineHeight={'20px'}
        minH={'70px'}
        fontWeight={400}
        textAlign={'center'}
        className={s.fontSFProDisplay}
        style={{
          textWrap: 'wrap',
        }}
        opacity={0.7}
      >
        {description}
      </Text>

      {!isEnterprice && (
        <Flex flexDir={'column'} minH={'120px'}>
          <Flex
            direction={'row'}
            align={'center'}
            justify={'center'}
            gap={'10px'}
          >
            <Text
              fontSize={'40px'}
              lineHeight={'52px'}
              fontWeight={500}
              textAlign={'center'}
              className={s.fontJetBrains}
            >
              {`${priceUSD || '--'}`}
            </Text>
            <Text
              fontSize={'24px'}
              lineHeight={'31px'}
              fontWeight={300}
              textAlign={'center'}
              opacity={0.7}
              className={s.fontSFProDisplay}
            >
              {`${priceBVM || '--'}`}
            </Text>
          </Flex>
          <Text
            fontSize={'12px'}
            lineHeight={'16px'}
            fontWeight={400}
            textAlign={'center'}
            className={s.fontJetBrains}
          >
            {`per chain / month`}
          </Text>
        </Flex>
      )}

      {isEnterprice && (
        <Flex flexDir={'column'} minH={'120px'}>
          <Text
            fontSize={'36px'}
            lineHeight={'46px'}
            fontWeight={500}
            textAlign={'center'}
            mt={'20px'}
            className={s.fontJetBrains}
          >
            {`Custom pricing`}
          </Text>
        </Flex>
      )}

      {ctaButtonElement}
    </Flex>
  );
};

export default MainCell;
