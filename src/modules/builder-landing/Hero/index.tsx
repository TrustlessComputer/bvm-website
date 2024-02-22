import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import classNames from 'classnames';
import IConContent from '@/modules/builder-landing/IconContent';
import BoxParallaxMouseMove from '@/interactive/MouseMove';
import { useRouter } from 'next/navigation';
import { CDN_URL, CDN_URL_VIDEOS } from '@/config';
import SvgInset from '@/components/SvgInset';

export default function BuilderHero() {
  const router = useRouter();
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
                  <img src="/builder/hero-icon-1.png" alt="hero-icon-1.png" />
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
                  <img src="/builder/hero-icon-3.png" alt="hero-icon-1.png" />
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
                  <img src="/builder/hero-icon-4.png" alt="hero-icon-1.png" />
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
                  <img src="/builder/hero-icon-2.png" alt="hero-icon-1.png" />
                </BoxParallaxMouseMove>
              </Fade>
            </li>
          </ul>
          <Fade>
            <span className={s.label}>Feb 21, 2024 - May 21, 2024</span>
          </Fade>
          <Chars>
            <h1 className={s.heading}>
              The BVM Builder Program: Launch the next big Bitcoin L2
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
                    router.push('/blockchains/customize');
                  }}
                  className={classNames(s.btn, s.btn__red)}
                >
                  Try for free
                </button>
              </Fade>
            </li>
            <li className={s.item_details}>
              <Fade from={{ y: 10 }} to={{ y: 0 }} delay={1.2}>
                <div className={s.item_details_inner}>
                  <p className={s.item_details_inner_text}>What is BVM</p>
                  <span className={s.item_details_inner_svg}>
                    <SvgInset svgUrl="/builder/arr-r.svg" height={24} />
                  </span>
                </div>
              </Fade>
              <Fade from={{ y: 10 }} to={{ y: 0 }} delay={1.4}>
                <div className={s.item_details_inner}>
                  <p className={s.item_details_inner_text}>Developer guides</p>
                  <span className={s.item_details_inner_svg}>
                    <SvgInset svgUrl="/builder/arr-r.svg" height={24} />
                  </span>
                </div>
              </Fade>
            </li>
          </ul>
        </div>
        <ul className={s.extends}>
          <li className={s.exItem}>
            <Fade delay={1.2}>
              <IConContent icon={'builder/game-icons_incoming-rocket.svg'}>
                BE A PIONEER TO SHAPE THE <br /> FUTURE OF BITCOIN
              </IConContent>
            </Fade>
          </li>
          <li className={s.exItem}>
            <Fade delay={1}>
              <IConContent
                icon={'builder/bitcoin-icons_node-1-connection-outline.svg'}
              >
                CONNECT WITH INVESTORS
              </IConContent>
            </Fade>
          </li>
          <li className={s.exItem}>
            <Fade delay={1.3}>
              <IConContent icon={'builder/mingcute_usd-coin-usdc-line.svg'}>
                EARN THE BVM AIRDROP
              </IConContent>
            </Fade>
          </li>
        </ul>
      </div>
    </div>
  );
}
