import { Flex, ListItem, OrderedList, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const EngageWithTeam = () => {
  return (
    <Flex className={s.container} direction={"column"} gap={"24px"}>
      <Flex gap={8} width={"100%"} justifyContent={"space-between"}>
        <Flex direction={"column"}>
          <Text className={s.title}>Engage with the team and fellow backers!</Text>
          <OrderedList className={s.desc}>
            <ListItem><a href={"https://app.alpha.wtf/"} style={{textDecoration: 'underline'}} target={"_blank"}>Install Alpha</a></ListItem>
            <ListItem>Receive fractional keys to join the BVM circle</ListItem>
            <ListItem>Chat with the core team and the community</ListItem>
          </OrderedList>
        </Flex>
        <img src={'/public-sale/engageWithTeam.png'} alt={'engageWithTeam'} className={s.img}/>
      </Flex>
    </Flex>
  )
};

export default EngageWithTeam;
