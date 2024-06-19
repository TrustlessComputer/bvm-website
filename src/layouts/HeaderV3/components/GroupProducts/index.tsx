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
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-bvm.png" alt="menu-icon-bvm" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Zero Knowledge (BitZK)</span>
                  <span className={s.group_item_icon_text_bottom}>ZK rollups on Bitcoin</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-op.png" alt="menu-icon-op" />
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
          <ul className={s.group_inner}>
            <li>
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-cel.png" alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Celestia</span>
                  <span className={s.group_item_icon_text_bottom}>Use Celestia for DA</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-avail.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Avail</span>
                  <span className={s.group_item_icon_text_bottom}>Use Avail for DA</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.group}>
          <h4 className={s.title}>Data validity</h4>
          <ul className={s.group_inner}>
            <li>
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-cel.png" alt="menu-icon-cel" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Ordinals</span>
                  <span className={s.group_item_icon_text_bottom}>Use Ordinals for DV</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/#'} className={s.group_item_icon}>
                <Image width={48} height={48} src="/menu-icons/menu-icon-avail.png" alt="menu-icon-avail" />
                <div className={s.group_item_icon_text}>
                  <span className={s.group_item_icon_text_title}>Bitcoin Stamps</span>
                  <span className={s.group_item_icon_text_bottom}>Use Bitcoin Stamps for DV</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.right}>
        <div className={s.simpleGroup}>
          <h4 className={s.title}>Rollups</h4>
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
