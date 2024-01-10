import Image from 'next/image';
import s from './styles.module.scss';

export default function ScalableItem({layer}:{layer: number}) {
  return <div className={`${s.scalableItem} js-scalableItem ${s[`scalableItem__${layer}`]}`}>
    <Image className={'js-image'} width={1178} height={773} src={`/landing/slide${layer}.png`} alt={'slide1'} />
  </div>;
}
