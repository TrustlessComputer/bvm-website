import s from './styles.module.scss'

const BuyPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.left}>
          <p className={s.heading}>Customize your Blockchain</p>
          <div className={s.left_box}>
            list option
            <div className={s.boxItem}></div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.right_top}>
            <p className={s.heading}>Your tier</p>
            <div  className={s.right_top_box}>
              <p><span>Hacker</span> $99 per rollup/month</p>
              <div className={s.right_top_box_btn}>
                <p>Switch</p>
              </div>
            </div>
          </div>
          <div className={s.right_box}>
            {/* */}
          </div>
        </div>

      </div>
    </div>
  )
}

export default BuyPage
