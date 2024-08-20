import { Box, Flex, Text, Image as ChakraImage } from '@chakra-ui/react';
import BuildItem from './components/BuildItem';
import s from './styles.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import SectionBlock from './components/SectionBlock';
import {
  APPS_SECTION,
  NEWS_SECTION,
  OPENSOURCE_SECTION,
  RESEARCH_SECTION,
  TECH_STACKS,
} from '@/constants/home-content';
import Image from 'next/image';

type Props = {};

const LandingV5 = (props: Props) => {
  return (
    <div className={s.landing}>
      <Box>
        <div className={cn(s.introduction, 'containerV3')}>
          <Box flex="1">
            <div className={s.introduction_title}>
              Development infrastructure for Bitcoin
            </div>
            <div className={s.introduction_desc}>
              Join the next generation of Bitcoin builders who use the BVM
              infrastructure to deploy Bitcoin chains, build Bitcoin apps, and
              together bring Bitcoin to the people. Let’s build.
            </div>
          </Box>
          <Box className={s.introduction_links}>
            <div className={s.link_item}>
              <div className={s.link_ic}>
                <ChakraImage src="/landing-v5/ic-headphone.svg" />
              </div>
              <Flex gap="4px" flexDir={'column'}>
                <p>Need development help?</p>
                <Link href="/" className={s.link}>
                  Talk to a BVM dev
                  <div className={s.icon_link}>
                    <ChakraImage src="/landing-v5/ic-link.svg" />
                  </div>
                </Link>
              </Flex>
            </div>
            <Box mt={'24px'} className={s.link_item}>
              <div className={s.link_ic}>
                <ChakraImage src="/landing-v5/ic-appstore.svg" />
              </div>
              <Flex gap="4px" flexDir={'column'}>
                <p>Experience Bitcoin apps</p>
                <Link href="/explore" className={s.link}>
                  Visit bitcoin App Store
                  <div className={s.icon_link}>
                    <ChakraImage src="/landing-v5/ic-link.svg" />
                  </div>
                </Link>
              </Flex>
            </Box>
          </Box>
        </div>
        <Box ml={{ base: '20px', '2xl': 'calc((100vw - 1480px) / 2)' }}>
          <BuildItem>
            <SectionBlock {...APPS_SECTION} spacing="147px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-2.svg">
            <SectionBlock {...APPS_SECTION} spacing="147px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-3.svg">
            <Box>
              <div className={s.tag}>Build your own apps.</div>
              <Box mb="40px" className={s.desc}>
                Build custom applications tailored to your needs, powered by
                smart contracts. BVM provides the tools to develop powerful,
                personalized apps that enhance your Bitcoin chain’s
                functionality and drive innovation.
              </Box>
              <Box
                mb="176px"
                position={'relative'}
                aspectRatio={'1348 / 1031'}
                maxW={'70%'}
              >
                <Image
                  layout="fill"
                  src="/landing-v5/home-step3.png"
                  alt="home-step3"
                />
              </Box>
            </Box>
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-stack.svg">
            <Box mb="125px">
              <p className={s.tag}>Powered by</p>
              <p className={s.title}>the best blockchain tech.</p>
              <div className={s.desc}>
                Build your blockchain with ease using modules from the best
                blockchain technologies.
              </div>
              <Box className={s.tech_wrapper}>
                {TECH_STACKS.map((tech) => (
                  <Link
                    href={tech.link.url}
                    target="_blank"
                    className={s.tech_block}
                    key={tech.title}
                  >
                    <ChakraImage
                      src={tech.logo}
                      alt={`${tech.title}'s logo`}
                      maxW={'44px'}
                    />
                    <p>{tech.title}</p>
                  </Link>
                ))}
              </Box>
            </Box>
          </BuildItem>

          <BuildItem iconUrl="/landing-v5/ic-research.svg">
            <SectionBlock {...RESEARCH_SECTION} />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-opensource.svg">
            <SectionBlock {...OPENSOURCE_SECTION} />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-news.svg">
            <SectionBlock {...NEWS_SECTION} />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-puzzle.svg" lastItem>
            <div className={s.last_section}>
              <div className={s.title}>Start building</div>
              <div className={s.desc}>
                Ready to dive in? Visit Bitcoin RaaS Studio to begin creating
                your own chains on Bitcoin. Build, innovate, and lead the way.
              </div>
              <Flex alignItems={'center'} gap="20px">
                <Link
                  href="/build-bitcoin"
                  className={cn(s.cta_btn, s.primary)}
                >
                  Open Bitcoin RAAS Studio
                </Link>
                <Link
                  href="https://docs.bvm.network/bvm"
                  target="_blank"
                  className={cn(s.cta_btn, s.primary_outline)}
                >
                  <span> Read docs</span>
                </Link>
              </Flex>
            </div>
          </BuildItem>
        </Box>
      </Box>
    </div>
  );
};

export default LandingV5;
