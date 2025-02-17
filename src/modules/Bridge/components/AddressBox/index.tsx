import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { formatLongAddress } from '@utils/format';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import React from 'react';
import { ReactSVG } from 'react-svg';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { CHAIN_ID } from '@components/WagmiConnector/config';

const AddressBox = () => {
  const { latestAddress, onSwitchChain } = useWagmiContext();

  const onCopy = () => {
    copy(latestAddress || "");
    toast.remove();
    toast.success(' Copied');
  }

  if (!latestAddress) return <></>
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      marginBottom="20px"
    >
      <Flex className={s.address} gap={'4px'}>
        <Text mr={'2px'}>Address</Text>
        <Jazzicon diameter={20} seed={jsNumberForAddress(latestAddress)} />
        <Text>{formatLongAddress(latestAddress)}</Text>
        <ReactSVG
          onClick={onCopy}
          src="/icons/ic-copy-3.svg"
        />
      </Flex>
      <Text
        color="#FA4E0E"
        fontSize="14px"
        fontWeight="500"
        cursor="pointer"
        textDecoration="underline"
        onClick={() => {
          onSwitchChain(CHAIN_ID.TC_RIPPLE);
        }}
      >
        Add RVM to Metamask
      </Text>
    </Flex>
  )
}

export default AddressBox;
