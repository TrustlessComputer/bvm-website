import React from 'react';
import Image from 'next/image';

import Button from '../Button';
import MModal from '../Modal';
import useDappsStore from '../../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappToggleSignal,
} from '../../signals/useFormDappsSignal';
import { draggedIds2DSignal } from '../../signals/useDragSignal';

import s from './styles.module.scss';
import cx from 'clsx';

type Props = {};

const Sidebar = ({}: Props) => {
  const { dapps, setCurrentIndexDapp, currentIndexDapp } = useDappsStore();

  const [isShowModal, setIsShowModal] = React.useState(false);
  const [selectedDappIndex, setSelectedDappIndex] = React.useState<
    number | null
  >(null);

  const handleSelectDapp = (index: number) => {
    setSelectedDappIndex(index);

    if(currentIndexDapp !== index) {
      setIsShowModal(true);
    }
  };

  const changeDapp = () => {
    formDappInputSignal.value = {};
    formDappDropdownSignal.value = {};
    formDappToggleSignal.value = {};
    draggedIds2DSignal.value = [];
    setIsShowModal(false);

    if (selectedDappIndex == null) return;
    setCurrentIndexDapp(selectedDappIndex);
  };

  return (
    <React.Fragment>
      <div className={s.header}>
        {dapps.map((dapp, index) => {
          return (
            <Button
              element="button"
              type="button"
              color="transparent"
              onClick={() => handleSelectDapp(index)}
              className={cx(currentIndexDapp === index ? s.isSelected : '')}
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

      <div className={s.footer}>
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
