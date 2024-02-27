import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import SvgInset from '../SvgInset';

type TFooterFiProps = {
  fTitle: string;
  sTitle?: string;
  description?: string;
  image: string;
  thumbnail: string;
  btnTitle: string;
  endFooter: string;
  href: string;
};

const FooterFi = ({ ...props }: TFooterFiProps) => {
  return (
    <div className={s.footerContainer}>
      <ContainerDiv>
        <div className={s.footerContent}>
          <SvgInset
            svgUrl={`landing/images/basil_arrow-up-outline.png`}
            className={s.footerContent_logo}
          />

          {props.description && (
            <p className={s.footerContent_desc}>{props.description}</p>
          )}
          <p className={s.footerContent_title}>
            {props.fTitle}
            {props.sTitle && (
              <span className={s.footerContent_subTitle}>{props.sTitle}</span>
            )}
          </p>
          <Link href={props.href} className={s.footerContent_button}>
            {props.btnTitle}
          </Link>
          <Image
            width={1600}
            height={100}
            src={props.thumbnail}
            alt={props.thumbnail}
            className={s.footerContent_thumbnail}
          />

          <div className={s.footerContent_bvm}>
            <Image
              width={30}
              height={40}
              src={'/gamefi/compress/bvm.png'}
              alt={'BVM'}
            />

            <p>{props.endFooter}</p>
          </div>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default FooterFi;
