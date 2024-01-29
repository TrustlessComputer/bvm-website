import s from './styles.module.scss';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import cx from 'clsx';
import { getLink } from '@/utils/helpers';
import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';

const TopContributorReward = () => {
  const user = useAppSelector(userSelector);
  const handleShareTw = () => {
    const shareUrl = getLink(user?.referral_code || '');

    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon\n\nJoin the allowlist`;
    const url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;

    window.open(url, '_blank');
  }

  return (
    <Box className={s.container}>
      <Flex p={"8px 16px"} bg={"#F6F6F6"} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontSize={"16px"}
          fontWeight={500}
          color={"#000000"}
        >Top 1 $BVM holders</Text>
      </Flex>
      <Flex gap={6} direction={["column", "row"]} p={"8px 16px"} alignItems={"center"}>
        <Flex direction={"column"}>
          {/*<Text className={s.title}>{programeInfo?.title}</Text>*/}
          <Text className={s.desc}>Increase your contribution by at least $12(0.2BVM)  to receive a Solaris.</Text>
          {/*<Flex gap={4}>
            <Flex className={cx(s.learnMoreWrapper)} gap={3} onClick={handleShareTw}>
              <Text>Learn</Text>
              <Center w={"28px"} height={"28px"} bgColor={"#FFFFFF"}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1144 12.7961C13.0305 12.799 12.9469 12.7851 12.8685 12.755C12.7901 12.725 12.7186 12.6794 12.6582 12.6211C12.5978 12.5628 12.5498 12.493 12.517 12.4157C12.4842 12.3385 12.4673 12.2554 12.4673 12.1715C12.4673 12.0875 12.4842 12.0045 12.517 11.9272C12.5498 11.8499 12.5978 11.7801 12.6582 11.7218C12.7186 11.6635 12.7901 11.618 12.8685 11.5879C12.9469 11.5579 13.0305 11.5439 13.1144 11.5469L17.8284 11.5469C17.994 11.547 18.1528 11.6128 18.2699 11.7299C18.3871 11.847 18.4529 12.0058 18.453 12.1715L18.453 16.8855C18.456 16.9694 18.442 17.053 18.4119 17.1314C18.3819 17.2097 18.3364 17.2812 18.2781 17.3416C18.2198 17.402 18.1499 17.45 18.0727 17.4828C17.9954 17.5157 17.9123 17.5326 17.8284 17.5326C17.7445 17.5326 17.6614 17.5157 17.5841 17.4828C17.5069 17.45 17.437 17.402 17.3787 17.3416C17.3204 17.2812 17.2749 17.2097 17.2448 17.1314C17.2148 17.053 17.2008 16.9694 17.2038 16.8855L17.2038 13.68L11.4939 19.3898C11.3767 19.5071 11.2177 19.5729 11.052 19.5729C10.8862 19.5729 10.7272 19.5071 10.61 19.3898C10.4928 19.2726 10.427 19.1137 10.427 18.9479C10.427 18.7821 10.4928 18.6232 10.61 18.506L16.3199 12.7961L13.1144 12.7961Z" fill="black"/>
                </svg>
              </Center>
            </Flex>
          </Flex>*/}
        </Flex>
        <Center className={s.raffleBg}>
          <img src={`/public-sale/raffleImg.png`} alt="raffleBtnBg" />
        </Center>
      </Flex>
    </Box>
  )
};

export default TopContributorReward;
