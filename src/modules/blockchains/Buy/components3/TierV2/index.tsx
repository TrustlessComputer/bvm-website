import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import { useRouter, useSearchParams } from 'next/navigation';
import BaseModal from '../Modal';
import { Button } from '@chakra-ui/react';
import useOrderFormStoreV3 from '../../stores/index_v3';

type Props = {
  templates: Array<IModelCategory[]> | null;
  originalData: IModelCategory[] | null;
  setValueOfPackage: (packageId: number | string | null) => void;
};

const TierV2 = ({ templates, originalData, setValueOfPackage }: Props) => {
  const { field } = useOrderFormStoreV3();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<string | null>(null);

  const isSomethingChanged = () => {
    if (!originalData || !templates) return;
    const currentPackageId = searchParams.get('package') || '-1';

    let somethingChanged = false;
    const currentTemplate = (templates?.[Number(currentPackageId)] ||
      []) as IModelCategory[];
    const fieldsNotInTemplate = originalData?.filter(
      (item) => !currentTemplate.find((temp) => temp.key === item.key),
    );

    for (const _f of fieldsNotInTemplate) {
      if (field[_f.key].dragged) {
        somethingChanged = true;
        break;
      }
    }

    for (const _f of currentTemplate) {
      if (_f.options.length === 0) continue;

      const fieldTemplateValue = _f.options.find(
        (o) => o.key === field[_f.key].value,
      );

      if (!field[_f.key].dragged || !fieldTemplateValue) {
        somethingChanged = true;
        break;
      }
    }

    return somethingChanged;
  };

  const handleOk = () => {
    setValueOfPackage(selectedTier);
    setIsShowModal(false);
    setSelectedTier(null);
    if (searchParams.get('package') !== selectedTier) {
      router.push('/rollups/customizev2?package=' + selectedTier);
    }
  };

  const handleCancel = () => {
    setIsShowModal(false);
    setSelectedTier(null);
  };

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
                if (isSomethingChanged()) {
                  setIsShowModal(true);
                  setSelectedTier(tier.id);
                } else {
                  router.push('/rollups/customizev2?package=' + tier.id);
                  setValueOfPackage(tier.id);
                }
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

      <BaseModal
        isShow={isShowModal}
        onHide={() => setIsShowModal(false)}
        title="Select a template"
        size="small"
        theme="light"
      >
        Are you sure you want to clear your current configuration?
        <Button
          className={`${styles.btn} ${styles.btn__outline}`}
          size="sm"
          onClick={() => handleOk()}
        >
          Yes
        </Button>{' '}
        <Button
          className={`${styles.btn} ${styles.btn__primary}`}
          size="sm"
          onClick={() => handleCancel()}
        >
          No
        </Button>
      </BaseModal>
    </React.Fragment>
  );
};

export default TierV2;
