import Image from 'next/image';
import Link from 'next/link';
import s from './styles.module.scss';

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
      <div className={s.heroContent}>
        <p className={s.heroContent_mainTitle}>{props.mainTitle}</p>
        <h2 className={s.heroContent_title}>{props.title}</h2>
        <p className={s.heroContent_subTitle}>{props.subTitle}</p>
        <Link href={props.btnHref} className={s.heroContent_button}>{props.btnTitle}</Link>
        <Link href={props.subBtnIconHref} className={s.heroContent_link}>
          {props.subBtnTitle}
          <Image
            width={20}
            height={20}
            src={props.subBtnIcon}
            alt={props.subBtnIcon}
          />
        </Link>
      </div>
      <div className={s.heroImg}>
        <Image
          width={780}
          height={440}
          src={props.heroThumbnail}
          alt={props.heroThumbnail}
        />
      </div>
    </div>
  );
};

export default HeroFi;
