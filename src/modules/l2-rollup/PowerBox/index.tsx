import { Text } from '@chakra-ui/react';
import styles from './styles.module.scss';

const PowerBox = () => {
  return (
    <Text color="white" fontWeight="700" fontSize="12px" className={styles.box}>
      <span style={{ opacity: 0.6 }}>
        Image by
      </span> <a href="https://eternalai.org/" target="_blank">Eternal AI</a>
    </Text>
  )
}

export default PowerBox;
