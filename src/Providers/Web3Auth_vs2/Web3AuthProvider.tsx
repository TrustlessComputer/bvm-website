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
import Web3AuthLoginModalCustomize from './LoginModalCustomize';
import web3AuthNoModal from './Web3Auth.initNoModal';
import { IWeb3AuthContext } from './Web3Auth.types';
import l2ServicesAPI, { revokeAuthentication } from '@/services/api/l2services';
import { fetchAccountInfo } from '@/stores/states/l2services/actions';
import { useAppDispatch } from '@/stores/hooks';
import { setL2ServiceLogout } from '@/stores/states/l2services/reducer';

export const Web3AuthContext = createContext<IWeb3AuthContext>({});

export const Web3AuthProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [provider, setProvider] = useState<IProvider | undefined | null>(
    undefined,
  );
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | undefined>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [showLoginModalCustomize, setShowLoginModalCustomize] = useState(false);

  const init = async () => {
    try {
      console.log('[Web3AuthProvider][init] 111 -- ');
      await web3AuthNoModal.init();
      setProvider(web3AuthNoModal.provider);

      console.log(
        '[Web3AuthProvider][web3AuthNoModal] STATE  -- ',
        web3AuthNoModal?.status,
      );

      if (web3AuthNoModal.connected) {
        getWeb3AuthUserInfor();
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
        },
      );

      console.log(
        '[Web3AuthProvider][login] --  OKOK  ---- ',
        web3authProvider,
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
      revokeAuthentication();
      dispatch(setL2ServiceLogout());
      await web3AuthNoModal.logout();
      setProvider(null);
      LocalStorage.removeItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
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
      console.log(
        '[Web3AuthProvider][registerL2Service] -- userInfo -- ',
        userInfo,
      );
      if (userInfo && userInfo?.idToken) {
        const apiAccesstToken = LocalStorage.getItem(
          STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2,
        );
        if (!apiAccesstToken) {
          //Call API register to Service
          const idToken = userInfo.idToken;
          const l2ServiceAccessToken = await L2Service.register(idToken);

          // LocalStorage.setItem(STORAGE_KEYS.API_ACCESS_TOKEN, l2ServiceAccessToken);
          // LocalStorage.setItem(STORAGE_KEYS.WEB3_AUTH_TOKEN, idToken);

          LocalStorage.setItem(
            STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2,
            l2ServiceAccessToken,
          );
          LocalStorage.setItem(STORAGE_KEYS.WEB3AUTH_ID_TOKEN_V2, idToken);
          l2ServicesAPI.setAccesTokenHeader(l2ServiceAccessToken);
          dispatch(fetchAccountInfo());
        } else {
          l2ServicesAPI.setAccesTokenHeader(apiAccesstToken);
        }
      }
    } catch (error) {
      console.log('[Web3AuthProvider][registerL2Service] ERROR -- ', error);
      throw error;
    }
  };

  const getWallet = async () => {
    try {
      console.log('[Web3AuthProvider][getWallet] -- ');

      if (provider && web3AuthNoModal.provider && web3AuthNoModal.connected) {
        const privateKey = await web3AuthNoModal.provider?.request({
          method: 'eth_private_key',
        });

        // console.log(
        //   '[Web3AuthProvider][getWallet] -- privateKey -- ',
        //   privateKey,
        // );

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
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [provider, web3AuthNoModal]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loggedIn) {
        const userInfo = await getWeb3AuthUserInfor();
        console.log('USER INFOR: ', userInfo);
        setUserInfo(userInfo);
        dispatch(fetchAccountInfo());
        getWallet();
        l2ServicesAPI.setAccesTokenHeader(
          LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2),
        );
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
      loginTwitter,
      logout,
      getWeb3AuthUserInfor,
      loggedIn,
      userInfo,
      wallet,
      web3AuthNoModal,
      showLoginModalCustomize,
      setShowLoginModalCustomize,
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
