import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { IDApp } from '@/services/api/DAServices/types';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

const AppItem3 = ({
  data,
  handleSelectApp,
}: {
  data: IDApp;
  handleSelectApp: (item: IDApp) => void;
}) => {
  const { loggedIn, login } = useWeb3Auth();
  return (
    <Flex
      className={s.container}
      gap={'32px'}
      onClick={() => {
        if (!loggedIn) {
          login();
        } else {
          handleSelectApp(data);
        }
      }}
    >
      <Image className={s.avatar} src={data?.image_url} />
      <Flex direction={'column'} gap={'8px'}>
        <Text className={s.title}>{data?.name}</Text>
        <Text className={s.description}>{data?.description}</Text>
        <Button className={s.btnInstall} mt={'8px'}>
          {data?.status === '0' ? 'Comming Soon' : 'Install'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AppItem3;
