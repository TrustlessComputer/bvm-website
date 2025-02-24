import { reduce } from 'lodash';

export const composeValidators =
  (...validators: any[]) =>
  (value: unknown, values: unknown, props: any) =>
    reduce(
      validators,
      (error, validator) => error || validator(value, values, props),
      undefined,
    );

export const required = (value: unknown) => (value ? undefined : 'Required');

export const containsOnlySpaces = (str: string) => {
  return str.trim().length === 0;
};

export const isValidBTCTxHash = (txHash: string) => {
  // Check if txHash is a 64-character hexadecimal string
  const regex = /^[0-9a-fA-F]{64}$/;
  return regex.test(txHash);
};

export const isValidFractalBTCTxHash = (txHash: string) => {
  const hexPattern = /^[a-fA-F0-9]+$/;

  // Check if the hash matches the hex pattern and has an even length (since hex is in pairs)
  return hexPattern.test(txHash) && txHash.length % 2 === 0;
};

export const isValidERC20TxHash = (txHash: string) => {
  // Check if txHash is a 64-character hexadecimal string
  const regex = /^0x([A-Fa-f0-9]{64})$/;
  return regex.test(txHash);
};
