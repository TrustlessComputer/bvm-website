import React from 'react';
import s from './styles.module.scss'
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';

const dataSocial = [
  {
    id: 0,
    title: 'Developer guides',
    link: 'https://docs.bvm.network/bvm/',
    image: '/public-sale/iconTopRight.svg',
    alt: 'bvm'
  },
  {
    id: 1,
    title: 'Twitter',
    link: 'https://twitter.com/BVMnetwork',
    image: '/public-sale/tw_footer.svg',
    alt: 'twitter'
  },
  {
    id: 2,
    title: 'Telegram',
    link: 'https://t.me/bird2836',
    image: '/public-sale/tele.svg',
    alt: 'telegram'
  }
]

const Footer = (): React.JSX.Element => {
  const router = useRouter();
  return <div className={`${s.footer}`} style={{backgroundImage: 'url(/public-sale/bg_footer.png)'}}>
    <div className={'container'}>
      <div className={`${s.footerContent}`}>
        <h2 className={s.heading}>
          <Chars>
            Ready to launch the next big Bitcoin L2?
          </Chars>
        </h2>
        <Fade>
          <Button
            bgColor={'#EF601B'}
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
              router.push('/blockchains/customize');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Launch now
          </Button>
        </Fade>
      </div>
      <div className={`${s.footerSocial}`}>
        {
          dataSocial.map((item, index) => (
            <a href={item.link} key={item.id} target={'_blank'}>
              <Fade delay={index / 5}>
              <div className={`${s.footerSocialItem}`}>
                <Text>{item.title}</Text>
                <div>
                  <img src={item.image} width={23} alt={item.alt} />
                </div>
              </div>
              </Fade>
            </a>
          ))
        }
      </div>
    </div>
  </div>
}

export default Footer;
