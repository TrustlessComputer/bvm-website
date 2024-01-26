import { Flex } from '@chakra-ui/react';
import styles from './styles.module.scss';
import React from 'react';
import Loading from '@/components/Loading';
import useFormatAllowCelestia from '@/modules/Whitelist/AllowCelestiaMessage/useFormatAllowCelestia';
import { CDN_URL_ICONS } from '@/config';

const AllowCelestiaMessage = () => {
  const { loaded, status, isProcessing, amount } = useFormatAllowCelestia()
  const renderContent = React.useCallback(() => {
    if (!loaded || !status.length) return <></>;
    if (isProcessing) {
      return (
        <Flex className={styles.container}>
          <Loading />
          <p>Wallet verification in progress!</p>
          <p>You're in the queue. Please give us a few minutes to process.</p>
          <p>Thanks for your patience!</p>
        </Flex>
      )
    }
    return <></>
    // return <img src={`${CDN_URL_ICONS}/bg-add-new.png`} style={{ width: "100%", marginTop: "8px" }} />;
  }, [loaded, status, isProcessing, amount]);

  return (
    <>
      {renderContent()}
    </>
  )
}

export default AllowCelestiaMessage;
