import s from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import SvgInset from '../SvgInset';
import ContainerDiv from '../Container';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Fade from '@/interactive/Fade';
import Lines from '@/interactive/Lines';
import Chars from '@/interactive/Chars';

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
        <div className={s.case}>Case Study</div>
        <div className={s.footerContent}>
          <Fade className={s.footerContent_top}>
            <SvgInset
              svgUrl={props.image}
              className={s.footerContent_logo}
            />
          </Fade>
          {props.description && (
            <p className={s.footerContent_desc}>
              <Lines delay={.1}>
                {props.description}
              </Lines>
            </p>
          )}
          <p className={s.footerContent_title}>
            <Chars delay={.2}>
              {props.fTitle}
              {props.sTitle && (
                <span className={s.footerContent_subTitle}>{props.sTitle}</span>
              )}
            </Chars>
          </p>
          <Fade delay={.3} className={s.wrapButton}>
            <Link href={props.href} className={s.footerContent_button} target={'_blank'}>
              {props.btnTitle}
            </Link>
          </Fade>
          <Fade delay={.4} className={s.thumb}>
            <ImagePlaceholder
              width={1600}
              height={100}
              src={props.thumbnail}
              alt={props.thumbnail}
              className={s.footerContent_thumbnail}
            />
          </Fade>

          <Fade delay={.5} className={s.footerContent_bvm}>
            <Image
              width={30}
              height={40}
              loading={'eager'}
              src={'/gamefi/compress/bvm.png'}
              alt={'BVM'}
            />

            <p>{props.endFooter}</p>
          </Fade>
        </div>
      </ContainerDiv>
    </div>
  );
};

export default FooterFi;
