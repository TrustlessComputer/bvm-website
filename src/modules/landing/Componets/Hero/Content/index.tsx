import s from './styles.module.scss';
import { Button, HStack } from '@chakra-ui/react';
import { DEVELOPERS_DOC_URL } from '@/config';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';
import { getTopLeaderBoards } from '@/services/leaderboard';
import { formatCurrency } from '@/utils/format';

export default function HeroContent() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  const router = useRouter();

  const [count, setCount] = React.useState('');

  const getCount = async () => {
    try {
      const response = await getTopLeaderBoards({ page: 1, limit: 20 });
      setCount(response.count)
    } catch (e) {
      console.log(e);
    }
  }


  React.useEffect(() => {
    getCount()
  }, [])

  return (
    <div className={s.heroContent}>
      {mobileScreen ? (
        <p>
          The first modular blockchain metaprotocol that lets you customize and launch your own Bitcoin L2 blockchain protocol in a few clicks.
        </p>
      ) : (
        <Lines delay={0.2}>
          The first modular blockchain metaprotocol that lets you customize and launch your own Bitcoin L2 blockchain protocol in a few clicks.
        </Lines>
      )}
      <HStack
        align="center"
        spacing={['12px', '18px']}
        mt={'24px'}
        flexDirection={mobileScreen ? 'column' : 'row'}
      >
        <Fade delay={0.6}>
          <Button
            bgColor={'#EF601B'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            minW={['180px']}
            width={mobileScreen ? '100%' : ''}
            height={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            _hover={{
              bgColor: '#000',
            }}
            onClick={() => {
              router.push('/allowlist');
            }}
          >
            Join the allowlist
          </Button>
        </Fade>
        <ul className={s.heroContent_lists}>
          <Fade>
            <li className={s.heroContent_itemSub}>
              <span className={s.heroContent_itemSub_hightLight}>
                Public sale starting soon
              </span>
            </li>
          </Fade>
          <Fade>
            <li className={s.heroContent_itemSub}>
              {formatCurrency(count, 0, 0)}&nbsp;
              <span className={s.heroContent_itemSub_hightLight}>
                people are on the allowlist
              </span>
            </li>
          </Fade>
        </ul>
        <Fade delay={0.7}/>
      </HStack>
    </div>
  );
}
