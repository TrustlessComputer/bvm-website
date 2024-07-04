import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function GroupProducts(): ReactElement {

  return <div className={s.groupProduction}>
    <div className={s.inner}>
      <div className={s.left}>
        {/*<div className={s.group}>*/}
        {/*  <h4 className={s.title}>By Chain</h4>*/}
        {/*  <ul className={`${s.group_inner} ${s.isFlex}`}>*/}
        {/*    <li className={s.isDisabled}>*/}
        {/*      <Link href={'/module/zk-rollup'} className={s.group_item_icon}>*/}
        {/*        <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/brc-20bridge.png"*/}
        {/*               alt="menu-icon-avail" />*/}
        {/*        <div className={s.group_item_icon_text}>*/}
        {/*          <span className={s.group_item_icon_text_title}>Bitcoin</span>*/}
        {/*          <span className={s.group_item_icon_text_bottom}>Roll up to Bitcoin as Ordinal Inscriptions</span>*/}
        {/*        </div>*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li className={s.isDisabled}>*/}
        {/*      <Link href={'/module/pptimistic-rollups'} className={s.group_item_icon}>*/}
        {/*        <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/ethereumbridge.png"*/}
        {/*               alt="menu-icon-op" />*/}
        {/*        <div className={s.group_item_icon_text}>*/}
        {/*          <span className={s.group_item_icon_text_title}>Ethereum</span>*/}
        {/*          <span className={s.group_item_icon_text_bottom}>Embed proofs in Taproot transactions</span>*/}
        {/*        </div>*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
        <div className={s.group}>
          <h4 className={s.title}>By Business model</h4>
          <ul className={`${s.group_inner} ${s.isFlex}`}>
            <li className={s.isDisabled}>
              <Link href={'/module/bvm-celestia'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoincelestia.png"
                       alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Appchains</span>
                  <span className={s.group_item_icon_text_bottom}>Roll up to Bitcoin as Ordinal Inscriptions</span>
                </div>
              </Link>
            </li>
            <li className={s.isDisabled}>
              <Link href={'/module/bvm-eigen'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcoineigen.png"
                       alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Ecosystems</span>
                  <span
                    className={s.group_item_icon_text_bottom}>Embed proofs in Taproot transactions</span>
                </div>
              </Link>
            </li>

          </ul>
        </div>
        <div className={s.group}>
          <h4 className={s.title}>By use case</h4>
          <ul className={`${s.group_inner} ${s.isFlex}`}>
            <li>
              <Link href={'/defi'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/ic-defi.png"
                       alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>DeFi</span>
                  <span className={s.group_item_icon_text_bottom}>Bridge BTC to your rollup</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/gamefi'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/bitcointaproot.png"
                       alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Gaming</span>
                  <span className={s.group_item_icon_text_bottom}>Bridge ETH to you rollup</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'https://eternalai.org/'} target={'_blank'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/ic-ai.png"
                       alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>AI</span>
                  <span className={s.group_item_icon_text_bottom}>Bridge BRC-20 tokens to your rollup</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/socialfi'} className={s.group_item_icon}>
                <Image width={48} height={48} sizes="100vw" quality="100" src="/bvm/ic-social.png"
                       alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Social</span>
                  <span className={s.group_item_icon_text_bottom}>Bridge Runes ro your rollup</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>;
}
