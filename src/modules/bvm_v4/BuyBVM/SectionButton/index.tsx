import s from './styles.module.scss';
import React from 'react';
import CardItem from './CardItem';

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
        btnTitle: 'Uniswap (Ethereum)',
        color: 'border',
        link: 'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
        icon: '/bvm/uniswap.svg',
      },
      {
        btnTitle: 'Uniswap (Arbitrum)',
        color: 'border',
        link: 'https://app.uniswap.org/swap?outputCurrency=0x694A7eF60ACe282E2a55a9bc6AdD56730e5Ee8B6&chain=arbitrum',
        icon: '/bvm/uniswap.svg',
      },
      {
        btnTitle: 'OKX Web3',
        color: 'border',
        link: 'https://www.okx.com/web3/dex-swap#inputChain=1&inputCurrency=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outputChain=1&outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d',
        icon: '/bvm/okx.svg',
      },
      {
        btnTitle: 'Unisat',
        color: 'border',
        link: 'https://unisat.io/market/brc20?tick=BVMN',
        icon: '/bvm/unisat.svg',
      },
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
        icon: '/bvm/mexc.svg',
      },
      {
        btnTitle: 'Bitmart',
        color: 'border',
        link: 'https://www.bitmart.com/trade/en-US?symbol=BVM_USDT',
        icon: '/bvm/bitmart.svg',
      },
    ],
  },
  // {
  //   id: 1,
  //   title: 'Stake',
  //   description: (
  //     <>
  //       <p>Stake $BVM to mine <b>SHARD</b>, the governance token of the BVM ecosystem</p>
  //     </>
  //   ),
  //   description2: (
  //     <ul style={{
  //       fontSize: '16px',
  //       textAlign: 'start',
  //       gap: '16px',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       padding: '0px 24px',
  //       marginTop: '12px',
  //     }} className={s.colorList}>
  //       <li>Govern the BVM DAO treasury, which has 50M $BVM and other assets</li>
  //       <li>Eligible for various airdrops</li>
  //       <li>Increase your staking APR from 25% to 50%</li>
  //     </ul>
  //   ),
  //   isRed: true,
  //   buttons: [
  //     {
  //       btnTitle: 'Stake',
  //       color: 'red',
  //       link: 'https://nakachain.xyz/staking',
  //     },
  //   ],
  // },
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
