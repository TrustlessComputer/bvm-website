import RetroCardFullWidth from '@components/Retro/RetroCardFullWidth';
import React from 'react';
import { DATA_CHAINS } from '@/modules/UseBitcoin/ActivitiesVer3/data';
import s from './styles.module.scss'

function ActivitiesVer3(): React.JSX.Element {
  return (
    <div className={s.wrapper}>
      {
        DATA_CHAINS.map(item => {
          return (
            <RetroCardFullWidth key={item.heading} heading={item.heading} desc={item.desc} banner={item.banner} noteHeading={item.noteHeading} videoSrc={item.videoSrc} social={item.social}/>
          )
        })
      }
    </div>
  )
}

export default ActivitiesVer3
