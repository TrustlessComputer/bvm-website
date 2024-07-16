import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@hooks/useL2Service';
import React from 'react';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { compareString } from '@utils/string';
import ButtonLoginTwitter from '@layouts/HeaderV3/components/ButtonLoginTwitter';
import styles from './style.module.scss';
import CDappDomainAPI from '@/services/api/DAServices/dapp.domain';
import { DappDomain } from '@/services/api/DAServices/types';
import DomainManager from '@/modules/domain/components/DomainManager';

interface IProps {
  chainID: string;
}

const Domains = ({ chainID }: IProps) => {
  const { loggedIn } = useWeb3Auth();
  const [inited, setInited] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [domains, setDomains] = React.useState<DappDomain[]>([]);
  const cDomainAPI = new CDappDomainAPI()
  const { getMyOrderList, getAccountInfor } = useL2Service();

  const { isMyOrderListFetching, orderList, accountInforL2Service } = useAppSelector(
    getL2ServicesStateSelector,
  );


  const chainInfo = React.useMemo(() => {
    return orderList.find(order => compareString(order?.chainId, chainID))
  }, [orderList, chainID]);

  const domain = React.useMemo(() => {
    return domains.find(domain => compareString(domain?.network_id, chainID))
  }, [domains, chainID]);


  const fetchData = async () => {
    try {
      setLoading(true)
      getMyOrderList();
      const account = (await getAccountInfor()) as any;
      const domains = await cDomainAPI.getDappDomain({ address: account?.payload?.tcAddress });
      setDomains(domains)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const updateDomain = async (domainURL: string) => {
    try {
      const domains = await cDomainAPI.setDappDomain({ domain: domainURL, address: accountInforL2Service?.tcAddress || '', chainID: chainInfo?.chainId || '' });
      setDomains(domains)
    } catch (error) {
      console.log(error);
    }
  }

  const renderLoading = () => {
    return (
      <Flex marginLeft="auto" marginRight="auto" marginTop="20vh">
        <Spinner size="lg" speed="0.65s" emptyColor="gray.200" color="blue.500" />
      </Flex>
    )
  }


  const renderLogin = () => {
    return (
      <Flex className={styles.connectBox} flexDirection="column" marginLeft="auto" marginRight="auto" marginTop="20vh" gap="8px">
        <ButtonLoginTwitter title="Please connect" className={styles.connectBox_buttonLogin} color="black"/>
      </Flex>
    )
  }

  const renderContent = () => {
    if (!chainInfo || !domain) {
      return (
        <Flex className={styles.connectBox} flexDirection="column" marginLeft="auto" marginRight="auto" marginTop="20vh" gap="8px">
          <Text color='black'>Chain ({chainID}) not found</Text>
        </Flex>
      )
    }

    return (
      <Flex gap="32px" w="100%">
        <DomainManager domain={domain} onSetDomain={updateDomain}  />
      </Flex>
    )
  }

  const renderUI = () => {
    if (!inited) {
      return renderLoading();
    }

    if (!loggedIn) return renderLogin();
    if (isMyOrderListFetching || !accountInforL2Service || loading) {
      return renderLoading();
    }

    return renderContent();
  }

  React.useEffect(() => {
    if (loggedIn) {
      fetchData()
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setTimeout(() => {
      setInited(true)
    }, 3000);
  }, []);

  return (
    <Box padding="40px 0" minH="100vh" bg="white">
      <Flex className="containerV3">
        {renderUI()}
      </Flex>
    </Box>
  )
}

export default Domains;
