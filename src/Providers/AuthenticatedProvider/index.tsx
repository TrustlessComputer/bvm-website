/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { WEB3_AUTH_CLIENT_ID } from '@/config';
import { STORAGE_KEYS } from '@/constants/storage-key';
import { useRPCProvider } from '@/hooks/useRPCProvider';
import LocalStorage from '@/libs/localStorage';
import commonStorage from '@/libs/localStorage/common.storage';
import walletStorage from '@/libs/localStorage/wallet.storage';
import {
  L2Service,
  getChallenge,
  getProfile,
  revokeAuthentication,
  verifyChallenge,
} from '@/services/api/auth';
import { useAppDispatch } from '@/stores/hooks';
import {
  setAutoReconnecting,
  setLogout,
  setUserInfo,
  setWallet,
} from '@/stores/states/auth/reducer';
import { isProduction } from '@/utils/common';
import {
  ADAPTER_EVENTS,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Wallet } from 'ethers';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CHAIN_CONFIG } from './chainConfig';
import { authenticatedInContext } from './constants';
import { generateRandomString } from './helpers';
import useAnimationStore from '@/stores/useAnimationStore';

export const AuthenticatedProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  const provider = useRPCProvider();
  const { setPlayed, played } = useAnimationStore();
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  // const { sendEvent } = useGa();

  const getPlayerInfo = useCallback(async () => {
    const res = await getProfile();
    dispatch(setUserInfo(res));
    return res;
  }, [dispatch]);

  useEffect(() => {
    const getAndSetAuthToken = async (wallet: Wallet) => {
      const storageAuthToken = LocalStorage.getItem(
        STORAGE_KEYS.API_ACCESS_TOKEN,
      );
      if (!storageAuthToken) {
        const { address } = wallet;
        const challenge = await getChallenge(address);
        const signature = await wallet.signMessage(challenge);
        const authToken = await verifyChallenge(signature, address);
        // LocalStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
        LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, authToken);
      }
      getPlayerInfo();
    };

    const setLocalStorage = async (web3auth: Web3Auth) => {
      try {
        // store cipher private key into local storage
        // Generate random password
        const privateKey = await web3auth!.provider!.request({
          method: 'eth_private_key',
        });
        const password = generateRandomString().toString();
        walletStorage.setAccount({
          prvKey: privateKey as string,
          password,
        });
        walletStorage.setPassWord({ password });
      } catch (e) {
        //
      }
    };

    const getWallet = async (web3auth: Web3Auth) => {
      try {
        if (provider) {
          const privateKey = await web3auth!.provider!.request({
            method: 'eth_private_key',
          });
          if (privateKey) {
            const wallet = new Wallet(privateKey as string, provider);
            try {
              getAndSetAuthToken(wallet);
            } catch (e) {
              //
            }

            dispatch(
              setWallet({
                wallet,
                address: wallet.address,
              }),
            );

            LocalStorage.setItem(STORAGE_KEYS.USER_ADDRESS, wallet.address);
          }

          setLocalStorage(web3auth);
        }
      } catch (e) {
        // console.log(`subscribeAuthEvents ERROR: ${ADAPTER_EVENTS.CONNECTED}`, e);
      }
    };

    const getUserInfo = async (web3auth: Web3Auth) => {
      const user = await web3auth.getUserInfo();
      try {
        if (user.idToken) {
          //Turn off animation when begin of throught the website
          setPlayed && setPlayed();

          const apiAccessToken = await L2Service.register(user.idToken);
          LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, apiAccessToken);
          console.log('[getUserInfo] apiAccessToken ---- ', apiAccessToken);

          const userProfileWeb3 = await L2Service.getProfile();
          console.log('[getUserInfo]  userProfileWeb3 ----  ', userProfileWeb3);
          LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, apiAccessToken);
          LocalStorage.setItem(STORAGE_KEYS.WEB3_AUTH_TOKEN, user.idToken);
          dispatch(setUserInfo(userProfileWeb3));
        }
      } catch (error) {
        console.log('[getUserInfo] ERROR -- ', error);
      }
    };

    const subscribeAuthEvents = async (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.CONNECTED);
        getUserInfo(web3auth);
        await getWallet(web3auth);
        // sendEvent(APP_ARCADE_EVENT_NAMES.LOGIN_SUCCESS);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.CONNECTING);
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.DISCONNECTED);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.ERRORED, error);
      });

      web3auth.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, () => {
        console.log(
          '[subscribeAuthEvents] -- ',
          ADAPTER_EVENTS.ADAPTER_DATA_UPDATED,
        );
      });

      web3auth.on(ADAPTER_EVENTS.CACHE_CLEAR, () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.CACHE_CLEAR);
      });

      web3auth.on(ADAPTER_EVENTS.NOT_READY, () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.NOT_READY);
      });

      web3auth.on(ADAPTER_EVENTS.READY, () => {
        console.log('[subscribeAuthEvents] -- ', ADAPTER_EVENTS.READY);
      });
    };

    async function init() {
      try {
        console.log('AuthenticatedProvider', 'init', 'start');
        const web3AuthInstance = new Web3Auth({
          chainConfig: CHAIN_CONFIG.nos,

          // please uncomment here for dev when node dead

          // chainConfig: isProduction() ? CHAIN_CONFIG.mainnet : CHAIN_CONFIG.nos,
          web3AuthNetwork: isProduction()
            ? 'sapphire_mainnet'
            : 'sapphire_mainnet',
          clientId: WEB3_AUTH_CLIENT_ID,
          uiConfig: {
            loginMethodsOrder: ['twitter'],
            appName: 'website',
            logoLight:
              'https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/logo.png',
            logoDark:
              'https://storage.googleapis.com/tc-cdn-prod/nbc/icons/bvm-icons/logo.png',
          },
          sessionTime: 86400 * 7,
          enableLogging: true,
        });

        const adapter = new OpenloginAdapter({
          adapterSettings: {
            network: isProduction()
              ? WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
              : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
            clientId: WEB3_AUTH_CLIENT_ID,
            uxMode: 'redirect',
            redirectUrl: window.location.href,
          },
        });

        web3AuthInstance.configureAdapter(adapter);
        subscribeAuthEvents(web3AuthInstance);
        setWeb3Auth(web3AuthInstance);

        // await web3AuthInstance?.addChain(CHAIN_CONFIG.nos as CustomChainConfig);
        // await web3AuthInstance.switchChain({
        //   chainId: CHAIN_CONFIG.nos.chainId,
        // });

        // https://web3auth.io/docs/pnp/features/whitelabel/login-modal
        await web3AuthInstance.initModal({
          modalConfig: {
            // Disable Wallet Connect V2
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              label: 'wallet_connect',
              showOnModal: false,
            },
            // Disable Metamask
            [WALLET_ADAPTERS.METAMASK]: {
              label: 'metamask',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.TORUS_SOLANA]: {
              label: 'torus',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.PHANTOM]: {
              label: 'phantom',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.SOLFLARE]: {
              label: 'solfare',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.SLOPE]: {
              label: 'slope',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              label: 'torus',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.COINBASE]: {
              label: 'coinbase',
              showOnModal: false,
            },
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: 'openlogin',
              showOnDesktop: true,
              loginMethods: {
                twitter: {
                  name: 'twitter',
                  mainOption: true,
                  showOnDesktop: true,
                },
                google: {
                  name: 'google',
                  showOnModal: false,
                },
                facebook: {
                  name: 'facebook',
                  showOnModal: false,
                },
                reddit: {
                  name: 'reddit',
                  showOnModal: false,
                },
                discord: {
                  name: 'discord',
                  showOnModal: false,
                },
                twitch: {
                  name: 'twitch',
                  showOnModal: false,
                },
                apple: {
                  name: 'apple',
                  showOnModal: false,
                },
                line: {
                  name: 'line',
                  showOnModal: false,
                },
                github: {
                  name: 'github',
                  showOnModal: false,
                },
                linkedin: {
                  name: 'linkedin',
                  showOnModal: false,
                },
                weibo: {
                  name: 'weibo',
                  showOnModal: false,
                },
                wechat: {
                  name: 'wechat',
                  showOnModal: false,
                },
                email_passwordless: {
                  name: 'email_passwordless',
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: 'sms_passwordless',
                  showOnModal: false,
                },
                kakao: {
                  name: 'kakao',
                  showOnModal: false,
                },
              },
              // setting it to false will hide all social login methods from modal.
              // showOnModal: true,
            },
          },
        });

        const isForceLogin = commonStorage.getForceLogin();

        console.log('FORCE LOGIN ---- ', isForceLogin);

        if (!isForceLogin) {
          // sendEvent(APP_ARCADE_EVENT_NAMES.OPEN_LOGIN);
          // web3AuthInstance.connect();
          commonStorage.setAlreadyForceLogin();
        }
      } catch (error) {
        console.log('AuthenticatedProvider -- ERROR -- [1] ', error);
      } finally {
        console.log('AuthenticatedProvider', 'init', 'ended');
        dispatch(setAutoReconnecting(false));
      }
    }

    const getLocalWallet = async (): Promise<Wallet | undefined> => {
      try {
        const cipher = walletStorage.getAccountCipher();

        if (!cipher) {
          return undefined;
        }

        const passWord = walletStorage.getPassWord() as string;
        const privateKey = walletStorage.getAccount(passWord);

        if (provider) {
          if (privateKey) {
            const wallet = new Wallet(privateKey as string, provider);
            await getAndSetAuthToken(wallet);
            dispatch(
              setWallet({
                wallet,
                address: wallet.address,
              }),
            );
            return wallet;
          }
        }
      } catch (error) {
        //
      } finally {
        //
      }

      return undefined;
    };

    getLocalWallet()
      .then((localWallet) => {
        console.log('TEST ---- USER info ');
        if (localWallet) {
          dispatch(setAutoReconnecting(false));
        } else {
          init();
        }
      })
      .catch(() => {
        init();
      });
  }, [dispatch, getPlayerInfo, provider, window]);

  const login = useCallback(async () => {
    if (!web3Auth) {
      console.log('AuthenticatedProvider', 'web3auth not initialized yet');
      return;
    }
    try {
      await web3Auth.connect();
    } catch (error: any) {
      console.log('web3Auth login ==> ERROR', error);
      //
    }
  }, [web3Auth, window]);

  const logout = useCallback(async () => {
    revokeAuthentication();
    LocalStorage.clear();

    if (!web3Auth) {
      console.log('AuthenticatedProvider', 'web3auth not initialized yet');
      return;
    }
    dispatch(setLogout());
    await web3Auth.logout();
  }, [web3Auth, dispatch]);

  const value = useMemo(
    () => ({
      login,
      logout,
      getPlayerInfo,
      web3Auth,
    }),
    [login, logout, getPlayerInfo, window],
  );

  return (
    <authenticatedInContext.Provider value={value}>
      {children}
    </authenticatedInContext.Provider>
  );
};
