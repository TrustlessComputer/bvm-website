import { NodeNotificationProps } from '@/types/node';
import React from 'react';
import styles from './styles.module.scss';
import ResetButton from '../../component_v5/ResetButton_V2';

const NodeNotification = ({
  label,
  labelColor = '#4185ec',
  message,
}: NodeNotificationProps) => {
  return (
    <div className={styles.notification}>
      {label && (
        <React.Fragment>
          <span
            className={styles.label}
            style={{
              color: labelColor,
            }}
          >
            {label}
          </span>
          <span> - </span>
        </React.Fragment>
      )}
      <ResetButton />
      {message ??
        'This module must be configured and completed after chain deployment and payment confirmation.'}
    </div>
  );
};

export default NodeNotification;
