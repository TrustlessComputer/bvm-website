import React from 'react';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Loader from '@/modules/builder-landing/Loader';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useRouter } from 'next/navigation';

export default function Hero(): React.JSX.Element {

  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={'containerV3'}>
        <div className={s.inner}>
          <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
            <div>
              <p className={s.label}>ROLLUP</p>
              <p className={s.heading}>Bitcoin Zero Knowledge (BitZK)</p>
              <p className={s.decsription}>
                ZK rollups on Bitcoin for virtually any decentralized applications.
              </p>
            </div>
          </Fade>
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
            <Button
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={100}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={'24px'}
              py={'13px'}
              fontWeight={500}
              marginTop={'24px'}
              fontSize={'14px'}
              onClick={() => {
                router.push('/pricing');
              }}
              _hover={{
                bgColor: '#e64e0e',
              }}
            >
              Get started with BitZK
            </Button>
          </Fade>
          <div onClick={() => {
            window.open('');
          }} className={s.link}>
            <p>Connect with a BVM team member</p>
            <div className={s.link_icon}>
              <ImagePlaceholder src={'/icons/ic_arrow.png'} alt={'icons'} width={20} height={20}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
