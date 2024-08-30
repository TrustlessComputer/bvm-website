import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function GroupProducts(): ReactElement {
  return (
    <div className={s.groupProduction}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.group}>
            <h4 className={s.title}>By technology</h4>
            <ul className={`${s.group_inner} ${s.isFlex}`}>
              <li>
                <Link href={'/module/bitzk'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/bitcoinzeroknowledge.png"
                    alt="menu-icon-bvm"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>
                      ZK Stack
                    </span>
                    <span className={s.group_item_icon_text_bottom}>
                      Enhance scalability, reduce fees, and offer flexible data
                      storage
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={'/module/bitop'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/bitcoinoptimistic.png"
                    alt="menu-icon-op"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>
                      Optimistic Stack
                    </span>
                    <span className={s.group_item_icon_text_bottom}>
                      Lower costs and boost scalability. Efficient scaling with
                      minimal transaction delays
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className={s.group}>
            <h4 className={s.title}>By Business model</h4>
            <ul className={`${s.group_inner} ${s.isFlex}`}>
              <li>
                <Link href={'/appchains'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/ic-app.png"
                    alt="menu-icon-cel"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>
                      Appchains
                    </span>
                    <span className={s.group_item_icon_text_bottom}>
                      Build a customizable appchain aligned with your product
                      roadmap
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={'/ecosystems'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/ic-eco.png"
                    alt="menu-icon-avail"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>
                      Ecosystems
                    </span>
                    <span className={s.group_item_icon_text_bottom}>
                      Deploy a fully functional blockchain ecosystem
                    </span>
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
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/ic-defi.png"
                    alt="menu-icon-cel"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>DeFi</span>
                    <span className={s.group_item_icon_text_bottom}>
                      Make DeFi on Bitcoin possible and accessible to everyone
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={'/gamefi'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/bitcointaproot.png"
                    alt="menu-icon-avail"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>Gaming</span>
                    <span className={s.group_item_icon_text_bottom}>
                      Shape the future of gaming on Bitcoin
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={'https://eternalai.org/'}
                  target={'_blank'}
                  className={s.group_item_icon}
                >
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/ic-ai.png"
                    alt="menu-icon-avail"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>AI</span>
                    <span className={s.group_item_icon_text_bottom}>
                      Road to fully on-chain AI
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={'/socialfi'} className={s.group_item_icon}>
                  <Image
                    width={48}
                    height={48}
                    sizes="100vw"
                    quality="100"
                    src="/bvm/ic-social.png"
                    alt="menu-icon-avail"
                  />
                  <div className={s.group_item_icon_text}>
                    <span className={s.group_item_icon_text_title}>Social</span>
                    <span className={s.group_item_icon_text_bottom}>
                      Build your social app your way
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
