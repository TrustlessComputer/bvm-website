import React from 'react';
import s from './styles.module.scss';
import ecosystem1 from '@/public/landing/images/ecosystem1.png';
import ecosystem2 from '@/public/landing/images/ecosystem2.png';
import ecosystem3 from '@/public/landing/images/ecosystem3.png';
import ecosystem4 from '@/public/landing/images/ecosystem4.png';

import ItemChain from '../Chain/ItemChain';
import HeadingSection from '@/modules/landing/Componets/HeadingSection';
import ContentSection from '@/modules/landing/Componets/ContentSection';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';

const DATA_ECOSYSTEM = [
  {
    img: ecosystem1,
    title: 'Earn sequencer fees',
    stud: 2,
    bgTop: 'FFD73B',
    bgBottom: 'A05700',
  },
  {
    img: ecosystem2,
    title: 'Have 100% dedicated throughput',
    stud: 2,
    bgTop: 'B4EDFF',
    bgBottom: '0074BB',
  },
  {
    img: ecosystem3,
    title: 'Customize specifically for your use case',
    stud: 2,
    bgTop: '000',
    bgBottom: '303030',
  },
  {
    img: ecosystem4,
    title: 'Receive airdrop from BVM builder reward programs',
    stud: 2,
    bgTop: 'EBEFF7',
    bgBottom: '7D8AA7',
  },
];
export default function Ecosystem() {
  return (
    <div className={s.ecosystem}>
      <div className='container'>
        <div className={s.ecosystem_heading}>
          <HeadingSection className={s.ecosystem_heading_title}>
            <Chars>
              Why launch your own <b>Bitcoin L2 blockchain</b>?
            </Chars>
          </HeadingSection>
          <ContentSection className={s.ecosystem_heading_description}>
            <Lines delay={.2}>
              Whatever your vision — a dapp, a fully onchain game, a DEX, or an
              ecosystem — there are many benefits of running your own Bitcoin L2
              blockchain.
            </Lines>
          </ContentSection>
        </div>

        <div className={s.ecosystem_content}>
          {DATA_ECOSYSTEM.map((item, index) => {
            return <ItemChain delay={index / 6} data={item} isLaunch={true} />;
          })}
        </div>
      </div>
    </div>
  );
}
