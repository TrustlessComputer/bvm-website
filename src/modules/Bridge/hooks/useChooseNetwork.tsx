import { useFormikContext } from 'formik';
import { IFormValues, NetworkType } from '@/modules/Bridge/types';
import useBridgeStore from '@/modules/Bridge/hooks/useBridgeStore';
import React from 'react';
import { compareString } from '@utils/string';

interface IProps {
  type: NetworkType;
}

const useChooseNetwork = (props: IProps) => {
  const { type } = props;
  const { values } = useFormikContext();
  const { networks, tokens } = useBridgeStore();
  const { fromNetwork, toNetwork, fromToken, toToken } = values as IFormValues;

  const getFromNetworks = () => {
    const _bridgeNetworkNames = Object.keys(toToken?.bridgeAddress || {})
      .filter((network) =>
        !compareString(network, fromNetwork.name) &&
        !compareString(network, toNetwork.name)
      );
    return networks
      .filter((network) => _bridgeNetworkNames.includes(network.name))
      .filter((network) => {
        const _tokens = tokens.filter((token) => token.network.name === network.name);
        return _tokens.some((token) => Object.keys(token.bridgeAddress).includes(toToken.network.name));
      });
  }

  const getToNetworks = () => {
    const _bridgeNetworkNames = Object.keys(fromToken?.bridgeAddress || {})
      .filter((network) =>
        !compareString(network, fromNetwork.name) &&
        !compareString(network, toNetwork.name)
      );
    return networks.filter((network) => _bridgeNetworkNames.includes(network.name));
  }

  const { oppositionToken, bridgeNetworks } = React.useMemo(() => {
    const oppositionToken = type === 'to' ? fromToken : toToken;

    return {
      oppositionToken,
      bridgeNetworks: type === 'from'
        ? getFromNetworks()
        : getToNetworks(),
    }
  }, [
    networks,
    fromToken,
    toToken,
    tokens,
  ]);

  return {
    networks: bridgeNetworks,
    oppositionToken,
  };
}

export default useChooseNetwork;
