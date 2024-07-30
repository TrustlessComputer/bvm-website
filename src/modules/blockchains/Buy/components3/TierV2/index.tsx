import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import { useRouter } from 'next/navigation';
import useOrderFormStoreV3 from '../../stores/index_v3';

type Props = {
  templates: Array<IModelCategory[]> | null;
  originalData: IModelCategory[] | null;
  setValueOfPackage: (packageId: number | string | null) => void;
};

const TierV2 = ({ originalData, setValueOfPackage }: Props) => {
  const router = useRouter();
  const { field, setField } = useOrderFormStoreV3();

  const onLoadOldForm = () => {
    const oldForm = localStorage.getItem('bvm.customize-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    const fieldsNotInForm = originalData?.filter(
      (item) => !form.find((field) => field.key === item.key),
    );

    fieldsNotInForm?.forEach((item) => {
      setField(item.key, null, false);
    });

    form.forEach((item) => {
      if (item.multiChoice) {
        setField(
          item.key,
          item.options.map((opt) => opt.key),
          true,
        );
      } else {
        setField(item.key, item.options[0].key, true);
      }
    });
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

export default TierV2;
