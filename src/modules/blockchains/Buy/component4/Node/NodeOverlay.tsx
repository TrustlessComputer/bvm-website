import { NodeOverlayProps } from '@/types/node';

import Loading from '@/components/Loading';
import Button from '../Button';
import styles from './styles.module.scss';

const NodeOverlay = ({ ...props }: NodeOverlayProps) => {
  return (
    <div className={styles.nodeOverlay}>
      <div className={styles.nodeOverlay__content}>
        {props.type === 'loading' && <Loading />}

        {props.type === 'action' && (
          <Button onClick={props.action.onClick}>{props.action.label}</Button>
        )}
      </div>
    </div>
  );
};

export default NodeOverlay;
