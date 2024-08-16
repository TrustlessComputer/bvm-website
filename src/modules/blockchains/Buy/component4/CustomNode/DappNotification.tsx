import React from 'react';
import s from './styles.module.scss';

type Props = {
  label?: string;
  message?: string;
};

const DappNotification = ({ label, message }: Props) => {
  return (
    <div className={s.notification}>
      {message ??
        'This module must be configured and completed after chain deployment and payment confirmation.'}
    </div>
  );
};

export default DappNotification;
