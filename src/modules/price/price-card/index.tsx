import s from './styles.module.scss';
import { PropsWithChildren } from 'react';


interface IProp extends PropsWithChildren {
  subtitle?: string,
  network: string,
  portocol?: string,
  layer?: string,
  time?: string,
  support: string,
  titleAction?: string,
  action?: string,
  label?: string,
  isPlaceholder?: boolean
  iseSelected?: boolean
  packageX?: 'isFree' | 'isEss' | 'isPro' | 'isCustom'
}

export default function PriceCard({
                                    label,
                                    subtitle,
                                    network,
                                    portocol,
                                    layer,
                                    time,
                                    support,
                                    titleAction,
                                    action,
                                    isPlaceholder,
                                    iseSelected,
                                    packageX,
                                    children,
                                  }: IProp) {

  return <div className={`${s.priceCard} ${isPlaceholder && s.isPlaceholder} ${iseSelected && s.iseSelected}`}>

    {
      label && <div className={`${s.label} ${s[packageX || '']}`}>
        {label}
      </div>
    }

    <div className={s.title}>
      {children}
      <small className={s.subTitle}>
        {subtitle}
      </small>
    </div>
    <div className={`${s.network} ${s.rowVal}`}>
      {network}
    </div>
    <div className={`${s.portocol} ${s.rowVal}`}>
      {portocol}
    </div>
    <div className={`${s.layer} ${s.rowVal} ${!layer && s.emp}`}>{
      layer
    }</div>
    <div className={`${s.time} ${s.rowVal} ${!time && s.emp}`}>
      {time}
    </div>
    <div className={`${s.support} ${s.rowVal}`}>{
      support
    }</div>
    <div className={`${s.action} ${s.rowVal}`}>
      {
        <button>
          {action && titleAction}
        </button>
      }
    </div>
  </div>;
}
