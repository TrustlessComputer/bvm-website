import styles from './styles.module.scss';

export default function MessageStream({ message }: { message: string }) {
  return <div className={styles.message}>{message}</div>;
}
