"use client";
import { IWallet, IWalletContext, LoginParams } from './types';
import { openModal } from '@/stores/states/modal/reducer';
import { getErrorMessage } from '@/utils/errorV2';
import * as CryptoJS from 'crypto-js';
import { Wallet } from 'ethers';
import React, { PropsWithChildren, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { requestReload } from '@/stores/states/common/reducer';
import { showError } from '@components/toast';
import CContract from '@/contract/contract';
import RequiredBackupModal, { BACKUP_KEY_MODAL } from '@/modules/Referrals/ClaimModal/InputAddress/RequiredBackupModal';

const initialValue: IWalletContext = {
  loading: false,
  isNeedCreate: false,
  onCreateNew: async () => undefined,
  onLogin: async (_: LoginParams) => undefined,
};

const WalletContext = React.createContext<IWalletContext>(initialValue);

const WalletProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [isNeedCreate, setIsNeedCreate] = React.useState(true);

  const contract = useRef(new CContract()).current;

  const onLogin = async (params: LoginParams): Promise<IWallet> => {
    try {
      setLoading(true);
      const { privateKey } = params;
      const _wallet = new Wallet(privateKey, contract.getProviderByChain());

      // let getWalletToken = wallet?.token;
      // const currentWalletAddress = wallet?.address;
      //
      // const signature = await _wallet.signMessage(_wallet.address);
      //
      // if (
      //   !getWalletToken ||
      //   !compareString(currentWalletAddress, _wallet.address)
      // ) {
      //   try {
      //     const rsSignerWallet = await userAPI.userSignerWallet({
      //       address: _wallet.address,
      //       message: _wallet.address,
      //       signature: signature,
      //       network: CHAIN_TYPE.RUNECHAIN,
      //     });
      //
      //     getWalletToken = rsSignerWallet.token;
      //   } catch (error) {
      //     //
      //   }
      // }

      // const __wallet = {
      //   ...wallet,
      //   ..._wallet,
      //   token: getWalletToken,
      //   privateKey: privateKey
      // };

      // dispatch(setWallet(__wallet));

      setLoading(false);
      setIsNeedCreate(false);

      dispatch(requestReload());
      return _wallet as any;
    } catch (error) {
      console.log("error22222", error);
      throw error;
    }
  };

  const onCreateNew = async () => {
    try {
      setLoading(true);
      // Generate random password
      // const password = generateRandomString().toString();

      // Generate random private key
      const id = CryptoJS.lib.WordArray.random(32);
      const privateKey = "0x" + id;

      // const _cipherText = encryptAES({
      //   value: privateKey,
      //   pass: password,
      // });

      // dispatch(setCipherText(_cipherText));
      // dispatch(setPWText(password));

      // login and return new wallet
      const wallet = await onLogin({
        privateKey,
      });

      // dispatch open back up modal here
      dispatch(
        openModal({
          id: BACKUP_KEY_MODAL,
          disableBgClose: true,
          hideCloseButton: true,
          render: () => <RequiredBackupModal privateKey={privateKey} />,
        })
      );
      return wallet;
    } catch (error) {
      const { message } = getErrorMessage(error);
      if (message) {
        showError({
          message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const contextValues = React.useMemo((): IWalletContext => {
    return {
      loading,
      isNeedCreate,
      onCreateNew,
      onLogin,
    };
  }, [loading, isNeedCreate, onCreateNew, onLogin]);

  return (
    <WalletContext.Provider value={contextValues}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
