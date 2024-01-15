import { Verifier as VerifierBip322 } from 'bip322-js';
import bitcoinMessage from 'bitcoinjs-message';
import { verifyMessage } from '@unisat/wallet-utils';

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
