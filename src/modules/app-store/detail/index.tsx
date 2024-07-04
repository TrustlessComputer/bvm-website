"use client";

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { DATA } from '@/modules/app-store/data';
import { compareString } from '@utils/string';

const AppDetailModule = () => {
  const params = useParams();
  const router = useRouter();

  const data: IAppInfo = useMemo(() => {
    return DATA.find(d => compareString(d.id, params?.id)) || {} as IAppInfo;
  }, [params?.id]);

  const status = useMemo(() => {
    return 'not_installed';
  }, []);

  const handleBack = () => {
    return router.back();
  }

  return (
    <Box className={s.container}>
      <Box className={"containerV3"}>
        <Flex className={s.back} onClick={handleBack}>
          <Text>Back</Text>
        </Flex>
        <Box className={s.content}>
          <Image className={s.avatar} src={data?.image}/>
          <Text className={s.status}>{status}</Text>
          <Text className={s.title}>{data?.title}</Text>
          <Text className={s.description}>{data?.description}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default AppDetailModule;
