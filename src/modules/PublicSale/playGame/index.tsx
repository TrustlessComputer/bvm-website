import { Box, Center, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import EternalAi from './VideoFrame';
import { useState } from 'react';
import cx from 'clsx';

const DAYS = [
  {key: 0, title: 'DAY 1', desc: 'day 1 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 1, title: 'DAY 2', desc: 'day 2 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 2, title: 'DAY 3', desc: 'day 3 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 3, title: 'DAY 4', desc: 'day 4 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 4, title: 'DAY 5', desc: 'day 5 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 5, title: 'DAY 6', desc: 'day 6 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
  {key: 6, title: 'DAY 7', desc: 'day 6 Day Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.Ut enim ad minima veniam, quis nostrum exercitationem ullam.'},
]

const Playgame = () => {
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);

  return (
    <Flex className={s.container} direction={"column"}>
      <Box className={s.content}>
        <Flex gap={2} justifyContent={"space-between"} mb={8}>
          {
            DAYS.map(d => {
              return (
                <Flex flex={1} justifyContent={'center'} alignItems={"center"}
                      onClick={() => setSelectedDay(d)}
                      className={cx(s.item, d?.key === selectedDay?.key ? s.selected : null)}>
                  {d?.title}
                </Flex>
              )
            })
          }
        </Flex>
        <SimpleGrid gridTemplateColumns={["1fr", "1fr 1fr"]}>
          <GridItem>
            <Text className={s.title}>{selectedDay?.title}</Text>
            <Text className={s.desc}>{selectedDay?.desc}</Text>
            <a href={"https://bvm.network/"} target={"_blank"}>
              <Flex className={s.learnMoreWrapper} gap={3}>
                <Text>Play game in Arcade</Text>
                <Center w={"28px"} height={"28px"} bgColor={"#FA4E0E"}>
                  <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1144 12.1642C13.0305 12.1672 12.9469 12.1532 12.8685 12.1232C12.7901 12.0931 12.7186 12.0476 12.6582 11.9893C12.5978 11.931 12.5498 11.8611 12.517 11.7839C12.4842 11.7066 12.4673 11.6236 12.4673 11.5396C12.4673 11.4557 12.4842 11.3726 12.517 11.2954C12.5498 11.2181 12.5978 11.1483 12.6582 11.09C12.7186 11.0317 12.7901 10.9861 12.8685 10.9561C12.9469 10.926 13.0305 10.9121 13.1144 10.915L17.8284 10.915C17.994 10.9151 18.1528 10.981 18.2699 11.0981C18.3871 11.2152 18.4529 11.374 18.453 11.5396L18.453 16.2537C18.456 16.3376 18.442 16.4212 18.4119 16.4995C18.3819 16.5779 18.3364 16.6494 18.2781 16.7098C18.2198 16.7702 18.1499 16.8182 18.0727 16.851C17.9954 16.8838 17.9123 16.9007 17.8284 16.9007C17.7445 16.9007 17.6614 16.8838 17.5841 16.851C17.5069 16.8182 17.437 16.7702 17.3787 16.7098C17.3204 16.6494 17.2749 16.5779 17.2448 16.4995C17.2148 16.4212 17.2008 16.3376 17.2038 16.2537L17.2038 13.0481L11.4939 18.758C11.3767 18.8752 11.2177 18.9411 11.052 18.9411C10.8862 18.9411 10.7272 18.8752 10.61 18.758C10.4928 18.6408 10.427 18.4818 10.427 18.3161C10.427 18.1503 10.4928 17.9913 10.61 17.8741L16.3199 12.1642L13.1144 12.1642Z" fill="white"/>
                  </svg>
                </Center>
              </Flex>
            </a>
          </GridItem>
          <GridItem>
            <Flex justifyContent={"flex-end"}>
              <EternalAi />
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Playgame;
