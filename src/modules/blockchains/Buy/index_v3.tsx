import s from './styles.module.scss'
import { useRouter } from 'next/navigation';
import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';

const BuyPage = () => {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.left}>
          <p className={s.heading}>Customize your Blockchain</p>
          <div className={s.left_box}>
            <BoxOption active={true} label={'1. Network'}/>
            <BoxOption label={'2. Data Availability'}/>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.right_top}>
            <p className={s.heading}>Your tier</p>
            <div  className={s.right_top_box}>
              <p><span>Hacker</span> $99 per rollup/month</p>
              <div className={s.right_top_box_btn} onClick={() => {
                router.push('/pricing');
              }}>
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
