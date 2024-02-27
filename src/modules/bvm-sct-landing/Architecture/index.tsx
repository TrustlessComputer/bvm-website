import s from './styles.module.scss';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import React from 'react';
import Fade from '@/interactive/Fade';

const Architecture = (): React.JSX.Element => {
  return (
    <div className={`${s.architectureWrapper}`}>
      <div className={'container'}>
        <HeadingSection className={s.heading}>
          Architecture
        </HeadingSection>
        <Fade>
          <p className={s.content}>BVM is a state machine similar to Ethereum-VM that utilizes the Bitcoin blockchain as
            a
            data layer to achieve transaction-level consensus. This approach allows BVM to function as a general-purpose
            state machine while taking advantage of the Bitcoin blockchain's security and data availability without
            requiring additional modules, such as network or consensus protocols.
          </p>
          <p className={s.content}>There are 4 most important components needed to explain: the local mempool,
            Ethereum-like VM, TxWriter, and
            TxReader.</p>
        </Fade>
      </div>
    </div>
  );
};

export default Architecture;
