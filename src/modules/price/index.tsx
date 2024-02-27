import s from './styles.module.scss';
import PriceCard from '@/modules/price/price-card';

const PriceModule = () => {

  return (
    <div className={s.price}>
      <div className={s.price_top}>
        <span>Plans built for every team</span>
        <h1>Developer-first pricing</h1>
      </div>
      <div className={`${s.price_container} container`}>
        <PriceCard
          isPlaceholder={true}
          network={'Network'}
          portocol={'Rollup Protocol'}
          layer={'Data Availability Layer'}
          time={'Block Time'}
          support={'Support'}
        />
        <PriceCard
          label={'Free'}
          packageX={'isFree'}
          network={'Bitcoin testnet'}
          portocol={'Optimistic rollups'}
          layer={'Bitcoin (Regtest) or Ethereum (Goerli)'}
          time={'2s or 5s or 10s'}
          support={'Discord support'}
          titleAction={'Get started'}
          action={'#'}
        >
          <h1>7-day free trial</h1>
        </PriceCard>
        <PriceCard
          iseSelected={true}
          label={'Essentials'}
          packageX={'isEss'}
          subtitle={'(Setup cost: 6 BVM)'}
          network={'Bitcoin testnet'}
          portocol={'Optimistic rollups'}
          layer={'Bitcoin + Polygon'}
          time={'2s or 5s or 10s'}
          support={'Discord support'}
          titleAction={'Get started'}
          action={'#'}
        >
          <h1>39319 BVM<small>/month</small></h1>
        </PriceCard>
        <PriceCard
          label={'Professional'}
          packageX={'isPro'}
          subtitle={'(Setup cost: 6 BVM)'}
          network={'Bitcoin testnet'}
          portocol={'Optimistic rollups'}
          layer={'Bitcoin'}
          time={'2s or 5s or 10s'}
          support={'Dedicated account manager'}
          titleAction={'Get started'}
          action={'#'}
        >
          <h1>39319 BVM<small>/month</small></h1>
        </PriceCard>
        <PriceCard
          label={'Custom'}
          packageX={'isCustom'}
          network={'Design a custom Bitcoin L2 — available for businesses with large transaction volume or unique business models.'}
          support={'Dedicated account manager'}
          titleAction={'Contact sales'}
          action={'#'}
        >
          <h1>39319 BVM<small>/month</small></h1>
        </PriceCard>
      </div>
    </div>
  );
};

export default PriceModule;
