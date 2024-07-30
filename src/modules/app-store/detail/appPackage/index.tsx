import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import { useMemo } from 'react';

const AppPackage = ({data, app, onInstall}: {data: IDAppDetails, app: IDApp, onInstall: any}) => {
  const isCommingSoon = useMemo(() => {
    return app?.status === 'incoming' || data.status === 'incoming';
  }, [app])

  const isInstalled = useMemo(() => {
    return app?.user_package?.find(item => Number(item.app_store_detail_id) === Number(data?.id));
  }, [app?.user_package]);

  return (
    <Flex className={s.container} gap={"40px"} justifyContent={"space-between"}>
      <Flex direction={"column"}>
        <Text className={s.title}>{data?.name}</Text>
        <Text className={s.description} mt={"8px"}>{data?.description}</Text>
        <SimpleGrid gridTemplateColumns={"repeat(2, minmax(0, 440px))"} gap={"24px"} mt={"32px"}>
          {
            data?.includes?.map(i => {
              return (
                <Flex gap={"8px"} alignItems={"center"}>
                  <SvgInset svgUrl={i?.valid === '1' ? `/app-store/ic-include-check.svg` : `/app-store/ic-include-x.svg`} />
                  <Text className={s.includeText}>{i?.name}</Text>
                </Flex>
              )
            })
          }
        </SimpleGrid>
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"12px"}>
          {
            Number(data?.price_usd) > 0 ? (
              <>
                <Text className={s.priceUsd}>${data?.price_usd}</Text>
                <Text className={s.priceBvm}>{data?.price_bvm} BVM</Text>
              </>
            ) : (
              <><Text className={s.priceUsd}>Free</Text>
              </>
            )
          }
        </Flex>
        <Button
          className={s.btnInstall}
          onClick={() => !isCommingSoon && onInstall(data)}
          mt={"12px"}
          isDisabled={isCommingSoon}
        >
          {
            isCommingSoon ? 'Comming Soon' : isInstalled ? 'Installed' : 'Install'
          }
        </Button>
      </Flex>
    </Flex>
  )
}

export default AppPackage;
