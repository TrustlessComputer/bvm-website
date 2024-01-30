import AuthenStorage from '@/utils/storage/authen.storage';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import DepositContent from '../depositModal/deposit.content';
import ImportOrCreate from './importOrCreate';

export const SECRET_CODE_GUEST = 'SECRET_CODE_GUEST';
export const BARER_TOKEN_GUEST = 'BARER_TOKEN_GUEST';

interface IBuyAsGuest {
  onBack?: any;
}

const BuyAsGuest: React.FC<IBuyAsGuest> = ({ onBack }) => {
  const secretCode = AuthenStorage.getGuestSecretKey();

  if (!secretCode) {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <ImportOrCreate onBack={onBack} />
      </GoogleReCaptchaProvider>
    );
  }

  return (
    <>
      <DepositContent />
    </>
  );
};

export default BuyAsGuest;
