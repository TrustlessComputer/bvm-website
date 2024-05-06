import React, { useMemo } from 'react';
import s from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import cn from 'classnames';
import CardExplore from './CardExplore';
import useWindowSize from '@hooks/useWindowSize';
import Link from 'next/link';

const DATA_MODULES = [
  {
    link: '',
    tags: [
      {
        subTitle: 'Data Validity',
        color: 'FF0420',
      },
      {
        subTitle: 'Data Availability',
        color: '66BCFF',
      },
    ],
    title: 'Ordinals',
    backgroundImg: '',
    decs: 'Roll up to Bitcoin as Ordinals, ensuring the integrity and reliability of data stored on the blockchain.',
    icon: '/landing-v2/logos/ordinals.png',
  },
  {
    link: 'https://twitter.com/0xPolygonEco',
    title: 'Polygon',
    backgroundImg: '',
    target: '_blank',
    icon: '/landing-v2/logos/polygon.png',
    decs: 'Empowering builders to build anything on Bitcoin from DeFi, GameFi, to A.I.',
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
  },
  {
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
    link: 'https://twitter.com/CelestiaOrg',
    title: 'Celestia',
    backgroundImg: '',
    target: '_blank',
    icon: '/landing-v2/logos/celestia.png',
    decs: 'Make it easy for anyone to securely launch their own blockchain.',
  },
  {
    tags: [
      {
        color: 'FF7E21',
        subTitle: 'Rollup protocol',
      },
    ],
    link: 'https://twitter.com/Optimism',
    title: 'Optimism',
    backgroundImg: '',
    icon: '/landing-v2/logos/optimism.png',
    decs: 'Optimistic Rollups allow transactions to be executed off-chain while still leveraging the security of the main chain.',
  },
  {
    link: '',
    title: 'DAO',
    tags: [
      {
        color: '7E7CFF',
        subTitle: 'dApps',
      },
    ],
    backgroundImg: '',
    icon: '/landing-v2/logos/dao.png',
    decs: 'Include a DAO as a pre-installed component in your layer 2 blockchain setup.',
  },

  {
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
    link: 'https://twitter.com/eigen_da',
    target: '_blank',
    title: 'EigenDA',
    backgroundImg: '',
    icon: '/landing-v2/logos/eigenda.png',
    decs: 'Provide low-cost, hyperscale data availability to rollups.',
  },
  {
    tags: [
      {
        color: 'FF0420',
        subTitle: 'Data Validity',
      },
    ],
    link: 'https://twitter.com/Stampchain',
    target: '_blank',
    title: 'Stamps',
    backgroundImg: '',
    icon: '/landing-v2/logos/stamps.png',
    decs: 'Roll up to Bitcoin as Stamps, ensuring perpetual storage that can\'t be altered or lost.',
  },
  {
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
    link: 'https://twitter.com/filecoin',
    target: '_blank',
    title: 'Filecoin',
    backgroundImg: '',
    icon: '/landing-v2/logos/filecoin.png',
    decs: 'The largest decentralized data storage marketplace, protocol, & cryptocurrency.',
  },
  {
    tags: [
      {
        color: '7EBD4E',
        subTitle: 'Cross-chain bridges',
      },
    ],
    link: '',
    title: 'Ethereum',
    backgroundImg: '',
    icon: '/landing-v2/logos/ethereum.png',
    decs: 'Install a bridge for seamless asset transfers between Ethereum and Bitcoin L2s powered by BVM.',
  },
  {
    tags: [
      {
        color: 'FF7E21',
        subTitle: 'Rollup protocol',
      },
    ],
    link: 'https://twitter.com/zksync',
    target: '_blank',
    title: 'ZK Sync',
    backgroundImg: '',
    icon: '/landing-v2/logos/zk-sync.png',
    decs: 'Zero-Knowledge enables validity proofs to ensure the state can\'t be corrupted and invalid transactions can\'t exist.',
  },
  {
    tags: [
      {
        color: '7E7CFF',
        subTitle: 'dApps',
      },
    ],
    link: 'https://twitter.com/GMX_IO',
    target: '_blank',
    title: 'GMX',
    backgroundImg: '',
    icon: '/landing-v2/logos/gmx.png',
    decs: 'Integrate a decentralized perpetual exchange as a pre-installed component  into your Bitcoin L2s.',
  },
  {
    tags: [
      {
        color: '7EBD4E',
        subTitle: 'Cross-chain bridges',
      },
    ],
    link: '',
    title: 'BRC-20',
    backgroundImg: '',
    icon: '/landing-v2/logos/brc-20.png',
    decs: 'Bridge BRC-20 tokens from the mainnet to Bitcoin L2s powered by BVM and vice versa.',
  },
  {
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
    link: 'https://twitter.com/NEARProtocol',
    target: '_blank',
    title: 'NearDA',
    backgroundImg: '',
    icon: '/landing-v2/logos/near-da.png',
    decs: 'Delivering on the promises of Web3, with Chain Abstraction.',
  },
  {
    tags: [
      {
        color: '66BCFF',
        subTitle: 'Data Availability',
      },
    ],
    link: 'https://twitter.com/AvailProject',
    target: '_blank',
    title: 'Avail',
    backgroundImg: '',
    icon: '/landing-v2/logos/avail.png',
    decs: 'A powerful base layer for next generation trust-minimized applications.',
  },
  {
    tags: [
      {
        color: '7E7CFF',
        subTitle: 'dApps',
      },
    ],
    link: 'https://twitter.com/Uniswap',
    target: '_blank',
    title: 'Uniswap',
    backgroundImg: '',
    icon: '/landing-v2/logos/uniswap.png',
    decs: 'Include a Dex as a pre-installed component in your layer 2 blockchain setup.',
  },
  {
    tags: [
      {
        subTitle: 'Cross-chain bridges',
        color: '7E7CFF',
      },
    ],
    link: '',
    title: 'Bitcoin',
    backgroundImg: '',
    icon: '/landing-v2/logos/bitcoin.png',
    decs: 'Install a bridge for seamless asset transfers between Bitcoin and Bitcoin L2s powered by BVM.',
  },
];

export default function Modules({ isFull }: { isFull?: boolean }) {
  const { isDesktop } = useWindowSize();

  return (
    <div className={cn(s.wrapper)}>
      <div className='container'>
        <SectionTitle className={s.wrapper_title}>
          Explore our Bitcoin Modules
        </SectionTitle>

        {}
        {
          !isFull ? <>
              <div className={s.listPreview}>
                {DATA_MODULES.slice(0, 6).map((item, index) => {
                  return (
                    <div className={s.listCol_item}>
                      <CardExplore {...item} type='modules' key={index} />
                    </div>
                  );
                })}
              </div>
              <Link className={s.btnReview} href={`/module-store`}>
                View All
              </Link>
            </> :
            <>
              <div className={s.wrapper_list}>
                {isDesktop ? (
                  <>
                    <div className={s.listCol}>
                      {DATA_MODULES.slice(0, 6).map((item, index) => {
                        return (
                          <div className={s.listCol_item}>
                            <CardExplore {...item} type='modules' key={index} />
                          </div>
                        );
                      })}
                    </div>

                    <div className={s.listCol}>
                      {DATA_MODULES.slice(6, 11).map((item, index) => {
                        return (
                          <div className={s.listCol_item}>
                            <CardExplore {...item} type='modules' key={index} />
                          </div>
                        );
                      })}
                    </div>

                    <div className={s.listCol}>
                      {DATA_MODULES.slice(11, 16).map((item, index) => {
                        return (
                          <div className={s.listCol_item}>
                            <CardExplore {...item} type='modules' key={index} />
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={s.listCol}>
                      {DATA_MODULES.slice(0, 8).map((item, index) => {
                        return (
                          <div className={s.listCol_item}>
                            <CardExplore {...item} type='modules' key={index} />
                          </div>
                        );
                      })}
                    </div>

                    <div className={s.listCol}>
                      {DATA_MODULES.slice(8, 16).map((item, index) => {
                        return (
                          <div className={s.listCol_item}>
                            <CardExplore {...item} type='modules' key={index} />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </>
        }
      </div>
    </div>
  );
}
