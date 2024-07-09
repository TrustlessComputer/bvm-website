import { Button, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { IDApp } from '@/services/api/DAServices/types';
import { useMemo } from 'react';

const BG_COLOR = [
  '#FAFAFA',
  'linear-gradient(0deg, #0071BC 0%, #1797D5 40%, #61FFF7 100%)',
  'linear-gradient(0deg, #F15A24 0%, #F7931E 40%, #FBB03B 100%)',
  '#B3FFBF'
]

const AppItem = ({
  data,
  handleSelectApp,
}: {
  data: IDApp;
  handleSelectApp: (item: IDApp) => void;
}) => {
  const indexBg = useMemo(() => {
    return (data?.id - 1) % BG_COLOR.length;
  }, [data]);

  return (
    <Flex
      className={s.container}
      onClick={() => {
        handleSelectApp(data);
      }}
    >
      <Flex
        bg={BG_COLOR[indexBg]}
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
