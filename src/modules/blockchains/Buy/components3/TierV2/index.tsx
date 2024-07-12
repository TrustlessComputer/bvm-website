import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING_PACKGE } from '@/modules/PricingV2/constants';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { FAKE_DATA_PACKAGE } from '../../TemplateModal/data';
import Link from 'next/link';

const TierV2 = () => {
  const searchParams = useSearchParams();
  const { setField } = useOrderFormStoreV3();

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;

    // set default value for package
    const templateData =
      FAKE_DATA_PACKAGE.find((item) => item.id === packageId?.toString())
        ?.data || [];

    templateData.forEach((field) => {
      setField(field.key, field.value?.key || null, field.value ? true : false);
    });
  };

  React.useEffect(() => {
    const packageParam = searchParams.get('package');

    setValueOfPackage(packageParam);
  }, [searchParams]);

  return (
    <div className={styles.tier}>
      <h3 className={styles.tier_title}>Favorite architectures</h3>

      <div className={styles.tier_items}>
        {tierData.map((tier, index) => (
          <Link
            key={index}
            className={styles.tier_items_item}
            href={'/rollups/customizev2?package=' + tier.id}
          >
            <Image
              src={tier.icon}
              width={24}
              height={24}
              alt={'icon tier ' + index}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TierV2;
