import { Flex, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import s from '../styles.module.scss';

type Props = {
  title?: string;
};

const TitleSection = (props: Props) => {
  return (
    <Tr className={s.titleSection} textTransform={'none'}>
      <Th
        h="55px"
        textTransform={'none'}
        fontSize={'16px'}
        fontWeight={600}
        style={{
          textWrap: 'wrap',
        }}
        borderRightWidth={'1px'}
        borderRightColor={'#E7E7E7'}
      >
        {props.title || '--'}
      </Th>
      {/* <Th w={'25%'} maxW={'25%'}></Th>
      <Th w={'25%'} maxW={'25%'}></Th>
      <Th w={'25%'} maxW={'25%'}></Th>
      <Th w={'25%'} maxW={'25%'}></Th> */}

      <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}></Th>
      <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}></Th>
      <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}></Th>
      <Th borderRightWidth={'1px'} borderRightColor={'#E7E7E7'}></Th>
    </Tr>
  );
};

export default TitleSection;
