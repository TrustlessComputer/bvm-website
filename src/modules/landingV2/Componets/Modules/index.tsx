import React, { useMemo } from 'react';
import s from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import cn from 'classnames';
import CardExplore from './CardExplore';

const DATA_MODULES = [
  {
    subTitle: 'Data Validity',
    link: '',
    color: '7E7CFF',
    title: 'Ordinals',
    backgroundImg: '',
    decs: 'Data is organized into batches within the DA layer and stored as transaction hashes on Bitcoin (Ordinals) to ensure the integrity and reliability of data stored on the blockchain.',
    icon: '/landing-v2/logos/ordinals.png',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/0xPolygonEco',
    color: '66BCFF',
    title: 'Polygon',
    backgroundImg: '',
    target: '_blank',
    icon: '/landing-v2/logos/polygon.png',
    decs: 'Empowering builders to build anything on Bitcoin from DeFi, GameFi, to A.I.',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/CelestiaOrg',
    color: '66BCFF',
    title: 'Celestia',
    backgroundImg: '',
    target: '_blank',
    icon: '/landing-v2/logos/celestia.png',
    decs: 'Make it easy for anyone to securely launch their own blockchain.',
  },
  {
    subTitle: 'Rollup protocol',
    link: 'https://twitter.com/Optimism',
    color: 'FF7E21',
    title: 'Optimism',
    backgroundImg: '',
    icon: '/landing-v2/logos/optimism.png',
    decs: 'Optimistic Rollups allow transactions to be executed off-chain while still leveraging the security of the main chain.',
  },
  {
    subTitle: 'dApps',
    link: '',
    color: '7E7CFF',
    title: 'DAO',
    backgroundImg: '',
    icon: '/landing-v2/logos/dao.png',
    decs: 'Incorporate a DAO into your blockchain setup.',
  },
  {
    subTitle: 'Cross-chain bridges',
    link: '',
    color: '7EBD4E',
    title: 'Ethereum',
    backgroundImg: '',
    icon: '/landing-v2/logos/ethereum.png',
    decs: 'Install a bridge for seamless asset transfers between Ethereum and Bitcoin L2s powered by BVM.',
  }, {
    subTitle: 'Data Validity',
    link: 'https://twitter.com/Stampchain',
    target: '_blank',
    color: 'FF0420',
    title: 'Stamps',
    backgroundImg: '',
    icon: '/landing-v2/logos/stamps.png',
    decs: 'Roll up to Bitcoin as Stamps, ensuring perpetual storage that can\'t be altered or lost.',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/filecoin',
    target: '_blank',
    color: '66BCFF',
    title: 'Filecoin',
    backgroundImg: '',
    icon: '/landing-v2/logos/filecoin.png',
    decs: 'The largest decentralized data storage marketplace, protocol, & cryptocurrency.',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/eigen_da',
    target: '_blank',
    color: '66BCFF',
    title: 'EigenDA',
    backgroundImg: '',
    icon: '/landing-v2/logos/eigenda.png',
    decs: 'Provide low-cost, hyperscale data availability to rollups.',
  },
  {
    subTitle: 'Rollup protocol',
    link: 'https://twitter.com/zksync',
    target: '_blank',
    color: 'FF7E21',
    title: 'ZK Sync',
    backgroundImg: '',
    icon: '/landing-v2/logos/zk-sync.png',
    decs: 'Zero-Knowledge enables validity proofs to ensure the hyperchains\' ecosystem state can\'t be corrupted and invalid transactions can\'t exist.',
  },
  {
    subTitle: 'dApps',
    link: 'https://twitter.com/GMX_IO',
    target: '_blank',
    color: '7E7CFF',
    title: 'GMX',
    backgroundImg: '',
    icon: '/landing-v2/logos/gmx.png',
    decs: 'Integrate a decentralized perpetual exchange into your Bitcoin L2s.',
  },
  {
    subTitle: 'Cross-chain bridges',
    link: '',
    color: '7EBD4E',
    title: 'BRC-20',
    backgroundImg: '',
    icon: '/landing-v2/logos/brc-20.png',
    decs: 'Bridge BRC-20 tokens from the mainnet to Bitcoin L2s powered by BVM and vice versa.',
  },
  {
    subTitle: 'Data Availability',
    link: '',
    color: '66BCFF',
    title: 'Ordinals',
    backgroundImg: '',
    icon: '/landing-v2/logos/ordinals.png',
    decs: 'Data is organized into batches within the DA layer and stored as transaction hashes on Bitcoin (Ordinals) to ensure the integrity and reliability of data stored on the blockchain.',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/NEARProtocol',
    target: '_blank',
    color: '66BCFF',
    title: 'NearDA',
    backgroundImg: '',
    icon: '/landing-v2/logos/near-da.png',
    decs: 'Delivering on the promises of Web3, with Chain Abstraction.',
  },
  {
    subTitle: 'Data Availability',
    link: 'https://twitter.com/AvailProject',
    target: '_blank',
    color: '66BCFF',
    title: 'Avail',
    backgroundImg: '',
    icon: '/landing-v2/logos/avail.png',
    decs: 'A powerful base layer for next generation trust-minimized applications.',
  },
  {
    subTitle: 'dApps',
    link: 'https://twitter.com/Uniswap',
    target: '_blank',
    color: '7E7CFF',
    title: 'Uniswap',
    backgroundImg: '',
    icon: '/landing-v2/logos/uniswap.png',
    decs: 'Include a Dex as a pre-installed component in your layer 2 blockchain setup.',
  },
  {
    subTitle: 'Cross-chain bridges',
    link: '',
    color: '7E7CFF',
    title: 'Bitcoin',
    backgroundImg: '',
    icon: '/landing-v2/logos/bitcoin.png',
    decs: 'Install a bridge for seamless asset transfers between Bitcoin and Bitcoin L2s powered by BVM.',
  },
];

export default function Modules() {

  const cols = (start: number, end: number) => {
    return DATA_MODULES.slice(start, end);
  };

  const avg = useMemo(() => {
    return Math.floor(DATA_MODULES.length / 3) + 1;
  }, []);

  return (
    <div className={cn(s.wrapper)}>
      <div className='container'>
        <SectionTitle className={s.wrapper_title}>
          Explore our bitcoin modules
        </SectionTitle>

        <div className={s.wrapper_list}>
          <div className={s.listCol}>
            {cols(0, avg).map((item, index) => {
              return <div className={s.listCol_item}>
                <CardExplore {...item} type='modules' key={index} />
              </div>;
            })}
          </div>
          <div className={s.listCol}>
            {cols(avg, avg * 2).map((item, index) => {
              return <div className={s.listCol_item}><CardExplore {...item} type='modules' key={index} /></div>;
            })}
          </div>
          <div className={s.listCol}>
            {cols(avg * 2, avg * 3).map((item, index) => {
              return <div className={s.listCol_item}><CardExplore {...item} type='modules' key={index} /></div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
