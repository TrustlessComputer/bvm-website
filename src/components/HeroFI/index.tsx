import Image from 'next/image';
import Link from 'next/link';
import s from './styles.module.scss';
import Fade from '@/interactive/Fade';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type THeroFiProps = {
  mainTitle: string;
  title: string;
  subTitle: string;
  btnTitle: string;
  subBtnTitle: string;
  subBtnIcon: string;
  heroThumbnail: string;
  btnHref: string;
  subBtnIconHref: string;
};

const HeroFi = ({ ...props }: THeroFiProps) => {
  return (
    <div className={s.heroContainer}>
      <Fade from={{ y: 40 }} to={{ y: 0 }} className={s.heroContent}>
        <p className={s.heroContent_mainTitle}>Bitcoin L2 for {props.mainTitle}</p>
        <h2 className={s.heroContent_title}>{props.title}</h2>
        <p className={s.heroContent_subTitle}>{props.subTitle}</p>
        <Link href={props.btnHref} className={s.heroContent_button}>{props.btnTitle}</Link>
        <Link href={props.subBtnIconHref} className={s.heroContent_link} target={'_blank'}>
          {props.subBtnTitle}
          <Image
            width={20}
            height={20}
            loading={'eager'}
            src={props.subBtnIcon}
            alt={props.subBtnIcon}
          />
        </Link>
      </Fade>
      <Fade className={s.heroImg}>
        <ImagePlaceholder
          width={780}
          height={440}
          loading={'eager'}
          src={props.heroThumbnail}
          alt={props.heroThumbnail}
        />
      </Fade>
    </div>
  );
};

export default HeroFi;
