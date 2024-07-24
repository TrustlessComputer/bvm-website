import React from 'react';
import Image from 'next/image';

import { FormDappUtil } from '../../utils';
import { FieldKeyPrefix } from '../../contants';
import useDappsStore from '../../stores/useDappStore';
import {
  formDappDropdownSignal,
  formDappInputSignal,
  formDappSignal,
  formDappToggleSignal,
} from '../../signals/useFormDappsSignal';

import s from './styles.module.scss';
import useSubmitForm from '../../hooks/useSubmitForm';
import { Button } from '@chakra-ui/react';
import ErrorModal from '../ErrorModal';
import TopupModal from '../TopupModal';

type Props = {};

const LaunchButton = () => {
  const {
    onSubmit,
    isLoading,
    errorData,
    isShowError,
    setIsShowError,
    topupInfo,
    isShowTopup,
    setIsShowTopup,
  } = useSubmitForm();

  const handleLaunch = () => {
    console.log('formDappSignal', JSON.stringify(formDappSignal.value));
  };

  return (
    <>
      <Button
        isLoading={isLoading}
        className={s.button}
        type={'submit'}
        // onClick={onSubmit}
        onClick={handleLaunch}
      >
        Launch <Image src="/launch.png" alt="launch" width={24} height={24} />
      </Button>
      <ErrorModal
        title="Missing Required"
        show={isShowError}
        onHide={() => setIsShowError(false)}
        closeText="Retry"
        className={s.modalError}
      >
        <ul className={s.fields}>
          {errorData &&
            errorData?.length > 0 &&
            errorData?.map((item) => {
              return (
                <li key={item.key} className={s.fields__field}>
                  {item.error}
                </li>
              );
            })}
        </ul>
      </ErrorModal>
      <TopupModal
        show={isShowTopup}
        infor={topupInfo}
        onClose={() => {
          setIsShowTopup(false);
        }}
      />
    </>
  );
};

export default LaunchButton;
