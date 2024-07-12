import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import Link from 'next/link';
import { FAKE_DATA_PACKAGE } from '../../TemplateModal/data';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { useRouter, useSearchParams } from 'next/navigation';

const TierV2 = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setField } = useOrderFormStoreV3();

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;

    // set default value for package
    const templateData =
      FAKE_DATA_PACKAGE.find((item) => item.id === packageId?.toString())
        ?.data || [];

    templateData.forEach((field) => {
      setField(field.key, field.value?.key || null, true);
    });
  };

  return (
    <div className={styles.tier}>
      <h3 className={styles.tier_title}>Favorite architectures</h3>

      <div className={styles.tier_items}>
        {tierData.map((tier, index) => (
          <div
            key={index}
            className={styles.tier_items_item}
            // href={'/rollups/customizev2?package=' + tier.id}
            onClick={() => {
              if (searchParams.get('package') !== tier.id) {
                router.push('/rollups/customizev2?package=' + tier.id);
              }

              setValueOfPackage(tier.id);
            }}
          >
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
