'use client';

import s from './styles.module.scss';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';
import copy from 'copy-to-clipboard';
// import { Box, Container, Stack, Text } from '@chakra-ui/react';
import cn from 'classnames';
import toast from 'react-hot-toast';
import { MenuBuild } from '../HeaderV2/menuConfig';
import SvgInset from '@/components/SvgInset';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  // return (
  //   <Box bgColor={'black'} id="footer">
  //     <Container
  //       as={Stack}
  //       maxW={'2xl'}
  //       py={4}
  //       direction={{ base: 'column', md: 'row' }}
  //       spacing={4}
  //       justify={{ base: 'center', md: 'center' }}
  //       align={{ base: 'center', md: 'center' }}
  //     >
  //       {/* <Text>OPEN-SOURCE SOFTWARE. MADE WITH ❤️ ON BITCOIN.</Text> */}
  //       {/* <Stack direction={'row'} spacing={6}></Stack> */}
  //     </Container>
  //   </Box>
  // );

  return (
    <div className={s.wrapper}>
      <div
        className={`${s.footer}`}
        style={{ backgroundImage: 'url(/footer/bgFooter.png)' }}
      >
        <div className="containerV3">
          <div className={s.main}>
            <div className={s.main_top}>
              <div className={s.main_top_left}>
                <p className={s.mainContent}>
                  Experience Bitcoin like never before.
                </p>
                <div>
                  <div className={s.footer_wrapBtns}>
                    <div className={s.dropMenu}>
                      <p className={cn(s.footer_btn)}>Build on Bitcoin</p>
                      <ul className={s.dropMenu_list}>
                        {MenuBuild?.subMenu.map((item, index) => {
                          return (
                            <li
                              className={s.listItem}
                              key={`${item.label}-${index}`}
                            >
                              <a
                                href={item.href}
                                target={item?.isNewWindow ? '_blank' : '_self'}
                                style={{ color: 'black' }}
                              >
                                {item.label}
                                <SvgInset
                                  svgUrl={`landing/images/basil_arrow-up-outline.svg`}
                                />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={'#'}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className={s.footer_video}
              >
                <Image
                  src={`/public-sale/btn-play-3.png`}
                  width={224}
                  height={120}
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
          </div>
          <div className={s.footer_line}></div>
          {/* <p
            className={s.footer_contract}
            onClick={() => {
              toast.success('Successfully copied.');
              copy('0x069d89974f4edabde69450f9cf5cf7d8cbd2568d');
            }}
          >
            <span>BVM token contract:</span>{' '}
            0x069d89974f4edabde69450f9cf5cf7d8cbd2568d
          </p> */}
          <div className={s.links}>
            {/* <Link
              href={
                'https://etherscan.io/address/0x069d89974f4edabde69450f9cf5cf7d8cbd2568d'
              }
              target="_blank"
            >
              <p className={s.links_item}>ETHERScan</p>
            </Link> */}
            <Link href={'https://twitter.com/BVMnetwork'} target="_blank">
              <p className={s.links_item}>twitter</p>
            </Link>
            <Link href={'https://t.me/BVMofficialcommunity'} target="_blank">
              <p className={s.links_item}>telegram</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
