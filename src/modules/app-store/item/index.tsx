import { Flex, Image, Text } from '@chakra-ui/react';
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
      <Image className={s.avatar} src={data?.image}/>
      <Text className={s.status}>{status}</Text>
      <Text className={s.title}>{data?.title}</Text>
      <Text className={s.description}>{data?.description}</Text>
    </Flex>
  )
}

export default AppItem;
