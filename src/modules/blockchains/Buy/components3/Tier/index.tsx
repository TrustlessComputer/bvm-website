import s from './styles.module.scss';
import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

const Tier = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );
  const isFecthingData = useMemo(() => {
    return availableListFetching || !availableList;
  }, [availableListFetching, availableList]);

  const tierData = useMemo(() => {
    const packageData = availableList?.package['2'];
    const result = packageData?.filter((item, index) => {
      if (item.value === Number(packageParam)) {
        return true;
      }
      return false;
    });
    return result ? result[0] : undefined;
  }, [isFecthingData, availableList, packageParam]);

  // if (isFecthingData) return null;

  return (
    <div className={s.right_top}>
      <p className={s.heading}>Your tier</p>
      <div className={s.right_top_box}>
        {/*<p>*/}
        {/*  <span>{`${tierData?.valueStr || '--'}`}</span> {`${tierData?.price || '--'} (${tierData?.priceNote || '--'})`} per*/}
        {/*  rollup/month*/}
        {/*</p>*/}
        <p>
          <span>{`${tierData?.valueStr || '--'}`}</span>{' '}
          {`${tierData?.price || '--'}`} per rollup/month
        </p>
        <div
          className={s.right_top_box_btn}
          onClick={() => {
            router.push('/pricing');
          }}
        >
          <p>Switch Tier</p>
        </div>
      </div>
    </div>
  );
};

export default Tier;
