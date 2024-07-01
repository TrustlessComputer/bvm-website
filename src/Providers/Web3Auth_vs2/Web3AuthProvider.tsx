'use client';

import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { L2Service } from '@/services/api/auth';
import { IProvider, UserInfo, WALLET_ADAPTERS } from '@web3auth/base';
import { Wallet, ethers } from 'ethers';
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Web3AuthLoginModalCustomize from './LoginModalCustomize';
import web3AuthNoModal from './Web3Auth.initNoModal';
import { IWeb3AuthContext } from './Web3Auth.types';
import l2ServicesAPI, { revokeAuthentication } from '@/services/api/l2services';
import { useAppDispatch } from '@/stores/hooks';
import { setL2ServiceLogout } from '@/stores/states/l2services/reducer';
import { useLocalStorage } from 'usehooks-ts';

export const Web3AuthContext = createContext<IWeb3AuthContext>({});

export const Web3AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [provider, setProvider] = useState<IProvider | undefined | null>(
    undefined,
  );
  const [l2ServiceAccessToken, setL2ServiceAccessToken] = useLocalStorage(
    STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2,
    LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2) || undefined,
  );
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | undefined>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [web3AuthConencted, setWeb3AuthConencted] = useState(false);

  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [showLoginModalCustomize, setShowLoginModalCustomize] = useState(false);

  useEffect(() => {
    setLoggedIn(!!l2ServiceAccessToken && !!web3AuthConencted);
  }, [setLoggedIn, l2ServiceAccessToken, web3AuthConencted]);

  const init = async () => {
    try {
      await web3AuthNoModal.init();
      setProvider(web3AuthNoModal.provider);

      console.log(
        '[Web3AuthProvider][web3AuthNoModal] STATE  -- ',
        web3AuthNoModal?.status,
      );

      if (web3AuthNoModal.connected) {
        getWeb3AuthUserInfor();
      } else {
        setL2ServiceAccessToken(undefined);
      }
    } catch (error) {
      console.log('[Web3AuthProvider][init] -- error ', error);
      console.error(error);
      throw error;
    }
  };

  const loginTwitter = async () => {
    try {
      console.log('[Web3AuthProvider][login] -- ');
      const web3authProvider = await web3AuthNoModal?.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: 'twitter',
          redirectUrl: window.location.href,
        },
      );
      setProvider(web3authProvider);
    } catch (error) {
      console.log('[Web3AuthProvider][login]  error -- ', error);
      throw error;
    }
  };

  const loginGoogle = async () => {
    try {
      console.log('[Web3AuthProvider][login] -- ');
      const web3authProvider = await web3AuthNoModal?.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: 'google',
          redirectUrl: window.location.href,
        },
      );
      setProvider(web3authProvider);
    } catch (error) {
      console.log('[Web3AuthProvider][login]  error -- ', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('[Web3AuthProvider][logout] -- ');
      await revokeAuthentication();
      await web3AuthNoModal.logout();
      dispatch(setL2ServiceLogout());
      setProvider(null);
      setUserInfo(undefined);
      setL2ServiceAccessToken(undefined);
    } catch (error) {
      console.log('[Web3AuthProvider][logout] error -- ', error);
      setProvider(null);
      throw error;
    }
  };

  const getWeb3AuthUserInfor = async (): Promise<Partial<UserInfo>> => {
    try {
      return await web3AuthNoModal.getUserInfo();
    } catch (error) {
      throw error;
    }
  };

  const registerL2Service = async () => {
    try {
      if (userInfo && userInfo?.idToken) {
        if (!l2ServiceAccessToken) {
          //Call API register to Service
          const idToken = userInfo.idToken;
          const newL2ServiceAccessToken = await L2Service.register(idToken);

          if (newL2ServiceAccessToken) {
            setL2ServiceAccessToken(newL2ServiceAccessToken);
          }
        } else {
          l2ServicesAPI.setAccesTokenHeader(l2ServiceAccessToken);
        }
      }
    } catch (error) {
      console.log('[Web3AuthProvider][registerL2Service] ERROR -- ', error);
      throw error;
    }
  };

  const getWallet = async () => {
    try {
      if (provider && web3AuthNoModal.provider && web3AuthNoModal.connected) {
        const privateKey = await web3AuthNoModal.provider?.request({
          method: 'eth_private_key',
        });
        if (privateKey) {
          const wallet = new Wallet(
            privateKey as string,
            new ethers.providers.JsonRpcProvider(
              web3AuthNoModal.coreOptions.chainConfig?.rpcTarget!,
            ),
          );
          setWallet(wallet);
        }
      }
    } catch (error) {
      console.log('[Web3AuthProvider][getWallet] -- error ', error);
      throw error;
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (provider && web3AuthNoModal?.connected) {
      setWeb3AuthConencted(true);
    } else {
      setWeb3AuthConencted(false);
    }
  }, [provider, web3AuthNoModal, l2ServiceAccessToken]);

  useEffect(() => {
    const fetchWeb3AuthUserProfile = async () => {
      if (web3AuthConencted) {
        const userInfo = await getWeb3AuthUserInfor();
        setUserInfo(userInfo);
        getWallet();
      } else {
        setUserInfo(undefined);
      }
    };
    fetchWeb3AuthUserProfile();
  }, [web3AuthConencted]);

  useEffect(() => {
    if (web3AuthConencted && userInfo && userInfo.idToken) {
      registerL2Service();
    }
  }, [web3AuthConencted, userInfo, l2ServiceAccessToken]);

  const value = useMemo(
    () => ({
      init,
      loginTwitter,
      logout,
      getWeb3AuthUserInfor,
      loggedIn,
      userInfo,
      wallet,
      web3AuthNoModal,
      showLoginModalCustomize,
      setShowLoginModalCustomize,
      l2ServiceAccessToken,
    }),
    [
      init,
      loginTwitter,
      logout,
      getWeb3AuthUserInfor,
      web3AuthNoModal,
      userInfo,
      loggedIn,
      wallet,
      showLoginModalCustomize,
      setShowLoginModalCustomize,
      l2ServiceAccessToken,
    ],
  );

  // console.log('Web3AuthContext -- value -- ', value);

  return (
    <Web3AuthContext.Provider value={value}>
      {children}
      {showLoginModalCustomize && (
        <Web3AuthLoginModalCustomize
          isShow={showLoginModalCustomize}
          onHide={() => {
            setShowLoginModalCustomize(false);
          }}
          onLoginTwitter={loginTwitter}
          onLoginGoogle={loginGoogle}
        />
      )}
    </Web3AuthContext.Provider>
  );
};
