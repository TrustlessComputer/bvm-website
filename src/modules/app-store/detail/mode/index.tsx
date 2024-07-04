import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

const InstallMode = ({data}: {data: IModeInstall}) => {
  const handleInstall = () => {
    alert('install')
  }

  return (
    <Flex className={s.container} direction={"column"}>
      <Text className={s.title}>{data?.title}</Text>
      <Text className={s.price}>{data?.price}</Text>
      <Button className={s.btnInstall} onClick={handleInstall}>Install</Button>
    </Flex>
  )
}

export default InstallMode;
