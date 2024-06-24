import s from './styles.module.scss';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function GroupProducts(): ReactElement {

  return <div className={s.groupProduction}>
    <div className={s.inner}>
      <div className={s.left}>
        <div className={s.group}>
          <h4 className={s.title}>QUICKSTART</h4>
          <ul className={s.group_inner}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/create-a-zk-rollup-on-bitcoin'} target={'_blank'}>Create
                a ZK rollup on Bitcoin</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/issue-your-own-governance-token'}
                    target={'_blank'}>
                Issue your own governance token</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/raise-funds-for-your-project-through-a-crowdsale'}
                    target={'_blank'}>Raise funds for your project through a Crowdsale
              </Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/quickstart/operate-your-community-driven-project-using-a-dao'}
                    target={'_blank'}>Operate your community-driven project using a DAO
              </Link>
            </li>
          </ul>
        </div>

        <div className={s.group}>
          <h4 className={s.title}>Tutorials: BUILD DAPPS ON BITCOIN</h4>
          <ul className={s.group_inner}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/guides-build-dapps-on-bitcoin/brc-721-nfts'} target={'_blank'}>BRC-721:
                NFTs</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-dapps-on-bitcoin/fully-onchain-tic-tac-toe'}
                    target={'_blank'}>Fully onchain Tic-Tac-Toe</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/guides-build-dapps-on-bitcoin/decentralized-discord'}
                    target={'_blank'}>Decentralized Discord</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/guides-build-dapps-on-bitcoin/auction'}
                    target={'_blank'}>Auction</Link>
            </li>
          </ul>
        </div>

        <div className={s.group}>
          <h4 className={s.title}>Tutorials: BUILD AI ON BITCOIN</h4>
          <ul className={s.group_inner}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-ai-on-bitcoin/decentralized-ai-beginner'}
                    target={'_blank'}>Decentralized AI (Beginner)</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-ai-on-bitcoin/decentralized-ai-advanced'}
                    target={'_blank'}>Decentralized AI (Advanced)</Link>
            </li>
          </ul>
        </div>

        <div className={s.group}>
          <h4 className={s.title}>Tutorials: BUILD PROTOCOLS ON BITCOIN</h4>
          <ul className={s.group_inner}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-protocols-on-bitcoin/bfs-build-an-ipfs-alternative'}
                    target={'_blank'}>BFS: Build an IPFS alternative</Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-protocols-on-bitcoin/build-an-ordinals-alternative'}
                    target={'_blank'}>Build an Ordinals alternative
              </Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/build-protocols-on-bitcoin/build-a-bitcoin-name-system'}
                    target={'_blank'}>Build a Bitcoin Name System
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div className={s.right}>
        <div className={s.simpleGroup}>
          <h4 className={s.title}>How it work</h4>
          <ul className={s.simpleGroup_list}>
            <li className={s.simpleGroup_link}>
              <Link href={'https://docs.bvm.network/bvm/blockchain-architecture/zk-rollups-on-bitcoin'}
                    target={'_blank'}>ZK Rollups on Bitcoin
              </Link>
            </li>
            <li className={s.simpleGroup_link}>
              <Link
                href={'https://docs.bvm.network/bvm/zero-knowledge-on-bitcoin/zk-light-nodes'}
                target={'_blank'}>ZK Light Nodes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>;
}
