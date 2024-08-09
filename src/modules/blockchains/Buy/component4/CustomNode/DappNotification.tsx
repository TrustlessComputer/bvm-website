import React from 'react';
import s from './styles.module.scss';

type Props = {
  label?: string;
  message?: string;
};

const DappNotification = ({ label, message }: Props) => {
  return (
    <div className={s.notification}>
      <span className={s.notification__label}>{label ?? 'IMPORTANT'}</span> -
      {message ??
        'This module needs to be configured and completed later after the chain is deployed and the payment is confirmed'}
    </div>
  );
};

export default DappNotification;
