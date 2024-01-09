import Image from 'next/image';
import s from './styles.module.scss';

export default function ScalableItem() {
  return <div className={s.scalableItem}>
    <Image width={1178} height={773} src={'/landing/slide1.png'} alt={'slide1'} />
  </div>;
}
