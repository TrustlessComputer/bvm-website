import BaseModal from '@/components/BaseModal';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';
import ItemStep, { IItemCommunity, StepTagType } from '@/modules/Whitelist/stepsEco/Step';
import styles from '@/modules/Whitelist/leaderBoard/styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import { LearnMore } from '@/modules/Whitelist/stepsEco';
import AuthenStorage from '@/utils/storage/authen.storage';

const DownloadBitcoinArcadeModal = ({ isShow, onHide }: any) => {
  const qrInfo = `https://play.bitcoinarcade.xyz/`;
  const token = AuthenStorage.getAuthenKey();
  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        project: 'Bitcoin L2 for GameFi',
        title: "Bitcoin Arcade",
        desc: `<span style='font-style: italic'>The first ever fully on-chain gaming blockchain on Bitcoin.</span>${LearnMore(
          'https://bitcoinarcade.xyz/',
        )}<br/>
        Get rewarded with 1,000 PTS for every match you play on Bitcoin Arcade. Have fun, play, and earn more points.<br/><br/><span style="font-size: 18px">Invite code: <strong>ARCADE</strong></span>
        `,
        actionText: '',
        image: 'bitcoin-arcade.svg',
        isActive: true,
        actionHandle: () => {
        },
        right: {
          title: '',
          desc: '',
        },
      },
    ];
  }, [token]);


  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Download Bitcoin Arcade app'}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
    >
      <div className={s.container}>
        <div className={s.content}>
          <Box className={s.qrWrapper}>
            <QRCode className={s.qrCode} size={200} value={qrInfo} />
            <Flex
              fontSize={'14px'}
              flexDirection="column"
              alignItems="center"
              px="12px"
              gap="4px"
              mb="32px"
            >
              <Text textAlign="center">
                Scan the QR code to download the app.<br/>
                Or simply open the link in a phone browser:{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href={qrInfo}
                >
                  {qrInfo}
                </a>
              </Text>
            </Flex>
            {DATA_COMMUNITY.map((item, index) => {
              return (
                <ItemStep
                  key={index}
                  index={index}
                  content={item}
                  isLoading={false}
                />
              );
            })}
            {/*<Flex*/}
            {/*  fontSize={'14px'}*/}
            {/*  flexDirection="column"*/}
            {/*  px={'12px'}*/}
            {/*  py={'8px'}*/}
            {/*  gap="4px"*/}
            {/*  bg="#FFF8F3"*/}
            {/*  mt="16px"*/}
            {/*  border="1px solid #FF7E214D"*/}
            {/*>*/}
            {/*  <Text textAlign="center">*/}
            {/*    invite code: <strong>ARCADE</strong>*/}
            {/*  </Text>*/}
            {/*</Flex>*/}
          </Box>
        </div>
      </div>
    </BaseModal>
  );
};

export default DownloadBitcoinArcadeModal;
