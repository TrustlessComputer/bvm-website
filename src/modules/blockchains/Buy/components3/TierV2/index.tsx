import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import tierData from './data';
import { useRouter, useSearchParams } from 'next/navigation';
import BaseModal from '../Modal';
import { Button } from '@chakra-ui/react';

type Props = {
  setValueOfPackage: (packageId: number | string | null) => void;
};

const TierV2 = ({ setValueOfPackage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<string | null>(null);

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
                setIsShowModal(true);
                setSelectedTier(tier.id);
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
        Are you sure you want to select this template?{' '}
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
