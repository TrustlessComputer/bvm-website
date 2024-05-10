import Image from 'next/image';
import s from './styles.module.scss';
import MetaItem from '@components/Retro/RetroCardFullWidth/MetaItem';

export interface RetroCardFullWidthProps {
  width?: number;
  height?: number;
  heading: string,
  banner: string,
  backgroundColor: string,
  metaData: {
    label: string;
    value: string;
  }[]
}

export default function RetroCardFullWidth({ heading, width, banner, backgroundColor,  height, metaData }: RetroCardFullWidthProps) {

  return <div className={s.retroCardFullWidth}>
    <div className={s.inner}>
      <div className={s.thumbnail} style={{backgroundColor}}>
        <Image src={`/use-bitcoin/${banner}`} alt={'thumbnail'} width={width || 930} height={height || 529} className={s.image} />
      </div>
      <div className={s.info}>
        <h2 className={s.heading}>{heading}</h2>
        <div className={s.metaData}>
          {metaData.map(item => {
            return <MetaItem value={item.value} label={item.label} key={item.label} />;
          })}
        </div>
      </div>
    </div>
  </div>;
}
