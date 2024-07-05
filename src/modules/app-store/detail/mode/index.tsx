import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CAppStoreApi from '@/services/api/app-store';
import { useState } from 'react';
import SvgInset from '@components/SvgInset';

const InstallMode = ({ data }: { data: IModeInstall }) => {
  const { loggedIn, login, userInfo } = useWeb3Auth();
  const cAppStoreApi = new CAppStoreApi();
  const [loading, setLoading] = useState(false);

  const handleInstall = () => {
    if (!loggedIn) {
      login();
    } else {
      try {
        setLoading(true);
        cAppStoreApi.orderBuyAPI({} as any);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Flex className={s.container} direction={'column'}>
      <Text className={s.title}>{data?.title}</Text>
      <Text className={s.description} mt={'8px'}>
        {data?.description}
      </Text>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        mt={'20px'}
        gap={'12px'}
      >
        <Text className={s.priceUsd}>${data?.price_usd}</Text>
        <Text className={s.priceBvm}>{data?.price_bvm} BVM</Text>
      </Flex>
      <Button
        className={s.btnInstall}
        onClick={handleInstall}
        isLoading={loading}
        isDisabled={loading}
        mt={'37px'}
      >
        Install
      </Button>
      <Flex direction={'column'} gap={'16px'} mt={'40px'}>
        <Text className={s.includeTitle}>Includes:</Text>
        <Flex direction={'column'} gap={'16px'}>
          {data?.includes?.map((i) => {
            return (
              <Flex gap={'8px'} alignItems={'center'}>
                <SvgInset
                  svgUrl={
                    i?.is_include
                      ? `/app-store/ic-include-check.svg`
                      : `/app-store/ic-include-x.svg`
                  }
                />
                <Text className={s.includeText}>{i?.title}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InstallMode;
