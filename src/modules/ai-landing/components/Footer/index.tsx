'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import Button from '../Button';
import HomeContainer from '../HomeContainer';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { NavItem } from '@layouts/Header/menuConfig';
import Link from 'next/link';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';

export const FOOTER_LINK: Array<NavItem> = [
  {
    label: 'USE AI',
    href: '/use',
    isNewWindow: false,
  },
  {
    label: 'BUILD AI',
    href: '/build',
    isNewWindow: false,
  },
  {
    label: 'Scan',
    isTwitter: false,
    href: 'https://testnet.eternalai.org',
    icon: '/ai-landing/explorer_grey_ic.svg',
    isNewWindow: true,
  },
  {
    label: 'Twitter',
    isTwitter: false,
    href: 'https://twitter.com/@CryptoEternalAI',
    icon: '/ai-landing/explorer_grey_ic.svg',
    isNewWindow: true,
  },
];

const Footer = () => {
  const router = useRouter();
  return (
    <div className={`${s.footer}`}>
      <div style={{ backgroundImage: `url: (/ai-landing/bgFooter.png)` }}>
        <HomeContainer>
          <div className={`${s.mainContent}`}>
            <ImagePlaceholder
              src={'/ai-landing/logoFooter.png'}
              alt={'logoFooter'}
              width={15}
              height={15}
              className={`${s.logo}`}
            />
            <p className={`${s.title}`}>ETERNAL AI</p>
            <p className={`${s.description}`}>
              Eternal AI is a Bitcoin L2 powering programmable and composable
              real-life AI models on Bitcoin
            </p>
            <div className={`${s.wrapperBtn}`}>
              <Button isWhite onClick={()=>{
                router.push('/build')
                // window.open('https://nakachain.xyz/launchpad')
              }} className={`${s.wrapperBtn_btn}`}>
                {/*Launchpad*/}
                Build AI
              </Button>
              <Button onClick={()=>{
                router.push('/use')
              }} className={`${s.wrapperBtn_btn}`}>
                Use AI
                {/*Give it a try*/}
              </Button>
            </div>
          </div>
        </HomeContainer>
      </div>
      <div className={`${s.wrapperLink}`}>
        {FOOTER_LINK.map((navItem, index) => {
          return (
            <Link
              key={navItem.label}
              href={navItem.href ?? '#'}
              target={navItem.isNewWindow ? '_blank' : '_self'}
              color={'white'}
            >
              <Flex flexDir={'row'} align={'center'} gap={'4px'}>
                <Text
                  textAlign={'center'}
                  fontSize={['14px', '14px']}
                  lineHeight={'110%'}
                  fontWeight={navItem?.isLogoWebsite ? 800 : 500}
                  color={'white'}
                  textStyle="third"
                  textTransform={'uppercase'}
                  _hover={{}}
                >
                  {navItem.label}
                </Text>
                {navItem.icon && (
                  <Image src={`${navItem.icon}`} width={7} height={7}></Image>
                )}
              </Flex>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
