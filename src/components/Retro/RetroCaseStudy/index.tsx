import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';


interface RetroCaseStudyProps extends PropsWithChildren {
  subTitle: string,
  src: string,
  heading: string,
  brand: string,
  backgroundColor?: string;
  bgCaseStudy?: string;
  btn: {
    title: string,
    link: string,
    target?: '_blank' | ''
  }
}

function CaseStudy({
                     subTitle,
                     heading,
                     src,
                     children,
                     btn,
                     brand,
                     backgroundColor = '#180031',
                     bgCaseStudy = '#2f1946',
                   }: RetroCaseStudyProps): React.JSX.Element {
  return <div className={s.wrapper} style={{ backgroundColor }}>
    <div className='containerV3'>
      <div className={s.contentWrapper}>
        <div className={s.left}>
          <div className={s.label} style={{ backgroundColor: bgCaseStudy }}>
            <p>{subTitle}</p>
            <div className={s.imageLabel}>
              <ImagePlaceholder src={brand} alt={'brand'} height={51} width={260} className={s.image} />
            </div>
          </div>
          <h2 className={s.heading}>{heading}</h2>
          <div className={s.description}>{children}</div>
          <div className={s.wrapperBtn}>
            <Link target={btn.target} href={btn.link} className={s.btn}>{btn.title}</Link>
          </div>
        </div>
        <div className={s.right}>
          <ImagePlaceholder src={src} alt={'imageRight'} width={1960} height={1050} />
        </div>
      </div>
    </div>
  </div>;
}

export default CaseStudy;
