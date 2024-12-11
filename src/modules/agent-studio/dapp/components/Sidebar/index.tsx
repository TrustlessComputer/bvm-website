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
import { compareString } from '@utils/string';
import { useSearchParams } from 'next/navigation';

type Props = {};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Sidebar = ({}: Props) => {
  const {
    dapps: _dapps,
    setCurrentIndexDapp,
    currentIndexDapp,
  } = useDappsStore();

  const refInited = React.useRef(false);

  const params = useSearchParams();

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

  const changeDapp = (newIndex?: number) => {
    formDappSignal.value = {};
    draggedIds2DSignal.value = [];

    formTemplateDappSignal.value = {};
    templateIds2DSignal.value = [];

    setIsShowModal(false);
    if (newIndex) {
      setCurrentIndexDapp(newIndex);
      return;
    }

    if (selectedDappIndex == null) return;
    setCurrentIndexDapp(selectedDappIndex);
  };

  React.useEffect(() => {
    if (!!dapps?.length) return;

    const newIndex =
      dapps?.findIndex((item) => compareString(item.id, params?.get('dapp'))) ||
      0;

    if (newIndex >= 0 && !refInited.current) {
      changeDapp(newIndex);
    }

    refInited.current = true;
  }, [dapps]);

  const randomColors = React.useMemo(() => {
    return Array.from({ length: 30 })?.map(() => getRandomColor());
  }, []);

  if (!dapps?.length) {
    return <></>;
  }

  return (
    <React.Fragment>
      <div className={s.header}>
        {dapps.map((dapp, index) => {
          return (
            <Button
              key={dapp.key}
              element="button"
              type="button"
              color="transparent"
              onClick={() => handleSelectDapp(index)}
              className={cx(currentIndexDapp === index ? s.isSelected : '')}
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="path-1-inside-1_40431_565"
                    fill={randomColors?.[index]}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 4C8.89543 4 8 4.89543 8 6V8H5C3.89543 8 3 8.89543 3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10C21 8.89543 20.1046 8 19 8H16V6C16 4.89543 15.1046 4 14 4H10Z"
                    />
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 4C8.89543 4 8 4.89543 8 6V8H5C3.89543 8 3 8.89543 3 10V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V10C21 8.89543 20.1046 8 19 8H16V6C16 4.89543 15.1046 4 14 4H10Z"
                    fill={randomColors?.[index]}
                  />
                  <path
                    d="M8 8V9H9V8H8ZM16 8H15V9H16V8ZM9 6C9 5.44772 9.44772 5 10 5V3C8.34315 3 7 4.34315 7 6H9ZM9 8V6H7V8H9ZM5 9H8V7H5V9ZM4 10C4 9.44772 4.44772 9 5 9V7C3.34315 7 2 8.34315 2 10H4ZM4 18V10H2V18H4ZM5 19C4.44772 19 4 18.5523 4 18H2C2 19.6569 3.34315 21 5 21V19ZM19 19H5V21H19V19ZM20 18C20 18.5523 19.5523 19 19 19V21C20.6569 21 22 19.6569 22 18H20ZM20 10V18H22V10H20ZM19 9C19.5523 9 20 9.44771 20 10H22C22 8.34315 20.6569 7 19 7V9ZM16 9H19V7H16V9ZM15 6V8H17V6H15ZM14 5C14.5523 5 15 5.44772 15 6H17C17 4.34315 15.6569 3 14 3V5ZM10 5H14V3H10V5Z"
                    fill="#CC6234"
                    mask="url(#path-1-inside-1_40431_565)"
                  />
                </svg>
              </div>
              <div
                className={cx(
                  s.title,
                  compareString(currentIndexDapp, index)
                    ? s.title_isSelected
                    : '',
                )}
              >
                <h4>{dapp.title}</h4>
              </div>
            </Button>
          );
        })}
      </div>

      <div className={s.footer}>
        {/*<Button element="button" type="button" onClick={() => {}}>*/}
        {/*  EXPORT{' '}*/}
        {/*  <Image src="/icons/image.svg" alt="image" width={20} height={20} />*/}
        {/*</Button>*/}
        {/*<Button element="button" type="button" onClick={() => {}}>*/}
        {/*  SHARE{' '}*/}
        {/*  <Image*/}
        {/*    src="/icons/twitter.svg"*/}
        {/*    alt="twitter"*/}
        {/*    width={20}*/}
        {/*    height={20}*/}
        {/*  />*/}
        {/*</Button>*/}
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
