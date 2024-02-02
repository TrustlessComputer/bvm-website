import { Box, Flex, Image, Text } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import { useRef } from 'react';
import styles from './styles.module.scss';
import cs from 'classnames';

const VIDEO_ID = 'video_public_sale';
const BANNER_ID = 'banner_public_sale';

const IntroVideos = () => {

  const videoRef = useRef<HTMLVideoElement | undefined>(undefined)

  return (
    <Flex bg="black" justifyContent="center" pt={{ base: "32px", lg: "80px" }} className={styles.container}>
      <BoxContent>
        <Text fontSize={{ base: "24px", md: "44px" }} mb={{ base: "12px", md: "24px" }} textAlign="center" ml="auto" mr="auto">Welcome to the future of Bitcoin.</Text>
        <Text fontSize={{ base: "16px", md: "22px" }} textAlign="center" maxWidth="820px" ml="auto" mr="auto">Our mission is to make Bitcoin as generalized as possible — usable for far more than just a currency. We want DeFi, Gaming, AI, DAOs, and NFTs all on Bitcoin.</Text>
        <Box maxW={{ base: "100%", lg: "1100px" }} w="100%" aspectRatio="16/9" alignSelf="center" mt={{ base: "16px", md: "52px" }} mb="80px" position="relative">
          <video src="public-sale/public_sale_video_2.mp4" controls autoPlay={false} id={VIDEO_ID} ref={videoRef as any} />
          <Image src="public-sale/t-videos.jpeg" position="absolute" top="0" id={BANNER_ID} className={cs(styles.banner)} onClick={() => {
            if (videoRef && videoRef.current) {
              const banner = document.getElementById(BANNER_ID)
              videoRef.current?.play();
              if (banner) {
                banner.className = cs(styles.banner, styles.bannerHidden);
              }
            }
          }}/>
        </Box>
      </BoxContent>
    </Flex>
  )
}

export default IntroVideos;
