import BaseModal from '@/components/BaseModal';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';

const DownloadAlphaModal = ({ isShow, onHide }: any) => {
  const qrInfo = `https://app.alpha.wtf`;

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Download Alpha app'}
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
              <Text>
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
          </Box>
        </div>
      </div>
    </BaseModal>
  );
};

export default DownloadAlphaModal;
