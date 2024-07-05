import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CAppStoreApi from '@/services/api/app-store';
import { useState } from 'react';
import SvgInset from '@components/SvgInset';

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
      <Text className={s.description} mt={"8px"}>For organizations who need customization and dedicated support</Text>
      <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"} gap={"12px"}>
        <Text className={s.priceUsd}>$99</Text>
        <Text className={s.priceBvm}>200 BVM</Text>
      </Flex>
      <Button
        className={s.btnInstall}
        onClick={handleInstall}
        isLoading={loading}
        isDisabled={loading}
        mt={"37px"}
      >Install</Button>
      <Flex direction={"column"} gap={"16px"} mt={"40px"}>
        <Text className={s.includeTitle}>Includes:</Text>
        <Flex direction={"column"} gap={"16px"}>
          <Flex gap={"8px"} alignItems={"center"}>
            <SvgInset svgUrl={`/app-store/ic-include-check.svg`} />
            <Text className={s.includeText}>Customize-able</Text>
          </Flex>
          <Flex gap={"8px"} alignItems={"center"}>
            <SvgInset svgUrl={`/app-store/ic-include-check.svg`} />
            <Text className={s.includeText}>Customize-able</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InstallMode;
