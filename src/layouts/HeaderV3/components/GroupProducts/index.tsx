import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function GroupProducts(): ReactElement {

  return <div className={s.groupProduction}>
    <div className={s.inner}>
      <div className={s.left}>
        <div className={s.group}>
          <h4 className={s.title}>Rollups</h4>
          <ul className={s.group_inner}>
            <li>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinzeroknowledge.png" alt="menu-icon-bvm" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Zero Knowledge (BitZK)</span>
                  <span className={s.group_item_icon_text_bottom}>ZK rollups on Bitcoin</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinoptimistic.png" alt="menu-icon-op" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Optimistic (BitOP)</span>
                  <span className={s.group_item_icon_text_bottom}>Optimistic rollups on Bitcoin</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.group}>
          <h4 className={s.title}>DaTA Availability</h4>
          <ul className={`${s.group_inner} ${s.isFlex}`}>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoincelestia.png" alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Celestia</span>
                  <span className={s.group_item_icon_text_bottom}>Use Celestia with Bitcoin rollups</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoineigen.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Eigen DA</span>
                  <span
                    className={s.group_item_icon_text_bottom}>A data availability store made by the EigenLayer team</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinavail.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Avail</span>
                  <span className={s.group_item_icon_text_bottom}>Use Avail with Bitcoin rollups</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinnear.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Near DA</span>
                  <span className={s.group_item_icon_text_bottom}>An efficient and robust data avalability layer made by the Near team</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinpolygon.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Polygon</span>
                  <span className={s.group_item_icon_text_bottom}>Use Polygon with Bitcoin rollups</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinfilecoin.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Filecoin</span>
                  <span className={s.group_item_icon_text_bottom}>Low-cost decentralized storage</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.group}>
          <h4 className={s.title}>Data validity</h4>
          <ul className={`${s.group_inner} ${s.isFlex}`}>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinordinals.png" alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Ordinals</span>
                  <span className={s.group_item_icon_text_bottom}>Inscribe proofs onto Bitcoin</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcointaproot.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Taproot</span>
                  <span className={s.group_item_icon_text_bottom}>Embed proofs in Taproot transactions</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinstamps.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Stamps</span>
                  <span className={s.group_item_icon_text_bottom}>Stamp proofs proofs in an <br /> unprunable way</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.group}>
          <h4 className={s.title}>INTEROPERABILITY</h4>
          <ul className={`${s.group_inner} ${s.isFlex}`}>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcointaproot.png" alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Bridge</span>
                  <span className={s.group_item_icon_text_bottom}>Bring BTC to your rollup</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/ethereumbridge.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Ethereum Bridge</span>
                  <span className={s.group_item_icon_text_bottom}>Bring ETH to you rollup</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/brc-20bridge.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>BRC-20 Bridge</span>
                  <span className={s.group_item_icon_text_bottom}>Bring BRC-20 tokens to your rollup</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module-detail'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoinordinals.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Runes Bridge</span>
                  <span className={s.group_item_icon_text_bottom}>Bring Runes ro your rollup</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div className={s.right}>
        <div className={s.simpleGroup}>
          <h4 className={s.title}>Solutions</h4>
          <ul className={s.simpleGroup_list}>
            <li className={s.simpleGroup_link}>
              <Link href={'/defi'}>Bitcoin rollups for DeFi</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'/gamefi'}>Bitcoin rollups for Gaming</Link>
            </li>
            <li className={s.simpleGroup_link}>
            <Link href={'/socialfi'}>Bitcoin rollups for SocialFi</Link>
            </li>
          </ul>
        </div>
        <div className={s.simpleGroup}>
          <h4 className={s.title}>Developers</h4>
          <ul className={s.simpleGroup_list}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/create-a-zk-powered-blockchain'} target={'_blank'}>Launch
                a Bitcoin ZK rollup</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/connect-to-zk-powered-blockchains'}
                    target={'_blank'}>Connect to a Bitcoin ZK rollup</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/build-your-first-bitcoin-dapps'} target={'_blank'}>Build
                your first Bitcoin dapps</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>;
}
