import { Flex } from '@chakra-ui/react';
import ItemCommunity from './Step';
import s from './styles.module.scss';

const Steps = () => {
  const handleShareTw = () => {
    alert('aaaaa')
  }

  const DATA_COMMUNITY = [
    {
      title: 'Share on X',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      actionText: 'Share',
      actionHandle: handleShareTw,
    },
    {
      title: 'Verify your wallet',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      actionText: 'Connect Wallet',
      actionHandle: handleShareTw,
    },
    {title: 'Completed 2 tasks above', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'},
  ];


  return (
    <Flex className={s.container} direction={"column"} gap={5} mt={4}>
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemCommunity
            key={index}
            delay={0.4 + index / 10}
            content={item}
          />
        );
      })}
    </Flex>
  );
};

export default Steps;
