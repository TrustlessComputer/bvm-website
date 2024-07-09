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
        handleSelectApp(data);
      }}
    >
      <Flex gap={"24px"} h={"100%"}>
        <Flex alignItems={"center"} h={"100%"}>
          <Image className={s.avatar} src={data?.image_url} />
        </Flex>
        <Flex direction={"column"} gap={'8px'} h={"100%"}>
          <Text className={s.title}>{data?.name}</Text>
          <Text className={s.description}>
            {data?.description}
          </Text>
        </Flex>
      </Flex>
      <Button className={s.btnInstall}>
        {
          data?.status === '0' ? 'Comming Soon' : 'Install'
        }
      </Button>
    </Flex>
  );
};

export default AppItem2;
