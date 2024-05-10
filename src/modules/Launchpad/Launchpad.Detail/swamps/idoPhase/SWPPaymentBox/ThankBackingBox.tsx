import styles from './styles.module.scss';

const ThankBackingBox = () => {
  return (
    <div className={styles.thankBox}>
      <span className={styles.thankBox_title}>
        Thank you <span>🙌</span> for your contribution!
      </span>
    </div>
  );
};

export default ThankBackingBox;
