import React from 'react';
import s from './styles.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';



function Card(): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      <div className={s.thumbnail}>
        <ImagePlaceholder src={'/retro/1.png'} alt={'thumbnail'} width={1003} height={1002}/>
      </div>
      <div className={s.content}>
        <p className={s.title}>Unlock unparalleled performance</p>
        <p className={s.desc}>Experience lightning-fast 2-second block times and ultra-low gas fees (less than $0.001 per transaction).</p>
      </div>
    </div>
  )
}

export default Card
