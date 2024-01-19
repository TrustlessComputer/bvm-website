import BaseModal from '@/components/BaseModal';
import { PERP_NAKA_API_URL } from '@/config';
import { apiClient } from '@/services';
import { verifyNaka } from '@/services/player-share';
import { decryptAES, generateRandomString } from '@/utils/encryption';
import { Box, Flex, ListItem, OrderedList, Text } from '@chakra-ui/react';
import React from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { v4 as uuidv4 } from 'uuid';
import s from './styles.module.scss';

const VerifyBVMModal = ({ isShow, onHide }: any) => {
  const publicCode = uuidv4();
  const privateCode = uuidv4();

  const randomCode = generateRandomString(10);
  const publicCodeInput = randomCode.substring(0, 2);
  const privateCodeInput = randomCode.substring(2, 10);

  const qrInfo = JSON.stringify({
    publicCode: publicCode,
    privateCode: privateCode,
  });

  const getSyncData = async (publicCode: string) => {
    try {
      const res: any = await Promise.allSettled([
        apiClient.get(
          `${PERP_NAKA_API_URL}/api/users/qr-sync?token=${publicCode}`,
        ),
        apiClient.get(
          `${PERP_NAKA_API_URL}/api/users/qr-sync?token=${publicCodeInput}`,
        ),
      ]);
      let rs = '';
      let descryptCode = '';

      if (res[0].value) {
        rs = res[0].value;
        descryptCode = privateCode;
      } else if (res[1].value) {
        rs = res[1].value;
        descryptCode = privateCodeInput;
      }

      if (rs) {
        const data = JSON.parse(decryptAES(rs, descryptCode));
        if (data && data.address) {
          await verifyNaka(data);
          toast.success('Verify Naka successfully!');
          onHide && onHide();
        }
      }
    } catch (error) {
      toast.error('Can not verify Naka.');
    }
  };

  React.useEffect(() => {
    getSyncData(publicCode);
    const interval = setInterval(() => {
      getSyncData(publicCode);
    }, 5000); // 5s
    return () => {
      clearInterval(interval);
    };
  }, [publicCode]);

  const getDownloadAppUrl = () => {
    return 'https://nakachain.xyz/app';
  };

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Scan to verify Naka'}
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
              px={'12px'}
              py={'8px'}
              gap="4px"
              bg="#F4EADB"
              border="1px solid #FF7E214D"
            >
              <Text
                textAlign="left"
                fontSize={'16px'}
                fontWeight={600}
                mb="4px"
              >
                How to sync your Naka Genesis to the BVM:
              </Text>
              <OrderedList fontWeight={400}>
                <ListItem textAlign="left">
                  Visit{' '}
                  <a
                    style={{ textDecoration: 'underline' }}
                    href={getDownloadAppUrl()}
                  >
                    {getDownloadAppUrl()}
                  </a>{' '}
                  and follow the on-screen instructions to install Naka Genesis
                  app.
                </ListItem>
                <ListItem textAlign="left">
                  Open Naka Genesis App on your mobile
                </ListItem>
                <ListItem mt="4px" textAlign="left">
                  Tap the balance at the bottom right to access the Wallet page
                </ListItem>
                <ListItem mt="4px" textAlign="left">
                  Click on the QR scan icon next to the three dots icon
                </ListItem>
                <ListItem mt="4px" textAlign="left">
                  Scan the QR code provided
                </ListItem>
              </OrderedList>
            </Flex>
            <Flex
              fontSize={'14px'}
              flexDirection="column"
              px={'12px'}
              py={'8px'}
              mt="16px"
              gap="4px"
              bg="#F4EADB"
              border="1px solid #FF7E214D"
            >
              <Text
                textAlign="left"
                fontSize={'16px'}
                fontWeight={600}
                mb="4px"
              >
                Can't scan qr code
              </Text>
              <Text fontWeight={400}>
                Please use this code on your Naka Genesis app.
              </Text>
              <Text
                textAlign="center"
                fontSize={'20px'}
                fontWeight={600}
                mb="4px"
                mt="8px"
              >
                {publicCodeInput}
                {privateCodeInput}
              </Text>
            </Flex>
          </Box>
        </div>
      </div>
    </BaseModal>
  );
};

export default VerifyBVMModal;
