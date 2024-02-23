import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import IConContent from '@/modules/builder-landing/IconContent';
import BitEth from '@/modules/landing/Componets/BitEth';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';

export default function Started() {
  return (
    <>
      <div className={s.started}>
        <div className={`container ${s.started_container}`}>
          <HeadingSection className={s.heading}>
            <Chars delay={0.2}>
              It’s simple to get started
            </Chars>
          </HeadingSection>
          {/*<Chars classNames={s.wrapHeading}>*/}
          {/*  <h1 className={s.heading}>It’s simple to get started</h1>*/}
          {/*</Chars>*/}
          <ul className={s.extends}>
            <li className={s.exItem}>
              <Fade delay={0.1}>
                <IConContent
                  step={1}
                  link={'/blockchains/customize'}
                  icon={'builder/icon-step-1.svg'}
                >
                  Launch BTC L2 in a few clicks.
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.2}>
                <IConContent step={2} icon={'builder/icon-step-2.svg'}>
                  Deploy or Migrate your EVM dapps effortlessly.
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.3}>
                <IConContent step={3} icon={'builder/icon-step-3.svg'}>
                  Grow user base.
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.4}>
                <IConContent
                  step={4}
                  icon={'builder/mingcute_usd-coin-usdc-line.svg'}
                >
                  Earn BVM airdrop.
                </IConContent>
              </Fade>
            </li>
          </ul>

          {/*<Fade>*/}
          {/*  <div className={s.lbContent}>*/}
          {/*    BVM allows Ethereum developers to migrate their Solidity smart contracts and dApps from Ethereum to Bitcoin*/}
          {/*    with minimal or no modifications.*/}
          {/*  </div>*/}
          {/*</Fade>*/}
        </div>
      </div>
      <BitEth />
    </>
  );
}
