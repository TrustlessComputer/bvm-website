import s from '@/modules/landing/Componets/Scalable/style.module.scss';
import Chars from '@/interactive/Chars';
import Lines from '@/interactive/Lines';

export default function ScalableItem() {

  return <div className={s.scalableItem}>

    <div className={s.scalableItem_top}>
      <h2 className={s.scalableItem_heading}>
        <Chars>
          Scalable infrastructure for Bitcoin
        </Chars>
      </h2>
      <div className={s.scalableItem_content}>
        <Lines delay={.1}>
          If Ethereum is the world’s computer, Bitcoin is the world’s supercomputer. With Bitcoin Virtual Machine,
          anyone
          can launch their own Bitcoin L2 blockchain.
        </Lines>
      </div>
    </div>
    <Image width={1178} height={773} src={'/landing/slide1.png'} alt={'slide1'} />
  </div>;
}
