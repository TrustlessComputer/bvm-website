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

import s from './styles.module.scss';
import uniqBy from 'lodash/uniqBy';
import cx from 'clsx';

type Props = {};

const Sidebar = ({}: Props) => {
  const {
    dapps: _dapps,
    setCurrentIndexDapp,
    currentIndexDapp,
  } = useDappsStore();

  const dapps = React.useMemo(
    () => uniqBy(_dapps, (item) => item.id),
    [_dapps],
  );

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
            </Button>
          );
        })}
      </div>

      <div className={s.footer}>
        <Button element="button" type="button" onClick={() => {}}>
          EXPORT{' '}
          <Image src="/icons/image.svg" alt="image" width={20} height={20} />
        </Button>
        <Button element="button" type="button" onClick={() => {}}>
          SHARE{' '}
          <Image
            src="/icons/twitter.svg"
            alt="twitter"
            width={20}
            height={20}
          />
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
