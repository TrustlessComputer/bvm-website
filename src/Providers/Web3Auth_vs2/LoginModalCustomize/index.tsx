import BaseModal from '@/components/BaseModal';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

export type Props = {
  isShow: boolean;
  onHide: () => void;
  onLoginTwitter?: () => void;
  onLoginGoogle?: () => void;
};

const Web3AuthLoginModalCustomize = (props: Props) => {
  const { isShow, onHide, onLoginTwitter, onLoginGoogle } = props;
  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      size="custom"
    >
      <Flex
        direction={'column'}
        color={'black'}
        justify={'center'}
        alignItems={'flex-start'}
        w={'100%'}
        align={'center'}
        textAlign={'center'}
        gap={'5px'}
      >
        {/* Logo */}
        <Image
          src={`https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/logo.png`}
          fit={'cover'}
          maxW={'50px'}
          maxH={'50px'}
          alignSelf={'flex-start'}
        />

        {/* Title */}
        <Text
          fontSize={'20px'}
          fontWeight={500}
          lineHeight={'34px'}
          color={'#fff'}
        >
          Sign in
        </Text>

        {/* Description */}
        <Text
          fontSize={'16px'}
          fontWeight={400}
          lineHeight={'18px'}
          color={'#8f96a3'}
        >
          Connect to your google account to sign in.
        </Text>

        {/* <Box height={'20px'}></Box> */}

        {/* Button Login Area */}
        {/* <Button
          bgColor={'#3f83f8'}
          borderRadius={'20px'}
          py={'15px'}
          color={'#fff'}
          w={'100%'}
          _hover={{
            opacity: 0.8,
          }}
          fontWeight={500}
          onClick={() => onLoginTwitter && onLoginTwitter()}
          leftIcon={
            <Image
              src={`/icons/ic_twitter.svg`}
              fit={'cover'}
              maxW={'25px'}
              maxH={'25px'}
            />
          }
        >
          Continue with Twitter
        </Button> */}

        <Box height={'10px'}></Box>

        {/* Button Login Area */}
        <Button
          bgColor={'#fff'}
          borderRadius={'20px'}
          py={'15px'}
          // color={'#3f83f8'}
          color={'#000'}
          w={'100%'}
          _hover={{
            opacity: 0.8,
          }}
          fontWeight={500}
          onClick={() => onLoginGoogle && onLoginGoogle()}
          leftIcon={
            <Image
              src={`/icons/ic_google.png`}
              fit={'cover'}
              maxW={'25px'}
              maxH={'25px'}
            />
          }
        >
          Continue with Google
        </Button>

        {/* Description More */}
        <Text
          marginTop={'20px'}
          fontSize={'13px'}
          fontWeight={400}
          textAlign={'center'}
          lineHeight={'20px'}
          color={'#8f96a3'}
          w={'100%'}
        >
          We do not store any data related to your social logins.
        </Text>

        <Box height={'200px'}></Box>

        <Flex
          flexDirection={'column'}
          justify={'center'}
          alignItems={'center'}
          w={'100%'}
          color={'#8f96a3'}
          marginBottom={'20px'}
        >
          <Text fontSize={'13px'} fontWeight={400} lineHeight={'20px'}>
            Self-custodial login by Web3Auth
          </Text>

          <Flex flexDir={'row'} gap={'5px'}>
            <Text
              fontSize={'13px'}
              fontWeight={400}
              lineHeight={'20px'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() =>
                window.open(
                  'https://web3auth.io/docs/legal/terms-and-conditions',
                  '_blank',
                )
              }
            >
              Terms of Services |
            </Text>

            <Text
              fontSize={'13px'}
              fontWeight={400}
              lineHeight={'20px'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() =>
                window.open(
                  'https://web3auth.io/docs/legal/privacy-policy',
                  '_blank',
                )
              }
            >
              Privacy Policy
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default Web3AuthLoginModalCustomize;
