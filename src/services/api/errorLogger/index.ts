import CApiClient from "../../apiClientV2";
import { IErrorLoggerPayload } from "./interface";

export const ERROR_LOGGER_TYPE = {
  WITHDRAW: "WITHDRAW",
  SWEEP_KEYS: "SWEEP_KEYS",
  UNITY_LOAD: "UNITY_LOAD",
  BUY_TC: "BUY_TC",
  FAUCET_TC: "FAUCET_TC",
  STAKING: "STAKING",
  RED_PACKAGE: "RED_PACKAGE",
  STAKING_TOKENS: "STAKING_TOKENS",
  TRANSFER_TOKEN_ON_ETHEREUM: "TRANSFER_TOKEN_ON_ETHEREUM",
  TRANSFER_TOKEN_ON_NOS: "TRANSFER_TOKEN_ON_NOS",
  TRANSFER_TOKEN: "TRANSFER_TOKEN",
  UNABLE_INIT_NOTIFICATION: "UNABLE_INIT_NOTIFICATION",
  CREATE_WALLET: "CREATE_WALLET",
  IMPORT_PRIVATE_KEY: "IMPORT_PRIVATE_KEY",
  LINK_ADDRESS: "LINK_ADDRESS",
};

export const ERROR_LOGGER_LEVEL = {
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

class CErrorLogAPI extends CApiClient {
  report = async (payload: IErrorLoggerPayload) => {
    try {
      await this.api.post(
        `/client-log?network=nos&address=${payload.address}`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export default CErrorLogAPI;
