import s from './style.module.scss'
import Treasury from '@layouts/HeaderV2/Top/treasury';


const Top = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.treasury}>
          <Treasury />
        </div>
        <p className={s.leftToken}>DAO</p>
      </div>
      <div className={s.right}>
        <p className={s.token__orange}>$BVM</p>
        <p className={s.token__green}>$SHARD</p>
      </div>
    </div>
  )
}

export default Top;
