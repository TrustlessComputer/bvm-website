import { NodeNotificationProps } from '@/types/node';
import React from 'react';
import styles from './styles.module.scss';

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
      {message ??
        'This module must be configured and completed after chain deployment and payment confirmation.'}
    </div>
  );
};

export default NodeNotification;
