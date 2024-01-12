import styles from './styles.module.scss';
import React from 'react';
import Loading from '@/components/Loading';
import cs from 'clsx';

interface IProps {
  className?: string | undefined;
}

const AppLoading = React.memo((props: IProps) => {
  return (
    <div className={cs(styles.container, props.className)}>
      <Loading />
    </div>
  );
});

AppLoading.displayName = 'AppLoading';

export default AppLoading;
