import React, {PropsWithChildren} from 'react';
import s from './styles.module.scss';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';


interface RetroCaseStudyProps extends PropsWithChildren {
  src: string,
  heading: string,
  brand: string
  btn: {
    title: string,
    link: string,
    target?: '_blank' | '_self'
  }
}

function RetroCaseStudyV2({

                            heading,
                            src,
                            children,
                            btn,
                            brand
                          }: RetroCaseStudyProps): React.JSX.Element {
  return <div className={s.wrapper}>
    <div className={s.contentWrapper}>
      <div className={s.left}>
        <div className={s.label}>
          <div className={s.imageLabel}>
            <ImagePlaceholder src={brand} alt={'brand'} height={51} width={260} className={s.image}/>
          </div>
        </div>
        <h2 className={s.heading}>{heading}</h2>
        {
          children && <div className={s.description}>{children}</div>
        }
        <div className={s.wrapperBtn}>
          <Link target={btn.target} href={btn.link} className={s.btn}>
            <p>{btn.title}</p>
            <div className={s.link_icon}>
              <img src={'/icons/ic_chevron_right.svg'} alt={'ic_chevron_right'} width={16} height={16}/>
            </div>
          </Link>
        </div>
      </div>
      <div className={s.right}>
        <ImagePlaceholder src={src} alt={'imageRight'} width={1960} height={1050}/>
      </div>
    </div>
  </div>;
}

export default RetroCaseStudyV2;
