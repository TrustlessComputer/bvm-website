import s from './style.module.scss';
import ScalableItem from '@/modules/landing/Componets/Scalable/ScalableItem';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';
import ScalableContent from '@/modules/landing/Componets/Scalable/ScalableContnet';


const DATA_SCALABLE = [
  {},
];

export default function Scalable() {
  return <div className={s.scalable}>
    <div className={s.scalable_top}>
     <div className={s.scalable_top_inner}>
       <h2 className={s.scalable_heading}>
         {/*<Chars>*/}
         Scalable infrastructure for Bitcoin
         {/*</Chars>*/}
       </h2>
       <div className={s.scalable_content}>
         {/*<Lines delay={.1}>*/}
         If Ethereum is the world’s computer, Bitcoin is the world’s supercomputer. With Bitcoin Virtual Machine,
         anyone
         can launch their own Bitcoin L2 blockchain.
         {/*</Lines>*/}
       </div>
     </div>
    </div>
    <div className={s.scalable_inner}>
      <ScalableItem />
      <ScalableItem />
      <ScalableItem />
    </div>
    <div className={s.scalable_bottom}>
      <ScalableContent title={'Unlimited throughput'}>
        Hyperscale Bitcoin with an unlimited number of Bitcoin Virtual Machines as Bitcoin L2 blockchains.
      </ScalableContent>
      <ScalableContent title={'Infinite applications'}>
        Bitcoin Virtual Machines support Solidity smart contracts on Bitcoin, so you can quickly build all kinds of
        decentralized applications on Bitcoin.
      </ScalableContent>
      <ScalableContent title={'Fast & cheap'}>
        Bitcoin Virtual Machines implement rollups on Bitcoin. Rollups significantly reduce the block time and
        transaction fees.
      </ScalableContent>
    </div>
  </div>;
}
