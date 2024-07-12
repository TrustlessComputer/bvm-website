import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';

const TierV2 = () => {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || PRICING_PACKGE.Hacker;

  return (
    <div className={styles.tier}>
      <h3 className={styles.tier_title}>Favorite architectures</h3>

      <div className={styles.tier_items}>
        {tierData.map((tier, index) => (
          <div key={index} className={styles.tier_items_item}>
            <Image
              src={tier.icon}
              width={24}
              height={24}
              alt={'icon tier ' + index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierV2;
