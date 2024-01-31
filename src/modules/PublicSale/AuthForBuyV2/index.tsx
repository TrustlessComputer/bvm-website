import { userSelector, userTokenSelector } from '@/stores/states/user/selector';
import { Button, Flex, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import cx from 'classnames';
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import BaseModal from '@/components/BaseModal';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { getLink, getUuid } from '@/utils/helpers';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import AuthenStorage from '@/utils/storage/authen.storage';
import { setBearerToken } from '@/services/whitelist';
import { requestReload } from '@/stores/states/common/reducer';
import { generateTokenWithMetamask, generateTokenWithOauth, getPublicSaleSummary } from '@/services/public-sale';
import { BVM_API, TWITTER_CLIENT_ID } from '@/config';
import { formatCurrency } from '@/utils/format';
import { useAppSelector } from '@/stores/hooks';
import { setUserToken } from '@/stores/states/user/reducer';
import AppLoading from '@/components/AppLoading';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import { signMessage } from '@/utils/metamask-helper';
import VerifyTwModal from '@/modules/Whitelist/steps/VerifyTwModal';

interface IAuthForBuyV2 extends PropsWithChildren {
  renderWithoutLogin?: (onClick: any) => any;
}

const AuthForBuyV2: React.FC<IAuthForBuyV2> = ({
  children,
  renderWithoutLogin,
}) => {
  const user = useAppSelector(userSelector);
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [isCopy, setIsCopy] = useState(false);
  const uuid = getUuid();
  const [showManualCheck, setShowManualCheck] = useState(false);
  const [showManualCheckModal, setShowManualCheckModal] = useState(false);

  const userToken = useSelector(userTokenSelector);

  const isLogged = useMemo(() => Boolean(userToken), [userToken]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (authenCode?.public_code) {
      setSubmitting(true);
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 5000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [authenCode?.public_code]);

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      const result = await generateTokenWithTwPost(
        authenCode?.secret_code as string,
      );
      onVerifyTwSuccess(result);
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    }
  };

  const onVerifyTwSuccess = (result: any) => {
    if (result) {
      clearInterval(timer.current);
      const twitterToken = AuthenStorage.getAuthenKey();
      if (!twitterToken || twitterToken !== result?.token) {
        AuthenStorage.setAuthenKey(result?.token);
        setBearerToken(result?.token);
        dispatch(setUserToken(result?.token))
      }
      setSubmitting(false);
      dispatch(requestReload());
      onClose();
    }
  };

  useEffect(() => {
    if (!user?.twitter_id) {
      handleVerifyTwitterWithUUID();
      timer.current = setInterval(async () => {
        handleVerifyTwitterWithUUID();
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [user]);

  const handleVerifyTwitterWithUUID = async (): Promise<void> => {
    try {
      const result = await generateTokenWithOauth(uuid);
      if (result) {
        clearInterval(timer.current);
        if (!userToken || userToken !== result?.token) {
          onVerifyTwSuccess(result);
        }
      }
    } catch (e) {
      console.log('handleVerifyTwitter TwitterSignIn', e);
    }
  };

  const getTwitterOauthUrl = () => {
    const URL = `${window.location.origin}/public-sale`;
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${BVM_API}/twitter-api/oauth/twitter-bvm?callbackURL=${URL}&uuid=${uuid}`,
      client_id: TWITTER_CLIENT_ID,
      state: 'state',
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: [
        'users.read',
        'tweet.read',
        'follows.read',
        'offline.access',
      ].join(' '),
    };
    const qs = new URLSearchParams(options).toString();
    setTimeout(() => window.open(`${rootUrl}?${qs}`, '_self'))
  };

  const generateLinkTweet = async () => {
    let code = '';
    if (!userToken) {
      const res: any = await requestAuthenByShareCode();
      setAuthenCode(res);
      code = `\n\n#${res?.public_code}`;
    }

    const shareUrl = !user?.referral_code
      ? 'bvm.network/public-sale'
      : getLink(user?.referral_code || '');

    const saleSummary = await getPublicSaleSummary();
    const content = `Welcome to the future of Bitcoin!\n\n@BVMnetwork is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain in a few clicks.\n\nJoin the ${formatCurrency(
      saleSummary.total_user || '0',
      0,
      0,
      'BTC',
      false,
    )} early contributors backing us with ${formatCurrency(
      saleSummary.total_usdt_value_not_boost || '0',
      0,
      0,
      'BTC',
      false,
    )} to build the future of Bitcoin.${code}`;
    return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;
  };

  const handleShareTw = async () => {
    setIsCopy(false);
    const content = await generateLinkTweet();
    setTimeout(() => window.open(content, '_blank'));
    setTimeout(() => {
      setShowManualCheck(true);
    }, 10000);
  };

  const handleLoginMetamask = async () => {
    try {
      const { signature, message, address } = await signMessage((address: string) => {
        return `This action verifies the ownership of ${address} and allows you to join the $BVM public sale.`
      })
      const result = await generateTokenWithMetamask({ message, signature, address })
      if (result && !!result.token) {
        AuthenStorage.setAuthenKey(result.token as string);
        setBearerToken(result.token  as string);
        dispatch(setUserToken(result.token  as string))
      }
    } catch (error) {
      const { message } = getError(error)
      toast.error(message)
    }
  }

  if (isLogged) {
    return children;
  }

  if (renderWithoutLogin) {
    return (
      <>
        {renderWithoutLogin?.(onOpen)}
        <BaseModal
          title="To specify your allocation"
          size="custom"
          isShow={isOpen}
          onHide={onClose}
          className={s.loginModal}
        >
          <Flex flexDir="column" gap="12px" mb="12px">
            {submitting && <AppLoading />}
            <Flex flexDir="column" gap="0px">
              <Button className={cx(s.btnContainer, s.btnPrimary)} onClick={handleShareTw}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" fill="white" />
                  <g clip-path="url(#clip0_30620_7146)">
                    <path
                      d="M22.6007 10.7695H25.054L19.694 16.8962L26 25.2315H21.0627L17.196 20.1755L12.7707 25.2315H10.316L16.0493 18.6782L10 10.7702H15.0627L18.558 15.3915L22.6007 10.7695ZM21.74 23.7635H23.0993L14.324 12.1609H12.8653L21.74 23.7635Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_30620_7146">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(10 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Text>Post on X</Text>
              </Button>
              {showManualCheck && (
                <Text
                  cursor={'pointer'}
                  textDecoration={'underline'}
                  onClick={() => setShowManualCheckModal(true)}
                  mt={1}
                  fontSize={'12px !important'}
                  mb="12px"
                >
                  Can't link account?
                </Text>
              )}
            </Flex>
            <Button className={cx(s.btnContainer)} onClick={getTwitterOauthUrl}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" fill="black" />
                <g clip-path="url(#clip0_30620_7162)">
                  <path
                    d="M22.6007 10.7695H25.054L19.694 16.8962L26 25.2315H21.0627L17.196 20.1755L12.7707 25.2315H10.316L16.0493 18.6782L10 10.7702H15.0627L18.558 15.3915L22.6007 10.7695ZM21.74 23.7635H23.0993L14.324 12.1609H12.8653L21.74 23.7635Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_30620_7162">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <Text>Authorize</Text>
            </Button>
            <Button className={cx(s.btnContainer)} onClick={handleLoginMetamask}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.9717 4.01172L19.7288 12.362L21.8079 7.43545L30.9717 4.01172Z"
                  fill="#E2761B"
                  stroke="#E2761B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.01701 4.01172L16.1695 12.4411L14.1921 7.43545L5.01701 4.01172ZM26.9266 23.3677L23.9323 27.9552L30.339 29.7179L32.1808 23.4693L26.9266 23.3677ZM3.83057 23.4693L5.66107 29.7179L12.0679 27.9552L9.0735 23.3677L3.83057 23.4693Z"
                  fill="#E4761B"
                  stroke="#E4761B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.7062 15.6158L9.9209 18.3164L16.2825 18.5988L16.0565 11.7627L11.7062 15.6158ZM24.2825 15.6158L19.8757 11.6836L19.7288 18.5988L26.0791 18.3164L24.2825 15.6158ZM12.0678 27.9548L15.887 26.0904L12.5876 23.5141L12.0678 27.9548ZM20.1017 26.0904L23.9322 27.9548L23.4011 23.5141L20.1017 26.0904Z"
                  fill="#E4761B"
                  stroke="#E4761B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.9322 27.9543L20.1016 26.0898L20.4067 28.587L20.3728 29.6379L23.9322 27.9543ZM12.0677 27.9543L15.6271 29.6379L15.6045 28.587L15.887 26.0898L12.0677 27.9543Z"
                  fill="#D7C1B3"
                  stroke="#D7C1B3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.6836 21.8645L12.4972 20.9267L14.7458 19.8984L15.6836 21.8645ZM20.3051 21.8645L21.243 19.8984L23.5028 20.9267L20.3051 21.8645Z"
                  fill="#233447"
                  stroke="#233447"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0678 27.9548L12.6102 23.3673L9.07349 23.4689L12.0678 27.9548ZM23.3899 23.3673L23.9322 27.9548L26.9266 23.4689L23.3899 23.3673ZM26.0791 18.3164L19.7289 18.5989L20.3164 21.8644L21.2543 19.8983L23.5142 20.9266L26.0791 18.3164ZM12.4972 20.9266L14.7571 19.8983L15.6837 21.8644L16.2825 18.5989L9.92094 18.3164L12.4972 20.9266Z"
                  fill="#CD6116"
                  stroke="#CD6116"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.9209 18.3164L12.5876 23.5141L12.4972 20.9266L9.9209 18.3164ZM23.5141 20.9266L23.4011 23.5141L26.0791 18.3164L23.5141 20.9266ZM16.2825 18.5989L15.6836 21.8644L16.4294 25.7175L16.5989 20.6441L16.2825 18.5989ZM19.7288 18.5989L19.4237 20.6328L19.5593 25.7175L20.3164 21.8644L19.7288 18.5989Z"
                  fill="#E4751F"
                  stroke="#E4751F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.3164 21.8636L19.5593 25.7167L20.1017 26.0896L23.4011 23.5134L23.5141 20.9258L20.3164 21.8636ZM12.4972 20.9258L12.5876 23.5134L15.887 26.0896L16.4294 25.7167L15.6836 21.8636L12.4972 20.9258Z"
                  fill="#F6851B"
                  stroke="#F6851B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.3728 29.6387L20.4067 28.5878L20.1242 28.3393H15.8644L15.6045 28.5878L15.6271 29.6387L12.0677 27.9551L13.3107 28.972L15.8305 30.7234H20.1581L22.6892 28.972L23.9322 27.9551L20.3728 29.6387Z"
                  fill="#C0AD9E"
                  stroke="#C0AD9E"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.1017 26.0897L19.5593 25.7168H16.4293L15.887 26.0897L15.6045 28.5869L15.8644 28.3383H20.1243L20.4068 28.5869L20.1017 26.0897Z"
                  fill="#161616"
                  stroke="#161616"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.4464 12.9044L32.4068 8.2942L30.9718 4.01172L20.1017 12.0795L24.2825 15.6162L30.1921 17.3451L31.5029 15.8196L30.9379 15.4128L31.8418 14.588L31.1413 14.0456L32.0452 13.3564L31.4464 12.9044ZM3.59326 8.2942L4.55371 12.9044L3.94354 13.3564L4.8475 14.0456L4.15823 14.588L5.06219 15.4128L4.49722 15.8196L5.79665 17.3451L11.7063 15.6162L15.887 12.0795L5.01699 4.01172L3.59326 8.2942Z"
                  fill="#763D16"
                  stroke="#763D16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.1922 17.3452L24.2825 15.6163L26.0792 18.3169L23.4012 23.5146L26.9266 23.4694H32.1808L30.1922 17.3452ZM11.7063 15.6163L5.79667 17.3452L3.83057 23.4694H9.0735L12.5876 23.5146L9.92096 18.3169L11.7063 15.6163ZM19.7289 18.5994L20.1018 12.0796L21.8193 7.43555H14.1921L15.8871 12.0796L16.2825 18.5994L16.4181 20.6559L16.4294 25.718H19.5594L19.582 20.6559L19.7289 18.5994Z"
                  fill="#F6851B"
                  stroke="#F6851B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <Text>Connect your Metamask</Text>
            </Button>
          </Flex>
        </BaseModal>
        <VerifyTwModal
          isShow={showManualCheckModal}
          onHide={() => {
            setShowManualCheckModal(false);
          }}
          secretCode={authenCode?.secret_code}
          onSuccess={onVerifyTwSuccess}
          title={`Can't link account?`}
        />
      </>
    );
  }

  return <></>;
};

export default AuthForBuyV2;
