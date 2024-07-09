"use client";

import { Box, Divider, Flex, Image, Square, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import AppPackage from 'src/modules/app-store/detail/appPackage';
import SvgInset from '@components/SvgInset';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import SettingView from '@/modules/app-store/detail/setting';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useDispatch } from 'react-redux';
import { BuyProvider } from '@/modules/blockchains/providers/Buy.context';
import dAppServicesAPI from '@/services/api/DAServices';
import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import { BG_COLOR } from '@/modules/app-store/item';

const AppDetailModule = () => {
  const params = useParams();
  const router = useRouter();
  const { loggedIn, login, userInfo } = useWeb3Auth();
  const dispatch = useDispatch();
  const [data, setData] = useState<IDApp | undefined>(undefined);

  const indexBg = useMemo(() => {
    return ((data?.id || 0) - 1) % BG_COLOR.length;
  }, [data]);

  useEffect(() => {
    if(params?.id) {
      getAppInfo(params?.id as string);
    }
  }, [params?.id]);

  const getAppInfo = async (id: string) => {
    const res = await dAppServicesAPI.fetchDAppByID(Number(id));
    setData(res);
  }

  const handleBack = () => {
    return router.back();
  }

  const handleInstall = (appPackage: IDAppDetails) => {
    if (!loggedIn) {
      login();
    } else {
      const id = 'SETTING_MODAL';
      const onClose = () => dispatch(closeModal({id: id}));
      try {
        dispatch(openModal({
          id: id,
          className: s.modalContent,
          modalProps: {
            size: 'xl',
          },
          render: () =>
            <BuyProvider>
              <SettingView app={data} appPackage={appPackage} onClose={onClose}/>
            </BuyProvider>
          ,
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
            <Square
              bg={BG_COLOR[indexBg]}
              size={"120px"}
              borderRadius={'18px'}
              padding={"15px"}
            >
              <Image className={s.avatar} src={data?.image_url}/>
            </Square>
            <Flex direction={"column"} gap={"8px"}>
              <Text className={s.title}>{data?.name}</Text>
              <Text className={s.description}>{data?.description}</Text>
            </Flex>
          </Flex>

          <Divider orientation={"horizontal"} bgColor={"#ECECEC"}/>

          <Flex gap={"12px"}>
            {
              data?.details.map(m => {
                return (
                  <AppPackage data={m} onInstall={handleInstall}/>
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
