import React from 'react';
import Image from 'next/image';

import Button from '../Button';
import MModal from '../Modal';
import useDappsStore from '../../stores/useDappStore';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../../signals/useFormDappsSignal';
import {
  draggedIds2DSignal,
  templateIds2DSignal,
} from '../../signals/useDragSignal';

import styles from './styles.module.scss';
import uniqBy from 'lodash/uniqBy';

type Props = {};

const Sidebar = ({}: Props) => {
  const { dapps: _dapps, setCurrentIndexDapp, currentIndexDapp } = useDappsStore();

  const dapps = React.useMemo(() => uniqBy(_dapps, item => item.id), [_dapps])

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [selectedDappIndex, setSelectedDappIndex] = React.useState<
    number | null
  >(null);

  const handleSelectDapp = (index: number) => {
    setSelectedDappIndex(index);

    if (currentIndexDapp !== index) {
      setIsShowModal(true);
    }
  };

  const changeDapp = () => {
    formDappSignal.value = {};
    draggedIds2DSignal.value = [];

    formTemplateDappSignal.value = {};
    templateIds2DSignal.value = [];

    setIsShowModal(false);

    if (selectedDappIndex == null) return;
    setCurrentIndexDapp(selectedDappIndex);
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        {dapps.map((dapp, index) => {
          return (
            <Button
              element="button"
              type="button"
              color="transparent"
              onClick={() => handleSelectDapp(index)}
              className={styles.resetButton}
            >
              <div>
                {dapp.icon && (
                  <Image src={dapp.icon} width={16} height={16} alt="icon" />
                )}{' '}
                {dapp.title}
              </div>
              <div />
            </Button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Button element="button" type="button" onClick={() => {}}>
          EXPORT
        </Button>
        <Button element="button" type="button" onClick={() => {}}>
          SHARE
        </Button>
      </div>

      <MModal
        title="Change Dapp will reset all the changes you made. Continue?"
        show={isShowModal}
        onOk={changeDapp}
        onHide={() => setIsShowModal(false)}
        okText="Yes"
        closeText="No"
      />
    </React.Fragment>
  );
};

export default Sidebar;
