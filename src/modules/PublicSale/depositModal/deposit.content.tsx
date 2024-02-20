import AppLoading from '@/components/AppLoading';
import SvgInset from '@/components/SvgInset';
import { PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import {
  generateTOkenWithSecretCode,
  getLocation,
  getPublicsaleWalletInfo,
} from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { setDepositAddress, setGuestSecretCode } from '@/stores/states/user/reducer';
import { depositAddressSelector, userSelector } from '@/stores/states/user/selector';
import { generateRandomString } from '@/utils/encryption';
import { formatCurrency } from '@/utils/format';
import AuthenStorage from '@/utils/storage/authen.storage';
import { compareString } from '@/utils/string';
import {
  Box,
  Center,
  Flex, Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';
import React, { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import ImportOrCreate from '../AuthForBuy/importOrCreate';
import DepositContentItem, {
  DepositContentItem2,
} from './deposit.content.item';
import s from './styles.module.scss';
import { ILaunchpadDetail } from '@/services/interfaces/launchpad';

interface IDepositContent {
  amount_usd?: string;
  hasStaked?: any;
  setBanned?: (_: boolean) => void;
  launchpadDetail?: ILaunchpadDetail
}

const COUNTRY_BANNED: any[] = ['US'];

const DepositContent = ({
    amount_usd,
    hasStaked,
    setBanned,
  }: IDepositContent) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  const user = useAppSelector(userSelector);
  const depositAddress = useAppSelector(depositAddressSelector);
  const [loading, setLoading] = useState(true);
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const [tokens, setTokens] = useState<PublicSaleWalletTokenDeposit[]>([]);
  const [selectToken, setSelectToken] = useState<
    PublicSaleWalletTokenDeposit | undefined
    >(depositAddress ? depositAddress[0] : undefined);
  const secretCode = user?.guest_code;
  const token = AuthenStorage.getAuthenKey();
  const [isDepositAnotherAccount, setIsDepositAnotherAccount] = useState(false);
  const firstFieldRef = React.useRef(null);

  const coinPrices = useSelector(commonSelector).coinPrices;

  const dispatch = useDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [generating, setGenerating] = useState(true);

  const isAuth = useMemo(() => user?.guest_code || user?.twitter_id, [user]);

  const createNewSecretCode = async () => {
    try {
      await getToken('');
      // if (isAuth) {
      //   setGenerating(false);
      //   return;
      // }
      // if (!executeRecaptcha) {
      //   console.log('Execute recaptcha not yet available');
      //   throw Error('Execute recaptcha not yet available');
      // }
      // executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
      //   console.log(gReCaptchaToken, 'response Google reCaptcha server');

      //   getToken(gReCaptchaToken);
      // });
    } catch (error) {
      //
    }
  };

  const getToken = async (captcha: string, code?: string) => {
    try {
      if (isAuth) {
        return;
      }
      const _secretCode = generateRandomString(10);

      const rs = await generateTOkenWithSecretCode(_secretCode, captcha);
      AuthenStorage.setGuestSecretKey(_secretCode);
      AuthenStorage.setGuestAuthenKey(rs?.token);
      dispatch(setGuestSecretCode(_secretCode));
    } catch (error) {
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  useEffect(() => {
    createNewSecretCode();
  }, [isAuth]);

  useEffect(() => {
    getTokens();
  }, [user]);

  const checkLocation = async () => {
    try {
      const rs = await getLocation();
      const country_code = rs?.data?.result;

      const banned = COUNTRY_BANNED.includes(country_code?.toUpperCase?.());
      setIsBanned(banned);
      if (setBanned) setBanned(banned)
    } catch (error) {
    } finally {
      setCheckingLocation(false);
    }
  };

  const getTokens = async () => {
    try {
      if(!depositAddress) {
        const rs = await getPublicsaleWalletInfo();
        if (rs.length > 0 && !selectToken) {
          setSelectToken(rs[0]);
        }
        setTokens(rs);
        dispatch(setDepositAddress(rs));
      } else {
        setTokens(depositAddress);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const convertAmountUsdtToToken = useMemo(() => {
    if (
      amount_usd &&
      parseFloat(amount_usd) > 0 &&
      selectToken?.coin &&
      (coinPrices as any)[selectToken.coin]
    ) {
      return new BigNumber(amount_usd)
        .dividedBy((coinPrices as any)[selectToken.coin])
        .toFixed(8);
    }

    if (
      selectToken &&
      (compareString(selectToken.coin, 'USDT') ||
        compareString(selectToken.coin, 'USDC'))
    ) {
      return amount_usd?.toString();
    }

    return '0';
  }, [coinPrices, amount_usd, selectToken]);

  if (loading || checkingLocation || generating) {
    return (
      <Center>
        <AppLoading />
      </Center>
    );
  }

  if (isBanned) {
    return (
      <Flex className={s.banned} gap="44px" alignItems="center" pb="32px" flexDir={{ base: 'column', lg: "row" }}>
        <Flex flexDir="column" gap={{ base: "24px", md: "32px" }} flex={1}>
          <Text className={s.banned_title}>
            Looks like you’re from the US.
          </Text>
          <Flex flexDir="column" gap="12px">
            <Text className={s.banned_content}>
              The BVM public sale is not open to US citizens. But you can explore utilities on various Bitcoin L2 blockchains powered by BVM, such as <a href="https://bitcoinarcade.xyz/" target="_blank">Gaming</a>, <a href="https://nakachain.xyz/perpetual" target="_blank">DeFi</a>, <a href="https://alpha.wtf/" target="_blank">SocialFi</a>, <a href="https://playmodular.com/workshop" target="_blank">Education</a>, and <a href="https://eternalai.org/" target="_blank">AI</a>.
            </Text>
            <Text className={s.banned_content}>
              We’re planning to list BVM on exchanges soon. So you can purchase BVM on exchanges in the future.
            </Text>
            <Text className={s.banned_content}>
              Welcome to the future of Bitcoin.
            </Text>
          </Flex>
        </Flex>
        <Flex maxW="340px" display={{ base: "none", lg: "initial" }}>
          <Image src="public-sale/banned_img.png" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex className={s.depositContent}>
      <Text className={s.descStaked}>
        Make a contribution using any of the currencies below.
        {/*<br />*/}
        {/*After your payment processes, you’ll get a confirmation code to claim*/}
        {/*your $BVM allocation later.*/}
      </Text>
      {/* {secretCode && (
        <>
          <Flex className={s.wrapSecretKey}>
            <Text className={s.titleCopy}>
              Use this code to claim. copy now
            </Text>
            <Flex
              className={s.backupNow}
              onClick={() => {
                toast.success('Secret copied. Backup now');
                copy(secretCode);
              }}
            >
              <Flex alignItems={'center'} gap={'8px'}>
                <SvgInset size={16} svgUrl="/icons/ic_wallet.svg" />
                <Text>{secretCode}</Text>
              </Flex>
              <SvgInset size={20} svgUrl="/icons/ic-copy.svg" />
            </Flex>
          </Flex>
        </>
      )} */}

      {isDepositAnotherAccount ? (
        <>
          <ImportOrCreate />
          <Box className={s.depositAnotherAccount}>
            <Text
              onClick={() => {
                setIsDepositAnotherAccount(false);
              }}
            >
              Back to deposit
            </Text>
          </Box>
        </>
      ) : (
        <>
          {isMobile ? (
            <Menu>
              <MenuButton className={s.btnSelectToken}>
                <DepositContentItem token={selectToken} />
                <SvgInset svgUrl="/icons/ic_arrow_down.svg" />
              </MenuButton>
              <MenuList>
                {tokens.map((t) => (
                  <DepositContentItem
                    key={t.coin}
                    token={t}
                    onSelectToken={(_token) => setSelectToken(_token)}
                  />
                ))}
              </MenuList>
            </Menu>
          ) : (
            <Flex className={s.tokenWrapper}>
              {tokens.map((t) => (
                <DepositContentItem2
                  key={t.coin}
                  token={t}
                  onSelectToken={(_token) => setSelectToken(_token)}
                  isActive={compareString(t.coin, selectToken?.coin)}
                />
              ))}
            </Flex>
          )}

          {selectToken && (
            <Flex
              className={s.infoDepositWrap}
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Flex flexDirection={'column'} gap={'12px'}>
                <Flex className={s.qrCodeContainer}>
                  <QRCode size={184} value={selectToken?.address} />
                </Flex>
                {parseFloat(convertAmountUsdtToToken || '0') > 0 && (
                  <Text className={s.balanceConvert}>
                    ${formatCurrency(amount_usd, 0, 0, 'BTC', true)} ={' '}
                    {formatCurrency(
                      convertAmountUsdtToToken,
                      2,
                      2,
                      'BTC',
                      true,
                    )}{' '}
                    {selectToken.coin}
                  </Text>
                )}
              </Flex>
              <Flex className={s.wrapTokenDepositDetail}>
                <Flex className={s.wrapTokenDepositDetailItem}>
                  <Text className={s.wrapTokenDepositDetailItemTitle}>
                    Network
                  </Text>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                    }}
                    className={s.wrapTokenDepositDetailItemValue}
                  >
                    {selectToken.network.join(', ')}
                  </Text>
                </Flex>
                <Flex className={s.wrapTokenDepositDetailItem}>
                  <Text className={s.wrapTokenDepositDetailItemTitle}>
                    Deposit Address
                  </Text>
                  <Flex className={s.wrapTokenDepositDetailItemValueAddress}>
                    <Text className={s.wrapTokenDepositDetailItemValue}>
                      {selectToken.address}
                    </Text>
                    <SvgInset
                      onClick={() => {
                        copy(selectToken.address);
                        toast.success('Address copied');
                      }}
                      svgUrl="/icons/ic-copy.svg"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}

          {/* {secretCode && !token && (
            <>
              <Box className={s.depositAnotherAccount}>
                <Text
                  onClick={() => {
                    setIsDepositAnotherAccount(true);
                  }}
                >
                  Deposit by another account
                </Text>
              </Box>
            </>
          )} */}
        </>
      )}

      <Box />
    </Flex>
  );
};

DepositContent.defaultProps = {
  amount_usd: '0',
};

export default DepositContent;
