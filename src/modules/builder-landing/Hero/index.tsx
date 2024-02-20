import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import classNames from 'classnames';
import IConContent from '@/modules/builder-landing/IconContent';
import BoxParallaxMouseMove from '@/interactive/MouseMove';

export default function BuilderHero() {
  return <div className={s.builderHero}>
    <div className={`container ${s.builderHero_container}`}>

      <div className={s.topContent}>
        <ul className={s.listIcons}>
          <li className={s.icon}>
            <Fade from={{ filter: 'blur(0.15em)' }} to={{ filter: 'blur(0em)' }} delay={.4}>
              <BoxParallaxMouseMove offset={.15}>
                <img src='/builder/hero-icon-1.png' alt='hero-icon-1.png' />
              </BoxParallaxMouseMove>
            </Fade>
          </li>
          <li className={s.icon}>
            <Fade from={{ filter: 'blur(0.15em)' }} to={{ filter: 'blur(0em)' }} delay={.6}>
              <BoxParallaxMouseMove offset={.2}>
                <img src='/builder/hero-icon-2.png' alt='hero-icon-1.png' />
              </BoxParallaxMouseMove>
            </Fade>
          </li>
          <li className={s.icon}>
            <Fade from={{ filter: 'blur(0.15em)' }} to={{ filter: 'blur(0em)' }} delay={.8}>
              <BoxParallaxMouseMove offset={.25}>
                <img src='/builder/hero-icon-3.png' alt='hero-icon-1.png' />
              </BoxParallaxMouseMove>
            </Fade>

          </li>
          <li className={s.icon}>
            <Fade from={{ filter: 'blur(0.15em)' }} to={{ filter: 'blur(0em)' }} delay={1}>
              <BoxParallaxMouseMove offset={.1}>
                <img src='/builder/hero-icon-4.png' alt='hero-icon-1.png' />
              </BoxParallaxMouseMove>
            </Fade>
          </li>
        </ul>
        <Fade>
          <span className={s.label}>Feb 21, 2024 - May 21, 2024</span>
        </Fade>
        <Chars>
          <h1 className={s.heading}>
            The BVM Builder Program:
            Launch the next big Bitcoin L2
          </h1>
        </Chars>
        <Lines>
          <div className={s.desc}>
            Bitcoin L2 chains are thriving. This is your chance to get in front of 2,721 backers and 50k supporters.
            Launch the next big one here.
          </div>
        </Lines>
        <ul className={s.actions}>
          <li className={s.item}>
            <Fade delay={1}>
              <button className={classNames(s.btn, s.btn__red)}>
                Launch now
              </button>
            </Fade>
          </li>
        </ul>
      </div>
      <ul className={s.extends}>
        <li className={s.exItem}>
          <Fade delay={1.2}>
            <IConContent icon={'builder/game-icons_incoming-rocket.svg'}>
              BE A PIONEER TO SHAPE THE <br/> FUTURE OF BITCOIN
            </IConContent>
          </Fade>
        </li>
        <li className={s.exItem}>
          <Fade delay={1.4}>
            <IConContent icon={'builder/bitcoin-icons_node-1-connection-outline.svg'}>
              CONNECT WITH INVESTORS
            </IConContent>
          </Fade>
        </li>
        <li className={s.exItem}>
          <Fade delay={1.6}>
            <IConContent icon={'builder/mingcute_usd-coin-usdc-line.svg'}>
              EARN THE BVM AIRDROP
            </IConContent>
          </Fade>
        </li>
      </ul>
    </div>

  </div>;
}
