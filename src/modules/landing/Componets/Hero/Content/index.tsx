import s from './styles.module.scss';
import { Button, HStack } from '@chakra-ui/react';
import { DEVELOPERS_DOC_URL } from '@/config';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';
import useWindowSize from '@/hooks/useWindowSize';

export default function HeroContent() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  const router = useRouter();
  return (
    <div className={s.heroContent}>
      {mobileScreen ? (
        <p>
          BVM is a metaprotocol that lets developers launch their own
          lightning-fast and low-cost Bitcoin L2 blockchain in a few clicks and
          start building decentralized applications on Bitcoin.
        </p>
      ) : (
        <Lines delay={0.2}>
          BVM is a metaprotocol that lets developers launch their own
          lightning-fast and low-cost Bitcoin L2 blockchain in a few clicks and
          start building decentralized applications on Bitcoin.
        </Lines>
      )}
      <HStack
        align="center"
        spacing={['6px', '18px']}
        mt={'24px'}
        flexDirection={mobileScreen || tabletScreen ? 'column' : 'row'}
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
              router.push('/blockchains/customize');
            }}
          >
            {`Build your Bitcoin L2`}
          </Button>
        </Fade>
        <Fade delay={0.7}>
          <Button
            // bgColor={'#FFA564'}
            bgColor={'transparent'}
            color={'#fff'}
            borderRadius={0}
            px={'24px'}
            py={'10px'}
            height={'48px'}
            fontWeight={400}
            width={mobileScreen ? '100%' : ''}
            fontSize={'16px'}
            _hover={{
              bgColor: 'transparent',
              textDecoration: 'underline',
            }}
            onClick={() => {
              // window.open('https://docs.bvm.network/', '_blank')
              window.open(DEVELOPERS_DOC_URL, '_blank');
            }}
          >
            {`Explore the docs`}
            <ChevronRightIcon width={'20px'} height={'20px'} mt={'2px'} />
          </Button>
        </Fade>
      </HStack>
    </div>
  );
}
