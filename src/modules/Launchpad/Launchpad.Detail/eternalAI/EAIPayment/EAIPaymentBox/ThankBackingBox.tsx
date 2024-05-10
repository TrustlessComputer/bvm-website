import styles from './styles.module.scss';

const ThankBackingBox = () => {
  return (
    <div className={styles.thankBox}>
      <span className={styles.thankBox_title}>
        Thank you <span>🙌</span> for your contribution!
      </span>
      <p className={styles.thankBox_content}>
        You will be able to claim your $EAI at TGE. Stay tuned for more updates.
      </p>
    </div>
  );
};

export default ThankBackingBox;
