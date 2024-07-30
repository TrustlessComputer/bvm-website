import Image from 'next/image';
import s from './styles.module.scss';
import MetaItem from '@components/Retro/RetroCardFullWidth/MetaItem';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';

export interface RetroCardFullWidthProps {
  width?: number;
  height?: number;
  heading: string,
  noteHeading: string,
  desc: string,
  banner: string | undefined,
  videoSrc: string | undefined,

  social: {
    icon: string;
    label: string;
    link: string;
  }[]
}

export default function RetroCardFullWidth({ heading, noteHeading, videoSrc, width, banner,  height, desc, social }: RetroCardFullWidthProps) {

  return <div className={s.retroCardFullWidth}>
    <div className={s.inner}>
      <div className={s.thumbnail}>
        {
          videoSrc ? (
            <video
              src={videoSrc}
              width={930}
              height={529}
              muted={true}
              // poster={poster}
              autoPlay
              playsInline
              loop
              className={s.image}
            />
            ) : (
            <Image src={`/use-bitcoin/${banner}`} alt={'thumbnail'} width={width || 930} height={height || 529} className={s.image} />
          )
        }

      </div>
      <div className={s.info}>
        {/*<h2 className={s.heading}>{heading} <span>{noteHeading}</span></h2>*/}
        <h2 className={s.heading}>{heading}</h2>
        <p className={s.decs}>
          {desc}
        </p>
        <div className={s.social}>
          {
            social?.map(item=> (
              <Link href={item.link} className={s.socialItem} target={'_blank'}>
                <ImagePlaceholder src={item.icon} alt={item.label} width={16} height={16}/>
                <p>
                  {item.label}
                </p>
              </Link>
            ))
          }
        </div>
        {/*<div className={s.metaData}>*/}
        {/*  {metaData.map(item => {*/}
        {/*    return <MetaItem value={item.value} label={item.label} key={item.label} />;*/}
        {/*  })}*/}
        {/*</div>*/}
      </div>
    </div>
  </div>;
}
