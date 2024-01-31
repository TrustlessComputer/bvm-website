import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';
import React from 'react';

const TopHeader = () => {
  const router = useRouter();

  return (
    <Flex direction={"column"} className={s.container} gap={3}>
      <Flex gap={4} justifyContent={"space-between"} direction={"row"}>
        <Flex gap={4} alignItems={"center"} >
          <Flex direction={"column"} gap={1}>
            <Text className={s.title}>Top Contribution</Text>
            <Text className={s.desc}>The first modular blockchain metaprotocol that lets</Text>
          </Flex>
        </Flex>
        {/*<Flex alignItems={"flex-end"}>
          <LeaderBoardSwitch />
        </Flex>*/}
      </Flex>
    </Flex>
  )
}

export default TopHeader;
