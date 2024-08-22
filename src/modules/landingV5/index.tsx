import { Box, Flex, Text, Image as ChakraImage } from '@chakra-ui/react';
import BuildItem from './components/BuildItem';
import s from './styles.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import SectionBlock from './components/SectionBlock';

import Image from 'next/image';
import {
  STEP_1_SECTION,
  NEWS_SECTION,
  APPS_SECTION,
  OPENSOURCE_SECTION,
  RESEARCH_SECTION,
  TECH_STACKS,
  STEP_2_SECTION,
} from '@/constants/home-content';
import { motion } from 'framer-motion';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

type Props = {};

const LandingV5 = (props: Props) => {
  const { showContactUsModal } = useContactUs();

  return (
    <div className={s.landing}>
      <Box>
        <div className={cn(s.introduction, 'containerV3')}>
          <Box
            flex="1"
            as={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 1,
              },
            }}
          >
            <div className={s.introduction_title}>
              Development infrastructure for Bitcoin
            </div>
            <div className={s.introduction_desc}>
              Join the next generation of Bitcoin builders who use the BVM
              infrastructure to deploy Bitcoin chains, build Bitcoin apps, and
              together bring Bitcoin to the people.
              <br />
              <br /> Let’s build.
            </div>
          </Box>
          <Box
            className={s.introduction_links}
            as={motion.div}
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 1,
              },
            }}
          >
            <div className={s.link_item}>
              <div className={s.link_ic}>
                <ChakraImage src="/landing-v5/ic-headphone.svg" />
              </div>
              <Flex gap="4px" flexDir={'column'}>
                <p>Need development help?</p>
                <Box
                  onClick={showContactUsModal}
                  className={s.link}
                  cursor="pointer"
                >
                  Talk to a BVM dev
                  <div className={s.icon_link}>
                    <ChakraImage src="/landing-v5/ic-link.svg" />
                  </div>
                </Box>
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
          <BuildItem stagger={1}>
            <SectionBlock {...STEP_1_SECTION} spacing="160px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-2.svg">
            <SectionBlock {...STEP_2_SECTION} spacing="185px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-3.svg">
            <Box>
              <div className={s.tag}>
                Build your own{' '}
                <Text as="span" color="#fff">
                  {' '}
                  apps.
                </Text>
              </div>
              <Box mb="40px" className={s.desc}>
                Build custom applications tailored to your needs, powered by
                smart contracts. BVM is EVM compatible, allowing you to
                seamlessly integrate Etherum applications into your Bitcoin
                chain.
              </Box>
              <Box
                mb="176px"
                position={'relative'}
                aspectRatio={'1348 / 1031'}
                maxW={'60%'}
              >
                <Image
                  layout="fill"
                  src="/landing-v5/home-step-3.png"
                  alt="home-step3"
                  objectFit="cover"
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
                    className={cn(s.tech_block, {
                      ['pointer-none']: !tech.link.url,
                    })}
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
            <SectionBlock {...RESEARCH_SECTION} spacing="119px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-opensource.svg">
            <SectionBlock {...OPENSOURCE_SECTION} />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-news.svg">
            <SectionBlock {...NEWS_SECTION} spacing="119px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-puzzle.svg" lastItem>
            <div className={s.last_section}>
              <div className={s.title}>Start building</div>
              <div className={s.desc}>
                Ready to dive in? Visit Bitcoin RaaS Studio to begin creating
                your own chains on Bitcoin. Build, innovate, and lead the way.
              </div>
              <Flex alignItems={'center'} gap="20px" flexWrap={'wrap'}>
                <Link
                  href="/build-bitcoin"
                  className={cn(s.cta_btn, s.primary)}
                >
                  Open Bitcoin Studio
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
