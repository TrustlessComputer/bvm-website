import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import { useRouter } from 'next/navigation';

type Props = {
  templates: Array<IModelCategory[]> | null;
  originalData: IModelCategory[] | null;
  setValueOfPackage: (packageId: number | string | null) => void;
};

const TierV2 = ({ setValueOfPackage }: Props) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className={styles.tier}>
        <h3 className={styles.tier_title}>Favorite architectures</h3>

        <div className={styles.tier_items}>
          {tierData.map((tier, index) => (
            <div
              key={index}
              className={styles.tier_items_item}
              onClick={() => {
                router.push('/rollups/customizev2?package=' + tier.id);
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

    </React.Fragment>
  );
};

export default TierV2;
