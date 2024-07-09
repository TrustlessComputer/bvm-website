import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { IDApp } from '@/services/api/DAServices/types';

const AppItem = ({
  data,
  handleSelectApp,
}: {
  data: IDApp;
  handleSelectApp: (item: IDApp) => void;
}) => {
  return (
    <Flex
      className={s.container}
      onClick={() => {
        handleSelectApp(data);
      }}
    >
      <Flex
        bg={'#FAFAFA'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'12px'}
        padding={"20px"}
      >
        <Image className={s.avatar} src={data?.image_url} />
      </Flex>
      <Flex alignItems={'center'} mt={'24px'} gap={'24px'}>
        <Text className={s.title}>{data?.name}</Text>
        <Text className={s.status}><Text as={"span"} className={s.number}>{data?.installed}</Text> INSTALLED</Text>
      </Flex>
      <Text className={s.description} mt={'8px'}>
        {data?.description}
      </Text>
      <Button className={s.btnInstall} mt={'24px'}>
        Install
      </Button>
    </Flex>
  );
};

export default AppItem;
