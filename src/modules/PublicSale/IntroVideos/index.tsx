import { Box, Flex, Text } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import YouTube from 'react-youtube';
import styles from './styles.module.scss';

const IntroVideos = () => {
  return (
    <Flex bg="black" justifyContent="center" pt={{ base: "32px", lg: "80px" }}>
      <BoxContent>
        <Text fontSize={{ base: "24px", md: "44px" }} mb={{ base: "12px", md: "24px" }} textAlign="center" ml="auto" mr="auto">Bitcoin, reimagined.</Text>
        <Text fontSize={{ base: "16px", md: "22px" }} textAlign="center" maxWidth="620px" ml="auto" mr="auto">Our mission is to make Bitcoin as generalized as possible — usable for far more than just a currency. We want DeFi, Gaming, AI, DAOs, and NFTs all on Bitcoin.</Text>
        <Box maxW={{ base: "100%", lg: "1100px" }} alignSelf="center" mt={{ base: "16px", md: "52px" }} mb="80px">
          <iframe
            className={styles.videos}
            src={`https://www.youtube.com/embed/OHmgu2FH5Wo`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Box>
      </BoxContent>
    </Flex>
  )
}

export default IntroVideos;
