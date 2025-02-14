import { Flex, Image, Text } from '@chakra-ui/react';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import s from './styles.module.scss';
import { TC_RIPPLE_CHAIN_ID } from '../../config';

interface IProps {}

const WagmiConnectButton = ({}: IProps) => {
  const { onConnect, isPending } = useWagmiContext();

  return (
    <Flex
      onClick={() => {
        if (isPending) {
          return;
        }
        onConnect(TC_RIPPLE_CHAIN_ID);
      }}
      className={s.Item}
    >
      <Image
        src={'/icons/metamask.png'}
        width="22px"
        height="20px"
        marginRight="8px"
      />
      <Text
        textAlign={'center'}
        fontSize={'14px'}
        lineHeight={'20px'}
        fontWeight={400}
        whiteSpace={'nowrap'}
      >
        Connect MetaMask
      </Text>
    </Flex>
  );
};

export default WagmiConnectButton;
