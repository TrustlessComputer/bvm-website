import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import AppItem from '@/modules/app-store/item';
import { DATA } from '@/modules/app-store/data';

const AppStoreModule = () => {
  return (
    <Box className={s.container}>
      <Flex className={"containerV3"} direction={"column"} rowGap={"48px"}>
        <Text className={s.title}>You can choose any app to install</Text>
        <SimpleGrid columns={[1, 2, 3]} gap={"16px"}>
          {DATA.map(d => {
            return <AppItem data={d} />;
          })}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}

export default AppStoreModule;
