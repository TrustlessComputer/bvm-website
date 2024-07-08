"use client";

import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { DATA } from '@/modules/app-store/data';
import { compareString } from '@utils/string';
import InstallMode from '@/modules/app-store/detail/mode';
import SvgInset from '@components/SvgInset';
import { openModal } from '@/stores/states/modal/reducer';
import SettingView from '@/modules/app-store/detail/setting';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useDispatch } from 'react-redux';

const AppDetailModule = () => {
  const params = useParams();
  const router = useRouter();
  const { loggedIn, login, userInfo } = useWeb3Auth();
  const dispatch = useDispatch();

  const data: IAppInfo = useMemo(() => {
    return DATA.find(d => compareString(d.id, params?.id)) || {} as IAppInfo;
  }, [params?.id]);

  const handleBack = () => {
    return router.back();
  }

  const handleInstall = (mode: IModeInstall) => {
    if (!loggedIn) {
      login();
    } else {
      try {
        dispatch(openModal({
          id: 'SETTING_MODAL',
          className: s.modalContent,
          modalProps: {
            size: 'xl',
          },
          render: () => <SettingView app={data} mode={mode}/>,
        }));
      } catch (e) {

      } finally {
      }
    }
  }

  return (
    <Box className={s.container}>
      <Box className={"containerV3"}>
        <Flex className={s.back} onClick={handleBack} gap={"10px"} alignItems={"center"}>
          <SvgInset svgUrl={`/app-store/ic-back.svg`} />
          <Text>Dapps Store</Text>
        </Flex>
        <Box className={s.content}>
          <Flex gap={"24px"}>
            <Image className={s.avatar} src={data?.image}/>
            <Flex direction={"column"} gap={"8px"}>
              <Text className={s.title}>{data?.title}</Text>
              <Text className={s.description}>{data?.description}</Text>
            </Flex>
          </Flex>

          <Divider orientation={"horizontal"} bgColor={"#ECECEC"}/>

          <Flex gap={"12px"}>
            {
              data?.modes.map(m => {
                return (
                  <InstallMode data={m} onInstall={handleInstall}/>
                )
              })
            }
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default AppDetailModule;
