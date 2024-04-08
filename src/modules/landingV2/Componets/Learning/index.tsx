import React from 'react';
import s from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import CardLearn from './CardLearn';

const DATA_LEARN = [
  {
    title: 'Deyloy your own Bitcoin L2 with BVM modules.',
    decs: 'Choose a rollup module, select a data availability module, and then launch to the world - it’s that easy. ',
  },
  {
    title: 'Write Smart contracts and build dapps on bitcoin.',
    decs: 'BVM is EVM equivalent. It allows Ethereum developers to migrate their dApps from Ethereum to Bitcoin with minimal modificiations.',
  },
  {
    title: 'Kickstart your BITcoin L2 with a CROWDSALE',
    decs: 'Already deployed a Bitcoin L2? You can do a public sale to raise funds and grow your Bitcoin L2 via the BVM launchpad.',
  },
  {
    title: 'Welcome to the future of bitcoin',
    decs: '',
  },
];
export default function Learning() {
  return (
    <div className={s.wrapper}>
      <div className="container">
        <SectionTitle className={s.wrapper_title}>
          Learn what bvm products can do for you
        </SectionTitle>

        <div className={s.wrapper_list}>
          {DATA_LEARN.map((item, index) => {
            return (
              <CardLearn
                {...item}
                key={index}
                isLast={index === DATA_LEARN.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
