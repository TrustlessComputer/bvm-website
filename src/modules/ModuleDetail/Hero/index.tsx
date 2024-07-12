import React from 'react';
import s from './styles.module.scss';
import { Button, Flex } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import Loader from '@/modules/builder-landing/Loader';
import { useRouter } from 'next/navigation';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { IMODULE_HERO } from '@/app/module/data';

export default function Hero({
  data,
}: {
  data: IMODULE_HERO;
}): React.JSX.Element {
  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  return (
    <div className={s.wrapper} style={{ '--bg': data.theme } as any}>
      <Loader />
      <div className={'containerV3'}>
        <div className={s.inner}>
          <Fade delay={0.1} delayEnter={0.1} from={{ y: 20 }} to={{ y: 0 }}>
            <div>
              <p className={s.label}>{data.subTitle}</p>
              <p className={s.heading}>{data.title}</p>
              <p className={s.decsription}>{data.desc}</p>
            </div>
          </Fade>
          <Fade delay={0.3} delayEnter={0.3} from={{ y: 20 }} to={{ y: 0 }}>
            <Flex
              flexDirection={{ base: 'column', sm: 'row' }}
              alignItems={'flex-start'}
              marginTop={'24px'}
              gap={{ base: '10px', sm: '20px' }}
            >
              {data.start && (
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
                    if (!data.start) return;
                    router.push(data.start.link);
                  }}
                  _hover={{
                    bgColor: '#e64e0e',
                  }}
                >
                  {data.start.text}
                </Button>
              )}

              <Button
                bgColor={'transparent'}
                color={'#FA4E0E'}
                padding={[10, 0, 10, 0]}
                borderRadius={100}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                fontWeight={500}
                fontSize={'14px'}
                onClick={showContactUsModal}
              >
                Contact us
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#FA4E0E"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Button>
            </Flex>
          </Fade>
        </div>
        {!!data.icon && (
          <div className={s.icon_right}>
            <img src={data.icon} alt={'icon'} />
          </div>
        )}
      </div>
    </div>
  );
}
