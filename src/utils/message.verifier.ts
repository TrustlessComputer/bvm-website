import { Verifier as VerifierBip322 } from 'bip322-js';
import bitcoinMessage from 'bitcoinjs-message';
import { verifyMessage } from '@unisat/wallet-utils';
import { AddressType, getAddressInfo } from 'bitcoin-address-validation';
import { initEccLib, payments } from 'bitcoinjs-lib';
import { compareString } from '@/utils/string';
import * as ecc from "@bitcoinerlab/secp256k1";
import { ECPairAPI, ECPairFactory } from 'ecpair';

initEccLib(ecc);
const ECPair: ECPairAPI = ECPairFactory(ecc);

const getAddressType = (address: string): AddressType => {
  return getAddressInfo(address).type
}

const validatePubKeyToAddress = (params: { address: string, pubKey: string }) => {
  const { address, pubKey } = params;

  const compareAddress = (addressParser?: string) => {
    if (!compareString(addressParser, address)) {
      throw 'Invalid address.'
    }
  }

  const addressType = getAddressType(address);
  const publicKeyECPair = ECPair.fromPublicKey(Buffer.from(pubKey, 'hex'));
  switch (addressType) {
    case AddressType.p2tr:
      const p2tr = payments.p2tr({
        internalPubkey: toXOnly(Buffer.from(pubKey, 'hex')),
      } as any);
      compareAddress(p2tr.address)
      break
    case AddressType.p2wpkh:
      const p2wpkh = payments.p2wpkh({
        publicKey: publicKeyECPair,
        address: address
      } as any);
      compareAddress(p2wpkh.address);
      break;
    case AddressType.p2sh:
      const p2sh = payments.p2sh({
        publicKey: publicKeyECPair,
        address: address
      } as any);
      compareAddress(p2sh.address);
      break;
    case AddressType.p2pkh:
      const p2pkh = payments.p2pkh({
        publicKey: publicKeyECPair,
        address: address
      } as any);
      compareAddress(p2pkh.address);
      break;
  }
}

const toXOnly = (pubkey: Buffer): Buffer => {
  return pubkey.subarray(1, 33);
}

interface IMessageVerifier {
  address: string;
  pubKey: string;
  message: string;
  signature: string;
}

const messageVerifier = async (params: IMessageVerifier) => {
  const { address, message, pubKey, signature } = params;
  let isBip322Valid, isP2SHP2WPKHValid, isECDSAValid;
  try {
    isBip322Valid = VerifierBip322.verifySignature(
      address,
      message,
      signature,
    );
  } catch (error) {
    isBip322Valid = false;
  }

  try {
    isP2SHP2WPKHValid = bitcoinMessage.verify(message, address, signature);
  } catch (error) {
    isP2SHP2WPKHValid = false;
  }

  try {
    isECDSAValid = await verifyMessage(pubKey, message, signature);
  } catch (error) {
    isECDSAValid = false;
  }

  return isBip322Valid || isP2SHP2WPKHValid || isECDSAValid;
}

export default messageVerifier;
