import Lines from '@/interactive/Lines';
import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import classNames from 'classnames';
import Fade from '@/interactive/Fade';
import { useRouter } from 'next/navigation';
import { Button, Flex } from '@chakra-ui/react';
import { MenuBuild } from '@/layouts/Header/menuConfig';
import SvgInset from '@/components/SvgInset';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';


const DELAY = 6;
export default function HeroContent() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const delay = DELAY;
  return (
    <>
      <div className={s.heroContent}>
        <div className={s.heroContent_inner}>
          <Chars delay={DELAY}>
            <h1 className={s.heroContent_heading}> Powerful for developers.
              Fast for everyone.</h1>
          </Chars>
          <div className={s.heroContent_content}>
            <Lines delay={DELAY + .1}>
              Bring blockchain to the people. Solana supports experiences for power users, new consumers, and everyone in
              between.
            </Lines>
          </div>
          <ul className={s.heroContent_actions}>
            <li>
              <Fade from={{ y: 10 }}  to={{ y: 0 }} delay={DELAY + .5}>
                <button onClick={() => {
                  router.push('/use-bitcoin');
                }} className={classNames(s.btn, s.btn__red)}>
                  Use Bitcoin
                </button>
              </Fade>
            </li>
            <li>
              <Fade from={{ y: 10 }}  to={{ y: 0 }} delay={DELAY + .6}>
                {/*<button className={classNames(s.btn, s.btn__white)}>*/}
                {/*  Build on Bitcoin*/}
                {/*</button>*/}
                <div className={classNames( s.dropMenu)}>
                  <button
                    className={classNames(s.btn, s.btn__white,s.buttonBuild)}
                  >
                    Build on Bitcoin
                  </button>
                  <ul className={s.dropMenu_list}>
                    {
                      MenuBuild?.subMenu.map((item) => {
                        return (<li className={s.listItem}>
                          <a href={item.href} target={item?.isNewWindow ? '_blank' : '_self'} style={{ color: 'black' }}>
                            {
                              item.label
                            }
                            <SvgInset svgUrl={`landing/images/basil_arrow-up-outline.svg`} />
                          </a>
                        </li>);
                      })
                    }
                  </ul>
                </div>
              </Fade>
            </li>
            <li>
              <Fade from={{ y: 10 }}  to={{ y: 0 }} delay={DELAY + .7}>
                <a
                  className={classNames(s.btn, s.btn__white, s.btn__play, s.buttonBuild)}
                  href={'#'} onClick={() => setOpen(true)}>
                  Watch the flim
                  <SvgInset svgUrl={`/builder/icon-play.svg`} alt={'right'} />
                </a>
              </Fade>
            </li>
          </ul>
        </div>
      </div>
      <ModalVideo
        channel='custom'
        url={'/public-sale/public_sale_video_2.mp4'}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
