import { Box, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { TOKEN_ICON_DEFAULT } from '@/constants/constants';
import SocialToken from '@/modules/Launchpad/components/Social';
import React, { useMemo } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useAppSelector } from '@/store/hooks';
import { summarySelector } from '@/store/states/lpEAIPayment/selector';
import { LAUNCHPAD_AI_NAME } from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/configs';

const EAIHeader = () => {
  const socials = useMemo(() => {
    return {
      website: 'https://eternalai.org/',
      twitter: 'https://twitter.com/CryptoEternalAI',
    };
  }, []);

  const summary = useAppSelector(summarySelector);

  return (
    <Box className={s.container}>
      <SimpleGrid
        columns={[1, 2]}
        gridTemplateColumns={{ base: '1fr', lg: '1fr 250px' }}
        className={s.container}
        gap={'32px'}
        mt={'16px'}
      >
        <GridItem>
          <Flex
            direction={['column', 'row']}
            gap={4}
            color={'var(--naka-text)'}
            alignItems={['center', 'flex-start']}
            justifyContent={['flex-start', 'flex-start']}
          >
            <Flex alignItems="flex-start" h="100%">
              <img
                src={
                  `/icons/public-sale/external_ai_icon.svg` ||
                  TOKEN_ICON_DEFAULT
                }
                className={s.launchpadAvatar}
              />
            </Flex>
            <Flex gap={0} direction={'column'}>
              <Flex
                direction={['column', 'row']}
                gap={'12px'}
                fontSize={'32px'}
                fontWeight={'500'}
                alignItems={'center'}
              >
                {LAUNCHPAD_AI_NAME}{' '}
                <Flex gap={'16px'} justifyContent={['center', 'left']}>
                  <SocialToken socials={socials} theme={'light'} />
                </Flex>
              </Flex>
              <Text
                fontSize={'16px'}
                fontWeight={400}
                textAlign={['center', 'left']}
                mt={['8px', '0']}
              >
                Eternal AI is a Bitcoin L2 powering programmable and composable
                real-life AI models on Bitcoin:&nbsp;
                <Link
                  href="https://cdn.eternalai.org/docs/whitepaper.pdf"
                  prefetch={false}
                  target={'_blank'}
                  style={{ textDecoration: 'underline', color: '#6E16FE' }}
                >
                  White Paper
                </Link>{' '}
                |{' '}
                <Link
                  href="https://eternalai.org/"
                  prefetch={false}
                  target={'_blank'}
                  style={{ textDecoration: 'underline', color: '#6E16FE' }}
                >
                  About Eternal AI
                </Link>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex justifyContent={'flex-end'} gap={'32px'}>
            <Flex
              className={s.boxTime}
              gap={['24px', '48px']}
              direction={['column', 'row']}
            >
              <Flex direction={'column'}>
                <Text fontSize={'14px'} fontWeight={400}>
                  Start time
                </Text>
                <Text fontSize={'22px'} fontWeight={600} whiteSpace={'nowrap'}>
                  {dayjs(summary?.start_time).format('MM/DD/YYYY hh:mm A')}
                </Text>
              </Flex>
              {/*<Flex direction={'column'}>*/}
              {/*  <Text fontSize={'14px'} fontWeight={400}>*/}
              {/*    Ends in*/}
              {/*  </Text>*/}
              {/*  <Text fontSize={'22px'} fontWeight={600} whiteSpace={'nowrap'}>*/}
              {/*    <Countdown*/}
              {/*      className={cs(s.countdownTime, s.highLight)}*/}
              {/*      expiredTime={summary?.end_time as string}*/}
              {/*      onRefreshEnd={() => dispatch(requestReload())}*/}
              {/*      hideIcon={true}*/}
              {/*    />*/}
              {/*  </Text>*/}
              {/*</Flex>*/}
            </Flex>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default EAIHeader;
