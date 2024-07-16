import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const Section = ({title, children}: any) => {
  return (
    <Flex className={s.container} direction={"column"} gap={"24px"}>
      <Text className={s.title}>{title}</Text>
      {children}
    </Flex>
  )
};

export default Section;
