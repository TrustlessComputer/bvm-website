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

const Tier = ({ originalData, setValueOfPackage }: Props) => {
  const router = useRouter();

  const onLoadOldForm = () => {
    const oldForm = localStorage.getItem('bvm.customize-dapp-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    // TODO
  };

  return (
    <React.Fragment>
      <div className={styles.tier}>
        <h3 className={styles.tier_title}>Favorite architectures</h3>

        <div className={styles.nav}>
          <div className={styles.tier_items}>
            {tierData.map((tier) => (
              <div
                key={tier.id}
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
                  alt={'icon tier ' + tier.id}
                />
              </div>
            ))}
          </div>

          <div className={styles.tier_items}>
            <div
              className={styles.tier_items_item}
              onClick={() => onLoadOldForm()}
            >
              Your customize
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tier;
