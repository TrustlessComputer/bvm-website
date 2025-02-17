import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { formatLongAddress } from '@utils/format';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import React from 'react';
import { ReactSVG } from 'react-svg';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';

const AddressBox = () => {
  const { latestAddress } = useWagmiContext();

  const onCopy = () => {
    copy(latestAddress || "");
    toast.remove();
    toast.success(' Copied');
  }

  if (!latestAddress) return <></>
  return (
    <Flex className={s.address} gap={'4px'}>
      <Text mr={'2px'}>Address</Text>
      <Jazzicon diameter={20} seed={jsNumberForAddress(latestAddress)} />
      <Text>{formatLongAddress(latestAddress)}</Text>
      <ReactSVG
        onClick={onCopy}
        src="/icons/ic-copy-3.svg"
      />
    </Flex>
  )
}

export default AddressBox;
