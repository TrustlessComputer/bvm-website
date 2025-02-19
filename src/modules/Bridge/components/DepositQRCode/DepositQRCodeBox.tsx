import SvgInset from '@/components/SvgInset';
import { showSuccess } from '@/components/toast';
import { formatAmountToClient, formatCurrencyV2 } from '@/utils/format';
import { removeTrailingZeroes } from '@/utils/string';
import { Center, Flex, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import copy from 'copy-to-clipboard';
import { memo, useMemo } from 'react';
import s from './styles.module.scss';
import QRCodeGenerator from '@components/QRCodeGenerator';
import { BridgeToken, IDepositQRCode } from '@/modules/Bridge/types';
import { useWagmiContext } from '@components/WagmiConnector/WagmiProvider';
import Loading from '@components/Loading';

const CDN_URL_ICONS = 'https://cdn.nakaswap.org' + '/naka/icons';

interface IQRCodeBoxAutoEstimate {
  fromToken: BridgeToken;
  toToken: BridgeToken;
  depositQRCode?: IDepositQRCode;
  loading: boolean;
}

const QRCodeBox = (props: IQRCodeBoxAutoEstimate) => {
  const { fromToken, toToken, depositQRCode, loading } = props;

  const paymentFeeStr = formatAmountToClient(depositQRCode?.depositFee || '0');
  const { onSwitchChain } = useWagmiContext();

  const paymentFeeFormatted = removeTrailingZeroes(
    formatCurrencyV2({
      amount: paymentFeeStr,
      decimals: 6,
    }),
  );

  const tokenSymbol = fromToken?.symbol?.toUpperCase();

  const estWaitingTime = useMemo(() => {
    // return estimateBridgeTime({
    //   fromToken: fromToken,
    //   toToken: toToken,
    // });
    return "2 minutes";
  }, [fromToken, toToken]);

  const renderSendDescription = () => {
    if (new BigNumber(paymentFeeFormatted).isZero()) {
      return (
        <Text className={s.title}>
          Please transfer any amount of <span>{tokenSymbol}</span> to the
          following address.
        </Text>
      );
    }
    return (
      <Text className={s.title}>
        Please send <span>{tokenSymbol}</span> to the following address.
      </Text>
    );
  };

  const onClickCopy = (address: string) => {
    copy(address);
    showSuccess({ message: 'Copied' });
  };

  const renderNetworkFee = () => {
    if (new BigNumber(paymentFeeFormatted).isZero()) {
      return <></>;
    } else {
      return (
        <Flex direction="column" gap="4px">
          {renderRow({
            key: 'Network fee:',
            value: `~ ${paymentFeeFormatted} ${tokenSymbol}`,
          })}
          {!!depositQRCode?.minDepositAmount &&
            depositQRCode?.minDepositAmount !== '0'}
          {renderRow({
            key: 'Min. deposit:',
            value: `${formatCurrencyV2({
              amount: formatAmountToClient(new BigNumber(depositQRCode?.minDepositAmount || '0').toString()),
            })} ${tokenSymbol}`,
          })}
          <Flex
            direction="row"
            alignItems="center"
            gap="8px"
            border="1px solid rgba(255, 126, 33, 0.3)"
            p="12px"
            borderRadius="12px"
            mt="12px"
          >
            <SvgInset size={16} svgUrl={`${CDN_URL_ICONS}/ic_warning.svg`} />
            <Text
              color="rgb(255, 126, 33)"
              textAlign="left"
              fontWeight="500"
              fontSize="13px"
            >
              Please be aware that deposits below the network fee will be
              rejected and cannot be recovered.
            </Text>
          </Flex>
        </Flex>
      );
    }
  };

  const renderRow = (params: { key: string; value: string }) => {
    return (
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="black" opacity={0.8}>{params.key}</Text>
        <Text textAlign="end" color="black">{params.value}</Text>
      </Flex>
    );
  };

  const upperFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (loading || !depositQRCode?.depositAddress) return <Center><Loading /></Center>;

  return (
    <Flex direction="column">
      <Flex direction="column" className={s.container}>
        <div className={s.row}>{renderSendDescription()}</div>
        <div className={s.addressBox}>
          <Flex width="100%">
            <p className={s.address}>{depositQRCode?.depositAddress || ''} </p>
          </Flex>
          <SvgInset
            size={24}
            svgUrl={`/icons/ic-copy-3.svg`}
            className={s.addressBox_iconCopy}
            onClick={() => onClickCopy(depositQRCode?.depositAddress || '')}
          />
        </div>
        <Text color="black" fontSize="18px" fontWeight="700" mt="12px">
          Network: {upperFirst(fromToken.network.name || '')}
        </Text>
        <div className={s.wrap_qr}>
          <QRCodeGenerator
            bgColor="#FFFFFF"
            size={220}
            value={depositQRCode?.depositAddress || ''}
          />
        </div>
      </Flex>
      <Flex flexDirection="column" mt="20px" gap="4px">
        {renderRow({ key: 'Waiting time:', value: `~ ${estWaitingTime}` })}
        {renderNetworkFee()}
        {/*<Text*/}
        {/*  color="black" fontSize="13px" fontWeight="500" mt="12px" textAlign="center"*/}
        {/*  cursor="pointer"*/}
        {/*  onClick={() => {*/}
        {/*    onSwitchChain(toToken.chainId)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Add {toToken?.network.displayName} network to your Metamask*/}
        {/*</Text>*/}
      </Flex>
    </Flex>
  );
};

export default memo(QRCodeBox);
