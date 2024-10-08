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
        <Box
          ml={{ base: '20px', '2xl': 'calc((100vw - 1480px) / 2)' }}
          mt={'80px'}
        >
          <BuildItem stagger={0} iconUrl="/landing-v5/ic-bvm.svg">
            <Box
              className={cn(s.introduction)}
              mr={{ base: '0px', '2xl': 'calc((100vw - 1480px) / 2)' }}
              pr="20px"
            >
              <Box flex="1">
                <div className={s.introduction_title}>
                  Development infrastructure for Bitcoin
                </div>
                <div className={s.introduction_desc}>
                  Bitcoin Virtual Machine (BVM) is Bitcoin’s most comprehensive
                  development platform, offering builders over 30 products and
                  services for building on Bitcoin. From scaling technologies
                  like ZK rollups and Data Availability layers to emerging
                  technologies like L1 metaprotocols and GPU-accelerated VMs,
                  BVM equips you with the tools to push the boundaries of what's
                  possible on Bitcoin.
                  {/* <br />
                  <br /> Let’s build. */}
                </div>
              </Box>
              <Box className={s.introduction_links}>
                <div className={s.link_item}>
                  <div className={s.link_ic}>
                    <ChakraImage
                      src="/landing-v5/avatar-dev-1.png"
                      w="48px"
                      h="48px"
                    />
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
                      Visit Bitcoin App Store
                      <div className={s.icon_link}>
                        <ChakraImage src="/landing-v5/ic-link.svg" />
                      </div>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </BuildItem>
          <BuildItem stagger={1}>
            <SectionBlock {...STEP_1_SECTION} spacing="126px" />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-2.svg">
            <SectionBlock
              {...STEP_2_SECTION}
              spacing={{ base: '100px', md: '185px' }}
            />
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-step-3.svg">
            <Box>
              <div className={s.tag}>
                Launch your own{' '}
                <Text as="span" color="#fff">
                  {' '}
                  apps.
                </Text>
              </div>
              <Box
                mb="40px"
                className={s.desc}
                whiteSpace={{ base: 'auto', '2xl': 'nowrap' }}
              >
                BVM is EVM-compatible. Easily port your Solidity dapps to
                Bitcoin or build new ones on Bitcoin from scratch.{' '}
                <Link
                  href="https://docs.bvm.network/bvm/getting-started/deploy-your-own-bitcoin-dapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange flex-link"
                >
                  Read developer docs
                  <div className={s.icon_link}>
                    <ChakraImage src="/landing-v5/ic-link.svg" />
                  </div>
                </Link>
              </Box>
              <Box
                mb={{ base: '100px', xl: '176px' }}
                position={'relative'}
                aspectRatio={'1348 / 1031'}
                maxW={{ base: '98%', xl: '68%' }}
              >
                <Image
                  layout="fill"
                  src="/landing-v5/home-step-3a.png"
                  alt="home-step3"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </BuildItem>
          <BuildItem iconUrl="/landing-v5/ic-stack.svg">
            <Box mb="125px">
              <span className={s.tag}>Powered by</span>
              <span className={s.title}> the best crypto tech.</span>
              <div className={s.desc}>
                BVM partners with top crypto projects to create a fully
                integrated suite of Bitcoin products, offering the widest and
                deepest functionality across rollups, data layers, and more —
                all on Bitcoin.
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
                Bring your vision to life with our drag-and-drop tool. No coding
                expertise needed — just your next big idea.
              </div>
              <Flex alignItems={'center'} gap="20px" flexWrap={'wrap'}>
                <Link
                  href="/build-bitcoin"
                  className={cn(s.cta_btn, s.primary)}
                >
                  Open BVM Studio
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
