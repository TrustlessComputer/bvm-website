import React from 'react';

import useFormOrderStore from '../../stores/useFormOrderStore';

import styles from './styles.module.scss';
import useDappsStore from '../../stores/useDappStore';

type Props = {
  fieldKey: IModelCategory['key'];
};

const BoxOption = ({ fieldKey }: Props) => {
  // const { data } = useFormOrderStore();

  // const thisField = React.useMemo(() => {
  //   return data.find((item) => item.key === fieldKey);
  // }, [data, fieldKey]);

  const { dapps } = useDappsStore();

  const thisField = React.useMemo(() => {
    return dapps.find((item) => item.key === fieldKey);
  }, [dapps, fieldKey]);

  if (!thisField) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>{thisField.title}</div>

      <div className={styles.container__body}></div>
    </div>
  );
};

export default React.memo(BoxOption);
