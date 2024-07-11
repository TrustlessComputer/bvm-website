'use client';

import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppPackage from 'src/modules/app-store/detail/appPackage';
import SvgInset from '@components/SvgInset';
import { closeModal, openModal } from '@/stores/states/modal/reducer';
import SettingView from '@/modules/app-store/detail/setting';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useDispatch } from 'react-redux';
import { BuyProvider } from '@/modules/blockchains/providers/Buy.context';
import dAppServicesAPI from '@/services/api/DAServices';
import { IDApp, IDAppDetails } from '@/services/api/DAServices/types';
import AppPhotoView from '@/modules/app-store/detail/appPhotoView';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import useL2Service from '@/hooks/useL2Service';
import { commonSelector } from '@/stores/states/common/selector';

const AppDetailModule = () => {
  const params = useParams();
  const router = useRouter();
  const { loggedIn, login, userInfo } = useWeb3Auth();
  const { getAccountInfor } = useL2Service();
  const dispatch = useDispatch();
  const [data, setData] = useState<IDApp | undefined>(undefined);

  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const needReload = useAppSelector(commonSelector).needReload;

  useEffect(() => {
    if (loggedIn) {
      getAccountInfor();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (params?.id && accountInforL2Service?.tcAddress) {
      getAppInfo(params?.id as string);
    }
  }, [params?.id, accountInforL2Service, needReload]);

  const getAppInfo = async (id: string) => {
    const res = await dAppServicesAPI.fetchDAInstalledByUserAddress(
      Number(id),
      accountInforL2Service?.tcAddress!,
    );
    setData(res);
  };

  const handleBack = () => {
    return router.back();
  };

  const handleInstall = (appPackage: IDAppDetails) => {
    if (!loggedIn) {
      login();
    } else {
      const id = 'SETTING_MODAL';
      const onClose = () => dispatch(closeModal({ id: id }));
      try {
        dispatch(
          openModal({
            id: id,
            className: s.modalContent,
            modalProps: {
              size: 'xl',
            },
            render: () => (
              <BuyProvider>
                <SettingView
                  app={data}
                  appPackage={appPackage}
                  onClose={onClose}
                />
              </BuyProvider>
            ),
          }),
        );
      } catch (e) {
      } finally {
      }
    }
  };

  return (
    <Box className={s.container}>
      <Box className={'containerV3'}>
        <Flex
          className={s.back}
          onClick={handleBack}
          gap={'10px'}
          alignItems={'center'}
        >
          <SvgInset svgUrl={`/app-store/ic-back.svg`} />
          <Text>Dapps Store</Text>
        </Flex>
        <Box className={s.content}>
          <Flex gap={'24px'}>
            <Image className={s.avatar} src={data?.icon_url} />
            <Flex direction={'column'} gap={'8px'}>
              <Text className={s.title}>{data?.name}</Text>
              <Text className={s.description}>{data?.description}</Text>
            </Flex>
          </Flex>
          <AppPhotoView photoUrl={data?.list_image_url || []} />
          <Divider orientation={'horizontal'} bgColor={'#ECECEC'} />
          <Flex gap={'40px'} direction={'column'}>
            {data?.details.map((m) => {
              return (
                <AppPackage data={m} app={data} onInstall={handleInstall} />
              );
            })}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default AppDetailModule;
