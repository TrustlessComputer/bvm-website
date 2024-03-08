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
    title: 'BUY',
    description: 'The fastest and cheapest way to buy BVM is on Naka, a Bitcoin L2 designed for DeFi on Bitcoin. You can also buy BVM on other exchanges.',
    color: 'green',
    buttons: [
      {
        btnTitle: 'Buy on Naka',
        link: 'https://nakachain.xyz/market',
        active: true,
      },
      {
        btnTitle: 'Uniswap',
        link: '',
      },
      {
        btnTitle: 'Unisat',
        link: '',
      }
    ]
  },
  {
    id: 1,
    title: 'STAKE',
    description: 'Earn up to 58% APY on your BVM and receive airdrops from upcoming Bitcoin L2 projects.',
    color: 'orange',
    buttons: [
      {
        btnTitle: 'Stake',
        link: 'https://nakachain.xyz/staking',
      }
    ]
  }
]

export default function SectionButton() {
  return (
    <div className={s.sectionBtn}>
      {/*{DATA_BTN.map((item, index) => {*/}
      {/*  return (*/}
      {/*    <ItemSectionButton*/}
      {/*      delay={0.2 + index / 5}*/}
      {/*      key={item.number}*/}
      {/*      data={item}*/}
      {/*      isLast={index === 2}*/}
      {/*    />*/}
      {/*  );*/}
      {/*})}*/}
      {
        DATA.map((item) => {
          return (
            <CardItem key={item.id} {...item}/>
          )
        })
      }
    </div>
  );
}
