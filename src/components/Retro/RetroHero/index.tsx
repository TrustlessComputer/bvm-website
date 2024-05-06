import React from 'react';
import s from './styles.module.scss'
import Link from 'next/link';
import Image from 'next/image'

function RetroHero(): React.JSX.Element {
  return (
    <div className={s.wrapper} style={{backgroundImage: 'url(/retro/hero.png)'}}>
      <div className={'container'}>
        <div className={s.wrapperContent}>
          <p className={s.label}>Designed for Game builders</p>
          <p className={s.heading}>Shape the Future of Gaming on Bitcoin</p>
          <Link href={''} className={s.btn}>Create your own GameFi L2</Link>
          <div className={s.linkBottom}>
            <p>Need an example?</p>
            <Link href={''}>Explore Bitcoin Arcade now</Link>
            <div className={s.icon}>
              <Image src={'/retro/ic_arrowTR.svg'} alt={'icon'} width={12} height={12}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetroHero
