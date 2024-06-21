import React from 'react';
import s from './styles.module.scss';
import { Button, Flex } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Loader from '@/modules/builder-landing/Loader';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { useRouter } from 'next/navigation';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

export default function Hero(): React.JSX.Element {

  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={'containerV3'}>
        <div className={s.inner}>
          <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
            <div>
              <p className={s.label}>ROLLUP</p>
              <p className={s.heading}>BitZK</p>
              <p className={s.decsription}>
                ZK rollups on Bitcoin for virtually any decentralized applications.
              </p>
            </div>
          </Fade>
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
            <Flex alignItems={'center'} marginTop={'24px'} gap={'10px'}>
              <Button
                bgColor={'#FA4E0E'}
                color={'#fff'}
                borderRadius={100}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={500}
                fontSize={'14px'}
                width={180}
                onClick={() => {
                  router.push('/pricing');
                }}
                _hover={{
                  bgColor: '#e64e0e',
                }}
              >
                Get started
              </Button>
              <Button
                bgColor={'transparent'}
                color={'#FA4E0E'}
                // border={'1px solid #FA4E0E'}
                borderRadius={100}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={500}
                fontSize={'14px'}
                onClick={showContactUsModal}
                _hover={{
                  bgColor: 'rgba(248,243,243,0.58)',
                }}
              >
                Contact us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#FA4E0E" stroke-width="1.2" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
              </Button>
            </Flex>

            {/*<div onClick={showContactUsModal} className={s.link}>*/}
            {/*  <p>Connect with a BVM team member</p>*/}
            {/*  <div className={s.link_icon}>*/}
            {/*    <ImagePlaceholder src={'/icons/ic_arrow.png'} alt={'icons'} width={20} height={20} />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </Fade>
        </div>
      </div>
    </div>
  );
}
