import React from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';

function CaseStudy(): React.JSX.Element {
  return <div className={s.wrapper}>
    <div className="container">
      <div className={s.contentWrapper}>
        <div className={s.left}>
          <div className={s.label}>
            <p>Case Study</p>
            <div className={s.imageLabel}>
              <ImagePlaceholder src={'/retro/brand.png'} alt={'brand'} height={51} width={260} />
            </div>
          </div>
          <p className={s.heading}>Ushering the new golden era of Gaming on Bitcoin</p>
          <p className={s.description}>The first ever Fully On-Chain blockchain on Bitcoin</p>
          <div className={s.wrapperBtn}>
            <Link href={''} className={s.btn}>Create your own GameFi L2</Link>
          </div>
        </div>
        <div className={s.right}>
          <ImagePlaceholder src={'/retro/imageRight.png'} alt={'imageRight'} width={1960} height={1050}/>
        </div>
      </div>
    </div>
  </div>
}

export default CaseStudy
