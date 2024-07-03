import BoxOption from '@/modules/blockchains/Buy/components3/BoxOption';
import { useRouter } from 'next/navigation';
import s from './styles.module.scss';
import { DATA_PRICING } from '../data_pricing';

const BuyPage = () => {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.left}>
          <p className={s.heading}>Customize your Blockchain</p>
          <div className={s.left_box}>
            <BoxOption
              active={true}
              title={DATA_PRICING.network.title}
              sub_title={DATA_PRICING.network.sub_title}
              options={DATA_PRICING.network.options}
              background="brown"
              isFirst={true}
              isLast={false}
            />
            {/* <BoxOption label={'2. Data Availability'} /> */}
          </div>
        </div>
        <div className={s.right}>
          <div className={s.right_top}>
            <p className={s.heading}>Your tier</p>
            <div className={s.right_top_box}>
              <p>
                <span>Hacker</span> $99 per rollup/month
              </p>
              <div
                className={s.right_top_box_btn}
                onClick={() => {
                  router.push('/pricing');
                }}
              >
                <p>Switch</p>
              </div>
            </div>
          </div>
          <div className={s.right_box}>{/* */}</div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
