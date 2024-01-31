import SvgInset from '@/components/SvgInset';
import { Button, Center, Spinner, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { generateRandomString } from '@/utils/encryption';
import { generateTOkenWithSecretCode } from '@/services/public-sale';
import AuthenStorage from '@/utils/storage/authen.storage';
import { setGuestSecretCode } from '@/stores/states/user/reducer';
import { useDispatch } from 'react-redux';
import cs from 'classnames';
import { userSelector } from '@/stores/states/user/selector';
import { useAppSelector } from '@/stores/hooks';

const BtnCreateGuest = () => {
  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(userSelector);
  const isAuth = useMemo(() => user?.guest_code || user?.twitter_id, [user]);
  // const createNewSecretCode = useCallback(() => {
  //   try {
  //     if (!executeRecaptcha) {
  //       console.log('Execute recaptcha not yet available');
  //       throw Error('Execute recaptcha not yet available');
  //     }
  //     executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
  //       console.log(gReCaptchaToken, 'response Google reCaptcha server');
  //       getToken(gReCaptchaToken);
  //     });
  //   } catch (error) {
  //     //
  //   }
  // }, [executeRecaptcha]);

  const createNewSecretCode = async () => {
    try {
      await getToken('gReCaptchaToken');
    } catch (error) {}
  };

  const getToken = async (captcha: string, code?: string) => {
    try {
      if (isAuth) {
        return;
      }
      setLoading(true);
      const _secretCode = generateRandomString(10);

      const rs = await generateTOkenWithSecretCode(_secretCode, captcha);
      AuthenStorage.setGuestSecretKey(_secretCode);
      AuthenStorage.setGuestAuthenKey(rs?.token);
      dispatch(setGuestSecretCode(_secretCode));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loadingText={'Processing'}
      type="button"
      className={cs(s.btnTweetToSign, s.btnPrimary)}
      onClick={createNewSecretCode}
    >
      <Center className={cs(s.boxIcon, s.boxIconWhite)}>
        {loading ? (
          <Spinner color="#fa4e0e" width={'16px'} height={'16px'} />
        ) : (
          <SvgInset
            className={s.iconBlack}
            svgUrl="/icons/ic_guest.svg"
            size={16}
          />
        )}
      </Center>
      <Text>Buy as guest</Text>
    </Button>
  );
};

export default BtnCreateGuest;
