import React, { useState } from 'react';

import styles from './styles.module.scss';
import tierData from './data';
import { useSearchParams, useRouter } from 'next/navigation';
import useOrderFormStoreV3 from '../../stores/index_v3';
import { Select } from '@chakra-ui/react';

type Props = {
  templates: Array<IModelCategory[]> | null;
  originalData: IModelCategory[] | null;
  setValueOfPackage: (packageId: number | string | null) => void;
};

const TierOptions = ({ originalData, setValueOfPackage }: Props) => {
  const router = useRouter();
  const { field, setField } = useOrderFormStoreV3();
  const searchParams = useSearchParams();
  const useCase = searchParams.get('use-case');
  const [useCaseSelected, setUseCaseSelected] = useState<number | null>(useCase ? Number(useCase) : null);


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

            <Select placeholder="Select use case" onChange={(e) => {
              const tierId = Number(e.target.value);
              setUseCaseSelected(tierId);
              setValueOfPackage(tierId);
              router.push('/rollups/customizev2?use-case=' + tierId);
            }}>
              {
                tierData.map((tier) => (
                  <option selected={useCaseSelected === Number(tier.id)} value={tier.id}>{tier.title}</option>
                ))
              }
            </Select>
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

export default TierOptions;
