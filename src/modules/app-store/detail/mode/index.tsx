import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CAppStoreApi from '@/services/api/app-store';
import { useState } from 'react';

const InstallMode = ({data}: {data: IModeInstall}) => {
  const { loggedIn, setShowLoginModalCustomize, userInfo } = useWeb3Auth();
  const cAppStoreApi = new CAppStoreApi();
  const [loading, setLoading] = useState(false);

  const handleInstall = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      try {
        setLoading(true)
        cAppStoreApi.orderBuyAPI({} as any);
      } catch (e) {

      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Flex className={s.container} direction={"column"}>
      <Text className={s.title}>{data?.title}</Text>
      <Text className={s.price}>{data?.price}</Text>
      <Button
        className={s.btnInstall}
        onClick={handleInstall}
        isLoading={loading}
        isDisabled={loading}
      >Install</Button>
    </Flex>
  )
}

export default InstallMode;
