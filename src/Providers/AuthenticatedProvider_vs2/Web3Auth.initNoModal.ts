import { WEB3_AUTH_CLIENT_ID } from '@/config';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_CONFIG } from './chainConfig';

// Private Key format EVM (Ex: Ethereum, NOS,....)
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: CHAIN_CONFIG.nos },
});

// web3auth Instance
const web3AuthNoModal = new Web3AuthNoModal({
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
  sessionTime: 86400 * 7,
  uiConfig: {
    appName: 'BVM',
    mode: 'dark',
    useLogoLoader: true,
    logoLight:
      'https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/logo.png',
    logoDark:
      'https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/logo.png',
    defaultLanguage: 'en',
  },
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: 'redirect', // "redirect" | "popup"
  },
});

web3AuthNoModal.configureAdapter(openloginAdapter);

export default web3AuthNoModal;
