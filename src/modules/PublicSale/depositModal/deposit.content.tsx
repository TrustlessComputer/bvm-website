import AppLoading from '@/components/AppLoading';
import SvgInset from '@/components/SvgInset';
import { PublicSaleWalletTokenDeposit } from '@/interfaces/vc';
import { getPublicsaleWalletInfo } from '@/services/public-sale';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { userSelector } from '@/stores/states/user/selector';
import { formatCurrency } from '@/utils/format';
import { compareString } from '@/utils/string';
import {
  Box,
  Center,
  Flex,
  FocusLock,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import DepositContentItem, {
  DepositContentItem2,
} from './deposit.content.item';
import s from './styles.module.scss';
import { isMobile } from 'react-device-detect';
import AuthenStorage from '@/utils/storage/authen.storage';
import BaseModal from '@/components/BaseModal';
import AuthForBuy from '../AuthForBuy';
import BuyAsGuest from '../AuthForBuy/buyAsGuest';
import ImportOrCreate from '../AuthForBuy/importOrCreate';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import DepositCheck from './deposit.check';
import { FormikProvider } from 'formik';

interface IDepositContent {
  amount_usd?: string;
  onHide?: any;
}

const DepositContent: React.FC<IDepositContent> = ({ amount_usd, onHide }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const user = useAppSelector(userSelector);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<PublicSaleWalletTokenDeposit[]>([]);
  const [selectToken, setSelectToken] = useState<
    PublicSaleWalletTokenDeposit | undefined
  >(undefined);
  const secretCode = user?.guest_code;
  const token = AuthenStorage.getAuthenKey();
  const [isDepositAnotherAccount, setIsDepositAnotherAccount] = useState(false);
  const firstFieldRef = React.useRef(null);

  const coinPrices = useSelector(commonSelector).coinPrices;

  useEffect(() => {
    getTokens();
  }, [user]);

  const getTokens = async () => {
    try {
      const rs = await getPublicsaleWalletInfo();
      if (rs.length > 0 && !selectToken) {
        setSelectToken(rs[0]);
      }
      setTokens(rs);
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

  if (loading) {
    return (
      <Center>
        <AppLoading />
      </Center>
    );
  }

  return (
    <Flex className={s.depositContent}>
      {secretCode && (
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
      )}

      {isDepositAnotherAccount ? (
        <>
          <GoogleReCaptchaProvider
            reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
            scriptProps={{
              async: false,
              defer: false,
              appendTo: 'head',
              nonce: undefined,
            }}
          >
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
          </GoogleReCaptchaProvider>
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
                  <Popover
                    isOpen={isOpen}
                    initialFocusRef={firstFieldRef}
                    onOpen={onOpen}
                    onClose={onClose}
                    closeOnBlur={false}
                    placement="top-start"
                  >
                    <PopoverTrigger>
                      <Box mt={'12px'} className={s.depositAnotherAccount}>
                        <Text onClick={onOpen}>Already deposited?</Text>
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent px={2} pt={5} pb={2}>
                      <FocusLock persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <GoogleReCaptchaProvider
                          reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
                          scriptProps={{
                            async: false,
                            defer: false,
                            appendTo: 'head',
                            nonce: undefined,
                          }}
                        >
                          <DepositCheck onClose={onClose} />
                        </GoogleReCaptchaProvider>
                      </FocusLock>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </Flex>
            </Flex>
          )}
          {secretCode && !token && (
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
          )}
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
