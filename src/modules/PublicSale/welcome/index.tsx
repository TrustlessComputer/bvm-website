import { Box, Center, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import EternalAi from 'src/modules/PublicSale/welcome/VideoFrame';

const LearnMore = ({url, title}: any) => {
  return (
    <a href={url} target={"_blank"}>
      <Flex className={s.learnMoreWrapper} gap={3}>
        <Text>{title}</Text>
        <Center w={"20px"} height={"20px"} bgColor={"#FA4E0E"}>
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6144 12.3644C12.5305 12.3674 12.4469 12.3534 12.3685 12.3234C12.2901 12.2933 12.2186 12.2478 12.1582 12.1895C12.0978 12.1312 12.0498 12.0613 12.017 11.9841C11.9842 11.9068 11.9673 11.8238 11.9673 11.7398C11.9673 11.6559 11.9842 11.5728 12.017 11.4956C12.0498 11.4183 12.0978 11.3484 12.1582 11.2902C12.2186 11.2319 12.2901 11.1863 12.3685 11.1563C12.4469 11.1262 12.5305 11.1123 12.6144 11.1152L17.3284 11.1152C17.494 11.1153 17.6528 11.1812 17.7699 11.2983C17.8871 11.4154 17.9529 11.5742 17.953 11.7398L17.953 16.4539C17.956 16.5377 17.942 16.6214 17.9119 16.6997C17.8819 16.7781 17.8364 16.8496 17.7781 16.91C17.7198 16.9704 17.6499 17.0184 17.5727 17.0512C17.4954 17.084 17.4123 17.1009 17.3284 17.1009C17.2445 17.1009 17.1614 17.084 17.0841 17.0512C17.0069 17.0184 16.937 16.9704 16.8787 16.91C16.8204 16.8496 16.7749 16.7781 16.7448 16.6997C16.7148 16.6214 16.7008 16.5377 16.7038 16.4539L16.7038 13.2483L10.9939 18.9582C10.8767 19.0754 10.7177 19.1413 10.552 19.1413C10.3862 19.1413 10.2272 19.0754 10.11 18.9582C9.9928 18.841 9.92696 18.682 9.92696 18.5163C9.92696 18.3505 9.9928 18.1915 10.11 18.0743L15.8199 12.3644L12.6144 12.3644Z" fill="white"/>
          </svg>
        </Center>
      </Flex>
    </a>
  )
}

const Welcome = () => {
  return (
    <Flex className={s.container}>
      <Box className={s.content}>
        <SimpleGrid gridTemplateColumns={["1fr", "1fr 1fr"]} gap={6}>
          <GridItem>
            <Text className={s.title}>Welcome to the future of Bitcoin.</Text>
            <Text className={s.desc}>The first modular blockchain metaprotocol that lets you customize and launch your own Bitcoin L2 blockchain protocol in a few clicks.</Text>
            <Flex gap={3}>
              <LearnMore url={"https://cdn.bvm.network/docs/onepager.pdf"} title={"Onepager"}/>
              <LearnMore url={"https://cdn.bvm.network/docs/deck.pdf"} title={"Deck"}/>
              <LearnMore url={"https://cdn.bvm.network/docs/whitepaper.pdf"} title={"Whitepaper"}/>
            </Flex>
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

export default Welcome;
