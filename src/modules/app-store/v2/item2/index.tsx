import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { IDApp } from '@/services/api/DAServices/types';

const AppItem2 = ({
  data,
  handleSelectApp,
}: {
  data: IDApp;
  handleSelectApp: (item: IDApp) => void;
}) => {
  return (
    <Flex
      className={s.container}
      gap={"24px"}
      justifyContent={"space-between"}
      onClick={() => {
        if(data?.status === 'incoming')  return;
        handleSelectApp(data);
      }}
      cursor={data?.status === 'incoming' ? 'initial' : 'pointer'}
    >
      <Flex gap={"24px"} h={"100%"}>
        <Flex alignItems={"center"} h={"100%"}>
          <Image className={s.avatar} src={data?.icon_url} />
        </Flex>
        <Flex direction={"column"} gap={'8px'} h={"100%"}>
          <Text className={s.title}>{data?.name}</Text>
          <Text className={s.description}>
            {data?.description}
          </Text>
        </Flex>
      </Flex>
      <Button className={s.btnInstall} cursor={data?.status === 'incoming' ? 'initial' : 'pointer'}>
        {
          data?.status === 'incoming' ? 'Comming Soon' : 'Install'
        }
      </Button>
    </Flex>
  );
};

export default AppItem2;
