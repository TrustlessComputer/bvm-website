import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import classNames from 'classnames';
import IConContent from '@/modules/builder-landing/IconContent';
import BoxParallaxMouseMove from '@/interactive/MouseMove';
import { useRouter } from 'next/navigation';
import { CDN_URL, CDN_URL_VIDEOS } from '@/config';
import SvgInset from '@/components/SvgInset';
import useScrollTo from '@/modules/builder-landing/useScrollTo';

export default function BuilderHero() {
  const router = useRouter();
  const { scrollTo } = useScrollTo();
  return (
    <div className={s.builderHero}>
      <video
        src={CDN_URL_VIDEOS + '/bg-bulder.mp4'}
        loop
        muted
        playsInline
        autoPlay
      />
      <div className={`container ${s.builderHero_container}`}>
        <div className={s.topContent}>
          <ul className={s.listIcons}>
            <li className={s.icon}>
              <Fade
                from={{ filter: 'blur(0.15em)' }}
                to={{ filter: 'blur(0em)' }}
                delay={0.4}
              >
                <BoxParallaxMouseMove offset={0.15}>
                  <img src="/builder/h-icon-1.jpeg" alt="hero-icon-1.png" />
                </BoxParallaxMouseMove>
              </Fade>
            </li>
            <li className={s.icon}>
              <Fade
                from={{ filter: 'blur(0.15em)' }}
                to={{ filter: 'blur(0em)' }}
                delay={0.6}
              >
                <BoxParallaxMouseMove offset={0.2}>
                  <img src="/builder/h-icon-2.jpeg" alt="hero-icon-1.png" />
                </BoxParallaxMouseMove>
              </Fade>
            </li>
            <li className={s.icon}>
              <Fade
                from={{ filter: 'blur(0.15em)' }}
                to={{ filter: 'blur(0em)' }}
                delay={0.8}
              >
                <BoxParallaxMouseMove offset={0.25}>
                  <img src="/builder/h-icon-3.jpeg" alt="hero-icon-1.png" />
                </BoxParallaxMouseMove>
              </Fade>
            </li>
            <li className={s.icon}>
              <Fade
                from={{ filter: 'blur(0.15em)' }}
                to={{ filter: 'blur(0em)' }}
                delay={1}
              >
                <BoxParallaxMouseMove offset={0.1}>
                  <img src="/builder/h-icon-4.jpeg" alt="hero-icon-1.png" />
                </BoxParallaxMouseMove>
              </Fade>
            </li>
          </ul>
          <Fade>
            <span className={s.label}>FEB 23, 2024 - JUL 23, 2024</span>
          </Fade>
          <Chars>
            <h1 className={s.heading}>
              The Bitcoin L2 Builder Program:
              <br />
              Launch the next big Bitcoin L2 with BVM
            </h1>
          </Chars>
          {/* <Lines>
            <div className={s.desc}>
              Bitcoin L2 chains are thriving. This is your chance to take the
              lead and shape the future of Bitcoin!
            </div>
          </Lines> */}
          <ul className={s.actions}>
            <li className={s.item}>
              <Fade delay={1}>
                <button
                  onClick={() => {
                    scrollTo();
                    // router.push('/rollups/customize');
                  }}
                  className={classNames(s.btn, s.btn__red)}
                >
                  Build Your Bitcoin L2
                </button>
              </Fade>
            </li>
            {/*<li className={s.item_details}>*/}
            {/*  <Fade from={{ y: 10 }} to={{ y: 0 }} delay={1.2}>*/}
            {/*    <div className={s.item_details_inner}>*/}
            {/*      <p className={s.item_details_inner_text}>What is BVM</p>*/}
            {/*      <span className={s.item_details_inner_svg}>*/}
            {/*        <SvgInset svgUrl="/builder/arr-r.svg" height={24} />*/}
            {/*      </span>*/}
            {/*    </div>*/}
            {/*  </Fade>*/}
            {/*  <Fade from={{ y: 10 }} to={{ y: 0 }} delay={1.4}>*/}
            {/*    <div className={s.item_details_inner}>*/}
            {/*      <p className={s.item_details_inner_text}>Developer guides</p>*/}
            {/*      <span className={s.item_details_inner_svg}>*/}
            {/*        <SvgInset svgUrl="/builder/arr-r.svg" height={24} />*/}
            {/*      </span>*/}
            {/*    </div>*/}
            {/*  </Fade>*/}
            {/*</li>*/}
          </ul>
        </div>
        <ul className={s.extends}>
          <li className={s.exItem}>
            <Fade delay={1.2}>
              <IConContent icon={'builder/game-icons_incoming-rocket.png'}>
                BE A PIONEER TO SHAPE THE <br /> FUTURE OF BITCOIN
              </IConContent>
            </Fade>
          </li>
          <li className={s.exItem}>
            <Fade delay={1}>
              <IConContent icon={'builder/game-icons_incoming-rocket_2.png'}>
                CONNECT WITH INVESTORS
              </IConContent>
            </Fade>
          </li>
          <li className={s.exItem}>
            <Fade delay={1.3}>
              <IConContent icon={'builder/game-icons_incoming-rocket_3.png'}>
                EARN THE $BVM AIRDROP
              </IConContent>
            </Fade>
          </li>
        </ul>
      </div>
    </div>
  );
}
