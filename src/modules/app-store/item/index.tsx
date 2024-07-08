import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { APP_STORE } from '@constants/route-path';
import { useMemo } from 'react';

const AppItem = ({data}: {data: IAppInfo}) => {
  const router = useRouter();

  const handleSelectApp = () => {
    router.push(`${APP_STORE}/${data?.id}`)
  }

  const status = useMemo(() => {
    return 'not_installed';
  }, [])

  return (
    <Flex className={s.container} onClick={handleSelectApp}>
      <Flex bg={"#FAFAFA"} alignItems={"center"} justifyContent={"center"} borderRadius={"12px"}>
        <Image className={s.avatar} src={data?.image}/>
      </Flex>
      <Flex alignItems={"center"} mt={"24px"} gap={"24px"}>
        <Text className={s.title}>{data?.title}</Text>
        <Flex gap={"8px"} alignItems={"center"}>
          <Text className={s.number}>{data?.num_installed}</Text>
          <Text className={s.status}>INSTALLED</Text>
        </Flex>
      </Flex>
      <Text className={s.description} mt={"8px"}>{data?.description}</Text>
      <Button className={s.btnInstall} mt={"24px"}>Install</Button>
    </Flex>
  )
}

export default AppItem;
