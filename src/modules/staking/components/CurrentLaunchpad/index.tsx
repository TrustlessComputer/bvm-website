import { Box, Button, Flex, Image } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React, { useMemo } from 'react';
// import SocialToken from '@/modules/Launchpad/components/Social';
import { useRouter } from 'next/navigation';

const CurrentLaunchpad = () => {
  const socials = useMemo(() => {
    return {
      website: 'https://eternalai.org/',
      twitter: 'https://twitter.com/CryptoEternalAI',
      telegram: 'https://t.me/+d8yMI3IjmCU1ODhh',
    };
  }, []);
  const router = useRouter();

  return (
    <Box width='100%'>
      <p className={styles.boxTitle}><b>Dealflow.</b> Your exclusive access to new crypto deals.</p>
      <Flex className={styles.content}>
        <Image
          className={styles.content_img}
          width='318px'
          height='180px'
          src={'/images/stake/stake-ai-logo.png'}
        />
        <Flex flexDirection='column' gap='14px'>
          <Flex gap='24px' alignItems='center'>
            <p className={styles.content_title}>Eternal AI</p>
            {/*<SocialToken socials={socials}/>*/}
          </Flex>
          <p className={styles.content_desc}>
            The more $BVM you stake, the higher your boost in the public sale - up to a whopping 30%!
          </p>
          <Button
            height='50px'
            width='100%'
            maxWidth='180px'
            fontSize='16px'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#10C800'
            borderRadius="100px"
            onClick={() => {
              window.open('https://nakachain.xyz/launchpad/detail/2', "_blank");
            }}
          >
            Participate Now
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CurrentLaunchpad;
