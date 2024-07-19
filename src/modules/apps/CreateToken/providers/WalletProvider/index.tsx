"use client";
import RequiredBackupModal, {BACKUP_KEY_MODAL,} from "@/components/SignIn/RequiredBackupModal";
import {showMessage} from "@/components/Toast/toast";
import CContractBase from "@/contract/main";
import {IWalletContext, LoginParams,} from "./types";
import CErrorLogAPI, {ERROR_LOGGER_TYPE} from "@/services/api/errorLogger";
import {openModal} from "@/store/states/modal/reducer";
import {IWallet} from "@/store/states/wallet/types";
import {getErrorMessage} from "@/utils/error";
import * as CryptoJS from "crypto-js";
import {Wallet} from "ethers";
import React, {PropsWithChildren, useRef} from "react";
import {useDispatch} from "react-redux";
import {requestReload} from "@/store/states/common/reducer";

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

  const errorAPI = useRef(new CErrorLogAPI()).current;
  const contract = useRef(new CContractBase()).current;

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
          render: <RequiredBackupModal privateKey={privateKey} />,
        })
      );
      return wallet;
    } catch (error) {
      const { message } = getErrorMessage(error);
      if (message) {
        showMessage({
          message,
          status: "error",
        });
        errorAPI.report({
          action: ERROR_LOGGER_TYPE.CREATE_WALLET,
          error: JSON.stringify(message),
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
