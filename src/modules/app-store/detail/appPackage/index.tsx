import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import SvgInset from '@components/SvgInset';
import { IDAppDetails } from '@/services/api/DAServices/types';

const AppPackage = ({data, onInstall}: {data: IDAppDetails, onInstall: any}) => {
  return (
    <Flex className={s.container} direction={"column"}>
      <Text className={s.title}>{data?.name}</Text>
      <Text className={s.description} mt={"8px"}>{data?.description}</Text>
      <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"} gap={"12px"}>
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
        onClick={() => onInstall(data)}
        mt={"37px"}
      >Install</Button>
      <Flex direction={"column"} gap={"16px"} mt={"40px"}>
        <Text className={s.includeTitle}>Includes:</Text>
        <Flex direction={"column"} gap={"16px"}>
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
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AppPackage;
