import s from './style.module.scss';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';
import Fade from '@/interactive/Fade';

const dataCategory = [
  {
    id: 0,
    title: 'Local Mempool',
    description: 'As part of the system, each node maintains a collection of transactions that the user sends to the node in a local mempool. The mempool will help to verify the validation of the transaction before it is written to the Bitcoin network.',
  },
  {
    id: 1,
    title: 'Ethereum-like VM',
    description: 'Our BVM state is an Ethereum-compatible virtual machine. The framework has been configured to support larger transaction sizes and higher block gas limits, enabling us to support more kinds of applications.',
  },
  {
    id: 2,
    title: 'TxWriter',
    description: 'Essentially, the BVM transaction data is embedded into a Bitcoin transaction via the witness data field. This embedding is done in a way that does not affect the verification process and has no impact on the transaction logic.',
  },
  {
    id: 3,
    title: 'TxReader',
    description: 'This module is responsible for filtering BVM transactions in every new Bitcoin block and ensuring that the state of the BVM is consistent across all BVM nodes in the network, even in the event of a reorg.',
  },
];

export default function RoadMap() {
  return <div className={`${s.roadMapWrapper}`}>
    <div className={'container'}>
      <div className={`${s.wrapper}`}>
        <div className={`${s.wrapperImage}`}>
          <img src='/bvm-sct/map2.png' alt='map' />
        </div>
        <div className={`${s.wrapperContent}`}>
          {
            dataCategory.map((item) => {
              return (
                <div className={`${s.wrapperItem}`} key={item.id}>
                  <Fade delay={item.id / 10}>
                    <HeadingSection className={s.heading}>
                      {item.title}
                    </HeadingSection>
                    <p>{item.description}</p>
                  </Fade>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  </div>;
}
