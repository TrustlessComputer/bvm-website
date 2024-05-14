import { Box, Button, Flex, Text } from '@chakra-ui/react';
import styles from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import React from 'react';
import useShareEAIOnX from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/hooks/useShareEAIOnX';
import AppLoading from '@/components/AppLoading';
import { useSelector } from 'react-redux';
import { userContributeSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { CDN_URL_ICONS } from '@/config';

const WhatEAI = () => {
  const {
    onShareEAIOnX,
    verifying,
    showManualCheck,
    onClickManualCheck,
    isDone,
  } = useShareEAIOnX();

  const userContributeInfo = useSelector(userContributeSelector);
  return (
    <Flex className={styles.container}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <p className={styles.container_title}>Share on X</p>
        <Text className={styles.container_bonus}>+1 EAI</Text>
      </Flex>
      <p className={styles.container_content}>
        Spread the love to your friends, coworkers, and communities.
      </p>

      {verifying && (
        <>
          <Box borderRadius={'6px'} mb={'12px'} p="12px" bg={'#6633ce1a'}>
            {verifying && (
              <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                style={{ color: '#000' }}
              >
                <AppLoading />
                <Text>Mission in progress...</Text>
              </Flex>
            )}
            {showManualCheck && (
              <Text
                mt={1}
                fontSize={'14px !important'}
                textAlign={'center'}
                fontWeight={'500'}
                style={{ color: '#000' }}
              >
                {`If it doesn't update quickly, do it manually `}
                <Text
                  cursor={'pointer'}
                  textDecoration={'underline'}
                  as={'span'}
                  style={{ color: '#000', fontWeight: '700' }}
                  _hover={{
                    color: '#6633ce',
                  }}
                  onClick={onClickManualCheck}
                >
                  here
                </Text>
              </Text>
            )}
          </Box>
        </>
      )}

      {isDone ? (
        <p className={styles.container_content}>
          You have successfully shared on X as{' '}
          <b>{userContributeInfo?.twitter_username}</b>.
        </p>
      ) : (
        <Button isDisabled={verifying} onClick={onShareEAIOnX}>
          Share on{' '}
          <SvgInset size={24} svgUrl={`${CDN_URL_ICONS}/bi_twitter-x.svg`} />
        </Button>
      )}
    </Flex>
  );
};

export default WhatEAI;
