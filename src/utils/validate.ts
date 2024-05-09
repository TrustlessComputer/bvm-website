import {
  validate,
  getAddressInfo,
  AddressType,
  Network,
} from 'bitcoin-address-validation';
import { ethers, Wallet } from 'ethers';
import { isProduction } from './commons';

export const validateWalletAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateBTCAddressTaproot = (_address: string): boolean => {
  const isBTCAddress = validate(_address);
  if (isBTCAddress) {
    const addressInfo = getAddressInfo(_address);
    return addressInfo.type === AddressType.p2tr;
  }
  return false;
};

export const validateBTCAddress = (_address: string): boolean => {
  return validate(_address, isProduction() ? Network.mainnet : undefined);
};

export const validateEVMAddress = (_address: string): boolean => {
  return ethers.utils.isAddress(_address);
};

export const validateTwitterUrl = (url: string): boolean => {
  return url.startsWith('https://twitter.com/');
};

export const isPrivateKey = (key: string): boolean => {
  try {
    new Wallet(key);
  } catch (e) {
    return false;
  }
  return true;
};
export const requiredAmount = (value: unknown) =>
  value && Number(value) !== 0 ? undefined : 'Required';

export const requiredValidateEVMAddress = (value: string) => {
  return !validateEVMAddress(value) ? 'Address is invalid.' : undefined;
};
