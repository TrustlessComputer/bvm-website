import styles from './styles.module.scss';

export default function ScrollDown() {
  return (
    <div className={styles.scroll_msg_container}>
      <div className={styles.scroll_msg_inner}>
        <div className={styles.scroll_msg_wheel}></div>
      </div>
    </div>
  );
}
