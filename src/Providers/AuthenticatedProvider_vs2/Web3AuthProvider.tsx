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
import { useDispatch } from 'react-redux';
import web3AuthNoModal from './Web3Auth.initNoModal';
import { IWeb3AuthContext } from './Web3Auth.types';
import Web3AuthLoginModalCustomize from './LoginModalCustomize';

export const Web3AuthContext = createContext<IWeb3AuthContext>({});

export const Web3AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const dispatch = useDispatch();

  const [provider, setProvider] = useState<IProvider | undefined | null>(
    undefined,
  );
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | undefined>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  const [showLoginModalCustomize, setShowLoginModalCustomize] = useState(false);

  const init = async () => {
    try {
      console.log('[Web3AuthProvider][init] -- ');
      await web3AuthNoModal.init();
      setProvider(web3AuthNoModal.provider);
      if (web3AuthNoModal.connected) {
        getUserInfo();
      }
    } catch (error) {
      console.log('[Web3AuthProvider][init] -- error ', error);
      console.error(error);
    }
  };

  const login = async () => {
    try {
      console.log('[Web3AuthProvider][login] -- ');

      const web3authProvider = await web3AuthNoModal?.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: 'twitter',
        },
      );
      setProvider(web3authProvider);
    } catch (error) {
      console.log('[Web3AuthProvider][login]  error -- ', error);
    }
  };

  const logout = async () => {
    try {
      console.log('[Web3AuthProvider][logout] -- ');
      await web3AuthNoModal.logout();
      setProvider(null);
    } catch (error) {
      console.log('[Web3AuthProvider][logout] error -- ', error);
      setProvider(null);
    }
  };

  const getUserInfo = async (): Promise<Partial<UserInfo>> => {
    return await web3AuthNoModal.getUserInfo();
  };

  const registerL2Service = async () => {
    try {
      console.log('[Web3AuthProvider][registerL2Service] -- ');
      //Turn off animation when begin of throught the website
      // setPlayed && setPlayed();
      const apiAccessToken = await L2Service.register(userInfo?.idToken!);
      LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, apiAccessToken);
      LocalStorage.setItem(STORAGE_KEYS.WEB3_AUTH_TOKEN, userInfo?.idToken);
    } catch (error) {
      console.log('[Web3AuthProvider][registerL2Service] ERROR -- ', error);
    }
  };

  const getWallet = async () => {
    try {
      console.log('[Web3AuthProvider][getWallet] -- ');

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
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (provider && web3AuthNoModal.connected) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [provider, web3AuthNoModal]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggedIn) {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        getWallet();
      } else {
        setUserInfo(undefined);
      }
    };
    fetchUserProfile();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && userInfo && userInfo.idToken) {
      registerL2Service();
    }
  }, [loggedIn, userInfo]);

  const value = useMemo(
    () => ({
      init,
      login,
      logout,
      getUserInfo,
      loggedIn,
      userInfo,
      wallet,
      web3AuthNoModal,
      showLoginModalCustomize,
      setShowLoginModalCustomize,
    }),
    [
      init,
      login,
      logout,
      getUserInfo,
      web3AuthNoModal,
      userInfo,
      loggedIn,
      wallet,
      showLoginModalCustomize,
      setShowLoginModalCustomize,
    ],
  );

  console.log('Web3AuthContext -- value -- ', value);

  return (
    <Web3AuthContext.Provider value={value}>
      {children}
      {showLoginModalCustomize && (
        <Web3AuthLoginModalCustomize
          isShow={showLoginModalCustomize}
          onHide={() => {
            setShowLoginModalCustomize(false);
          }}
          onLoginTwitter={login}
        />
      )}
    </Web3AuthContext.Provider>
  );
};
