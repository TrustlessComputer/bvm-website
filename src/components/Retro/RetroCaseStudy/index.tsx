import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';


interface RetroCaseStudyProps extends PropsWithChildren {
  subTitle: string,
  src: string,
  heading: string
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
                   }: RetroCaseStudyProps): React.JSX.Element {
  return <div className={s.wrapper}>
    <div className='container'>
      <div className={s.contentWrapper}>
        <div className={s.left}>
          <div className={s.label}>
            <p>{subTitle}</p>
            <div className={s.imageLabel}>
              <ImagePlaceholder src={'/retro/brand.png'} alt={'brand'} height={51} width={260} className={s.image} />
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
