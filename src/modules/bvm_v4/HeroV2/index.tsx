import React, { useState } from 'react';
import Heading from './Heading';
import cn from 'classnames';
import s from './styles.module.scss';
import Loader from '@/modules/builder-landing/Loader';
import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import { isDesktop } from 'react-device-detect';

export default function HeroV2() {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={s.wrapper}>
      <Loader />
      <div className={cn(s.inner, 'container')}>
        <Heading />
        <Flex
          alignItems={'center'}
          flexWrap={'wrap'}
          justifyContent={'center'}
          marginTop={'24px'}
          marginBottom={'40px'}
          gap={'24px'}
        >
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
            <Button
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={100}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              marginX={!isDesktop ? 'auto' : 0}
              px={'60px'}
              py={'17px'}
              width={'200px'}
              height={'54px'}
              fontWeight={500}
              fontSize={'18px'}
              onClick={() => {
                const rectBV = document.getElementById('buyBVMModule');
                rectBV &&
                  window.scrollTo(0, rectBV?.getBoundingClientRect().top);
              }}
              _hover={{
                bgColor: '#e64e0e',
              }}
            >
              Buy BVM
            </Button>
          </Fade>
          <Fade delay={0.5} delayEnter={0.5} from={{ y: 20 }} to={{ y: 0 }}>
            <Button
              borderColor={'#FA4E0E'}
              border={'1px'}
              color={'#FA4E0E'}
              borderRadius={100}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              px={'60px'}
              py={'17px'}
              width={'200px'}
              height={'54px'}
              fontWeight={500}
              marginX={!isDesktop ? 'auto' : 0}
              fontSize={'18px'}
              onClick={() => {
                router.push('/staking');
              }}
            >
              Stake BVM
            </Button>
          </Fade>
        </Flex>
        <Fade delay={0.7} delayEnter={0.7} from={{ y: 40 }} to={{ y: 0 }}>
          <div>
            <a
              href={'#'}
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className={s.footer_video}
            >
              <Image
                src={`/btn-play-4.jpg`}
                width={858}
                height={440}
                alt={'right'}
              />
            </a>
            <ModalVideo
              channel="custom"
              url={'/public-sale/public_sale_video_2.mp4'}
              isOpen={isOpen}
              onClose={() => {
                setOpen(false);
              }}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
}
