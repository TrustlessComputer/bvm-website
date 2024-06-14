import ItemSectionButton from './ItemSectionButton';
import s from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import Fade from '@/interactive/Fade';
import React from 'react';
import CardItem from './CardItem';

// const DATA_BTN = [
//   {
//     number: 1,
//     title: ' ',
//     desc: (
//       <>
//         If you participate in the BVM public sale, you <br /> can now claim your
//         BVM.
//       </>
//     ),
//     btnTitle: 'Claim',
//     link: 'https://nakachain.xyz/bvm-claim',
//   },
//   {
//     number: 2,
//     title: 'BUY',
//     desc: (
//       <>
//         The easiest way is to buy BVM on Naka, a <br />
//         Bitcoin L2 for DeFi on Bitcoin.
//       </>
//     ),
//     btnTitle: 'Buy',
//     link: 'https://nakachain.xyz/market',
//   },
//   {
//     number: 3,
//     title: 'STAKE',
//     desc: (
//       <>
//         Earn up to <b>58% APY</b> on your BVM and receive <br />
//         airdrops from upcoming Bitcoin L2 projects.
//       </>
//     ),
//     btnTitle: 'STAKE',
//     link: 'https://nakachain.xyz/staking',
//   },
// ];
// export type TButtonTGE = (typeof DATA_BTN)[number];

const DATA = [
  {
    id: 0,
    title: 'Buy',
    description: 'The fastest and cheapest way to buy BVM is on Naka, a Bitcoin L2 designed for DeFi on Bitcoin. You can also buy BVM on other exchanges.',

    buttonsDex: [
      {
        btnTitle: 'Buy on Naka',
        link: 'https://nakachain.xyz/swap',
        color: 'green',
      },
      {
        btnTitle: 'Uniswap',
        color: 'border',
        link: 'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
        icon: '/bvm/uniswap.svg'
      },
      {
        btnTitle: 'Bitmart',
        color: 'border',
        link: '',
        icon: '/bvm/bitmart.svg'
      },
      {
        btnTitle: 'Poloniex',
        color: 'border',
        link: '',
        icon: '/bvm/poloniex.svg'
      },
      {
        btnTitle: 'MEXC',
        color: 'border',
        link: '',
        icon: '/bvm/mexc.svg'
      },
      // {
      //   btnTitle: 'Uniswap (Arbitrum)',
      //   color: 'border',
      //   link: 'https://app.uniswap.org/swap?outputCurrency=0x694A7eF60ACe282E2a55a9bc6AdD56730e5Ee8B6&chain=arbitrum',
      //   icon: '/bvm/uniswap.svg'
      // },
      // {
      //   btnTitle: 'OKX Web3',
      //   color: 'border',
      //   link: 'https://www.okx.com/web3/dex-swap#inputChain=1&inputCurrency=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputChain=1&outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
      //   icon: '/bvm/okx.svg'
      // },
      // {
      //   btnTitle: 'Unisat',
      //   color: 'border',
      //   link: 'https://unisat.io/market/brc20?tick=BVMN',
      //   icon: '/bvm/unisat.svg'
      // },
      // {
      //   btnTitle: 'Poloniex',
      //   color: 'border',
      //   link: 'https://poloniex.com/trade/BVM_USDT/?type=spot',
      //   icon: '/bvm/poloniex.svg'
      // },
      // {
      //   btnTitle: 'Unisat',
      //   link: '',
      // }
    ],
    buttonsCex: [
      {
        btnTitle: 'Gate.io',
        color: 'border',
        link: 'https://www.gate.io/trade/BVM_USDT',
        icon: '/bvm/gateio.svg',
        // disable: true
      },
      {
        btnTitle: 'MEXC',
        color: 'border',
        link: 'https://www.mexc.com/exchange/BVM_USDT',
        icon: '/bvm/mexc.svg'
      },
      {
        btnTitle: 'Bitmart',
        color: 'border',
        link: 'https://www.bitmart.com/trade/en-US?symbol=BVM_USDT',
        icon: '/bvm/bitmart.svg'
      },
    ]
  },
  {
    id: 1,
    title: 'Stake',
    description: (
      <>
        <p>Stake $BVM to mine <b>SHARD</b>, the governance token of the BVM ecosystem</p>
      </>
    ),
    description2: (
      <ul style={{ fontSize: "16px", textAlign: "start", gap: "16px", display: "flex", flexDirection: "column", padding: "0px 24px", marginTop: '12px' }} className={s.colorList}>
        <li>Govern the BVM DAO treasury, which has 50M $BVM and other assets</li>
        <li>Eligible for various airdrops</li>
        {/*<li>Increase your staking APR from 25% to 50%</li>*/}
      </ul>
    ),
    isRed: true,
    buttons: [
      {
        btnTitle: 'Stake',
        color: 'red',
        link: 'https://nakachain.xyz/staking',
      },
    ],
  },
];

export default function SectionButton() {
  return (
    <div className={s.sectionBtn}>
      {
        DATA.map((item, index) => {
          return (
            <CardItem idx={index} key={item.id} {...item} />
          );
        })
      }
    </div>
  );
}
