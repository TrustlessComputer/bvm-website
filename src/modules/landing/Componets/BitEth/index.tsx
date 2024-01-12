import s from './styles.module.scss';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Chars from '@/interactive/Chars';
import Scale from '@/interactive/Scale';
import Lines from '@/interactive/Lines';

export default function BitEth() {

  const router = useRouter();
  const { mobileScreen } = useWindowSize();

  return <div className={s.bitEth}>
    <div className={`${s.bitEth_inner} container`}>
      <div className={s.bitEth_content}>
        <Scale>
          <Image className={s.thumb} src={'landing/biteth.svg'} alt={'biteth.svg'} width={250} height={80}
                 loading={'eager'} />
        </Scale>
        <h2 className={s.heading}>
          <Chars delay={.2}>
            Zero effort to migrate from Ethereum
          </Chars>
        </h2>
        <div className={s.content}>
          <Lines delay={.3}>
            Whatever your vision — a dapp, a fully onchain game, a DEX, or an ecosystem — there are many benefits of
            running your own blockchain.
          </Lines>
        </div>
        <div className={s.actions}>
          <Fade delay={0.5}>
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
        </div>
      </div>
      <Scale>
        <Image className={s.full} src={'/landing/carbon.jpg'} alt={'carbon'} width={1600} height={570} />
      </Scale>
    </div>
  </div>;
}
