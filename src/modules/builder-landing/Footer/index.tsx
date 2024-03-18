import React from 'react';
import s from './styles.module.scss';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import useScrollTo from '@/modules/builder-landing/useScrollTo';

const dataSocial = [
  // {
  //   id: 0,
  //   title: 'Developer guides',
  //   link: 'https://docs.bvm.network/bvm/',
  //   image: '/public-sale/iconTopRight.svg',
  //   alt: 'bvm'
  // },
  {
    id: 1,
    title: 'Twitter',
    link: 'https://twitter.com/bird_2836',
    image: '/builder/tw_icon.svg',
    alt: 'twitter',
  },
  {
    id: 2,
    title: 'Telegram',
    link: 'https://t.me/bird2836',
    image: '/builder/tele_icon.svg',
    alt: 'telegram',
  },
];

const Footer = (): React.JSX.Element => {
  const router = useRouter();
  const {scrollTo} = useScrollTo();
  return <div className={`${s.footer}`} style={{ backgroundImage: 'url(/public-sale/bg_footer.png)' }}>
    <div className={'container'}>
      <div className={`${s.footerContent}`}>
        <h2 className={s.heading}>
          <Chars>
            Ready to launch the next big Bitcoin L2?
          </Chars>
        </h2>
        <Fade className={s.btn}>
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'41px'}
            py={'14px'}
            w={['172px']}
            h={'48px'}
            fontWeight={400}
            marginTop={'24px'}
            fontSize={'16px'}
            onClick={() => {
              scrollTo();
              // router.push('/blockchains/customize');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Build Your Bitcoin L2
          </Button>
        </Fade>
      </div>

      <div className={`${s.footerSocial}`}>
        <div className={s.footerSocial_title}>
          Have question? Get in touch with our team member
        </div>
        <div className={s.footerSocial_inner}>
          {
            dataSocial.map((item, index) => (
              <a href={item.link} key={item.id} target={'_blank'}>
                <Fade delay={index / 5}>
                  <div className={`${s.footerSocialItem}`}>
                    <div>
                      <img src={item.image} width={23} alt={item.alt} />
                    </div>
                    <Text>{item.title}</Text>
                  </div>
                </Fade>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  </div>;
};

export default Footer;
