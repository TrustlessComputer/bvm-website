import s from './styles.module.scss';
import Chars from '@/interactive/Chars';
import Fade from '@/interactive/Fade';
import IConContent from '@/modules/builder-landing/IconContent';
import BitEth from '@/modules/landing/Componets/BitEth';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';

export default function Started() {
  return (
    <>
      <div className={s.started} id={'read-doc'}>
        <div className={`container ${s.started_container}`}>
          <HeadingSection className={s.heading}>
            <Chars delay={0.2}>
              It’s easy to get started
            </Chars>
          </HeadingSection>
          <ul className={s.extends}>
            <li className={s.exItem}>
              <Fade delay={0.1}>
                <IConContent
                  step={1}
                  title={'Launch now'}
                  link={'/blockchains/customize'}
                  icon={'builder/step-1.png'}
                >
                  Launch Bitcoin L2 testnet FOR FREE in a few clicks
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.2}>
                <IConContent step={2}
                             lock={true}
                             content={`BVM allows Ethereum developers to migrate their Solidity smart contracts and dApps from
Ethereum to Bitcoin with minimal or no modifications.`}
                             title={'Developer guides'}
                             blank={true}
                             link={'https://docs.bvm.network/bvm/'}
                             icon={'builder/step-2.png'}>
                  Deploy or Migrate your EVM Dapps effortlessly
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.3}>
                <IConContent
                  // title={'Submit Form'}
                  // blank={true}
                  // link={'https://forms.gle/eUbL7nHuTPA3HLRz8'}
                  step={3} icon={'builder/step-3.png'}>
                  Launch your Bitcoin L2 on mainnet
                </IConContent>
              </Fade>
            </li>
            <li className={s.exItem}>
              <Fade delay={0.4}>
                <IConContent
                  step={4}
                  icon={'builder/step-4.png'}
                >
                  Grow TVL and Earn $BVM airdrop
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
      <div>
        <BitEth />
      </div>
    </>
  );
}
