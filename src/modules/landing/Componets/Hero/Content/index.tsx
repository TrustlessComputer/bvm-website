import s from './styles.module.scss';
import { Button, HStack } from '@chakra-ui/react';
import { DEVELOPERS_DOC_URL } from '@/config';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Lines from '@/interactive/Lines';
import Fade from '@/interactive/Fade';

export default function HeroContent() {

  const router = useRouter();
  return <div className={s.heroContent}>

    <div className={s.heroContent_content}>
      <Lines delay={.2}>
        BVM is a metaprotocol that lets developers launch their own lightning-fast and low-cost Bitcoin L2 blockchain in
        a
        few clicks and start building decentralized applications on Bitcoin.
      </Lines>
    </div>
    <HStack align='center' spacing={['6px', '18px']} mt={['24px']}>
      <Fade delay={.6}>
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
          height={'48px'}
          fontWeight={400}
          fontSize={'20px'}
          onClick={() => {
            router.push('/blockchains/customize');
          }}
        >
          {`Build your Bitcoin L2`}
        </Button>
      </Fade>
      <Fade delay={.7}>
        <Button
          // bgColor={'#FFA564'}
          bgColor={'transparent'}
          color={'#fff'}
          borderRadius={0}
          px={'24px'}
          py={'10px'}
          height={'48px'}
          fontWeight={400}
          fontSize={'20px'}
          _hover={{
            bgColor: 'transparent',
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
  </div>;
}
