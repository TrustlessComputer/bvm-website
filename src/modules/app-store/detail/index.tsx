'use client';

import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
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
import AppPhotoView from '@/modules/app-store/detail/appPhotoView';
import { BG_COLOR } from '@/modules/app-store/item';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

const AppDetailModule = () => {
  const params = useParams();
  const router = useRouter();
  const { loggedIn, login, userInfo } = useWeb3Auth();
  const dispatch = useDispatch();
  const [data, setData] = useState<IDApp | undefined>(undefined);

  const photoUrl = useMemo(() => {
    return [
      'https://react-photo-view.vercel.app/_next/static/media/1.c788857d.jpg',
      'https://react-photo-view.vercel.app/_next/static/media/2.b43f1ead.jpg',
      'https://react-photo-view.vercel.app/_next/static/media/3.70695fb9.jpg',
      'https://react-photo-view.vercel.app/_next/static/media/4.57ff8e86.jpg',
      'https://react-photo-view.vercel.app/_next/static/media/5.7ace37c7.jpg',
      'https://react-photo-view.vercel.app/_next/static/media/6.0271162c.jpg',
    ];
  }, []);
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  // const indexBg = useMemo(() => {
  //   return ((data?.id || 0) - 1) % BG_COLOR.length;
  // }, [data]);

  useEffect(() => {
    if (params?.id) {
      getAppInfo(params?.id as string);
    }
  }, [params?.id]);

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
            <Image className={s.avatar} src={data?.image_url} />
            <Flex direction={'column'} gap={'8px'}>
              <Text className={s.title}>{data?.name}</Text>
              <Text className={s.description}>{data?.description}</Text>
            </Flex>
          </Flex>
          <AppPhotoView photoUrl={photoUrl} />
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
