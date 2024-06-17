import BaseModal from '@/components/BaseModal';
import { Divider, Flex, Text, Link, Button } from '@chakra-ui/react';

import s from './styles.module.scss';
import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import useOrderMapper from '../../hooks/useOrderMapper';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { isEmpty } from 'lodash';
import { RollupEnumMap } from '../../Buy/Buy.constanst';
import { useDashboard } from '../../providers/DashboardProvider';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
  cancelOrderOnClick?: () => void;
  updateOrderOnClick?: () => void;
  item?: OrderItem;
}

const ItemDetailModal = (props: IProps) => {
  const {
    show,
    onClose,
    item,
    onSuccess,
    cancelOrderOnClick,
    updateOrderOnClick,
  } = props;
  const test111 = useDashboard();
  const dispatch = useAppDispatch();

  const order = item;
  const isHasValue = (value: string) => {
    return value && value !== '0';
  };

  if (!order) return <></>;

  const mapper = useOrderMapper(order);

  const renderRowInfor = (
    label = '',
    content = '',
    isLink = false,
    contentColorStr = '#1c1c1c',
    iconShareLink = false,
  ) => {
    return (
      <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
        <Text fontSize={'18px'} fontWeight={600} color={'#17066c'}>
          {label}
        </Text>
        {isLink ? (
          <Flex flexDir={'row'} align={'center'} gap={'5px'}>
            <Link
              fontSize={'18px'}
              fontWeight={400}
              color={'#1c1c1c'}
              href={
                iconShareLink
                  ? `https://bvm.network/blockchains/${content || ''}`
                  : `${content}`
              }
              target={'_blank'}
              textDecorationStyle={'solid'}
              textDecorationLine={`${
                content.length > 0 ? 'underline' : 'none'
              }`}
              textDecorationColor={'#000'}
              alignSelf={'flex-end'}
              textAlign={'end'}
            >
              {`${content.length > 0 ? content : '--'}`}
            </Link>
            {iconShareLink && (
              <ExternalLinkIcon
                w={'20px'}
                h={'20px'}
                color={'#777777'}
                onClick={() => {
                  window.open(
                    `https://bvm.network/blockchains/${content || ''}`,
                    '_blank',
                  );
                }}
              ></ExternalLinkIcon>
            )}
          </Flex>
        ) : (
          <Text
            fontSize={'18px'}
            fontWeight={400}
            color={`${contentColorStr}`}
            alignSelf={'flex-end'}
            textAlign={'end'}
          >
            {`${content.length > 0 ? content : '--'}`}
          </Text>
        )}
      </Flex>
    );
  };

  const rednerButtonRow = () => {
    if (order?.status !== OrderStatus.WaitingPayment) return null;
    return (
      <Flex flexDir={'row'} align={'center'} gap={'20px'}>
        <Button
          bgColor={'#fff'}
          color={'#FA4E0E'}
          borderColor={'#FA4E0E'}
          borderWidth={'1px'}
          borderRadius={'100px'}
          h={'54px'}
          w={'100%'}
          className={s.fontType3}
          fontSize={'16px'}
          fontWeight={500}
          onClick={(event) => {
            if (event.stopPropagation) event.stopPropagation();
            cancelOrderOnClick && cancelOrderOnClick();
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          Cancel
        </Button>

        <Button
          bgColor={'#FA4E0E'}
          color={'#fff'}
          borderRadius={'100px'}
          h={'54px'}
          w={'100%'}
          className={s.fontType3}
          fontSize={'16px'}
          fontWeight={500}
          onClick={(event) => {
            if (event.stopPropagation) event.stopPropagation();
            updateOrderOnClick && updateOrderOnClick();
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          Update
        </Button>
      </Flex>
    );
  };

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex flexDir={'column'}>
        <Text fontSize={'26px'} fontWeight={600} color={'#000'}>
          {mapper.computerIndexer || ''}
        </Text>
        <Flex flexDir={'column'} gap={'20px'} mt={'20px'}>
          {order.instanceId &&
            isEmpty(order.instanceId) &&
            renderRowInfor(
              'Instance ID',
              `${order.instanceId || ''}`,
              true,
              '#1c1c1c',
              true,
            )}
          {renderRowInfor('ZK-powered Blockchain', `${order.chainName}`)}
          {!mapper.isLayer1 &&
            renderRowInfor(
              'Rollup protocol',
              `${RollupEnumMap[order.serviceType]}`,
            )}
          {!!isHasValue(order.blockTime) &&
            renderRowInfor('Block time', `${mapper.blockTime}`)}
          {!!isHasValue(order.finalizationPeriod) &&
            renderRowInfor('Withdrawal Period', `${mapper.finalizationPeriod}`)}
          {/* {renderRowInfor(
            'Network type',
            `${order.isMainnet ? 'Bitcoin Mainnet' : 'Bitcoin Testnet'}`,
          )} */}
        </Flex>
        <Divider my={'20px'} borderColor="gray.200" />

        <Flex flexDir={'column'} gap={'20px'} mt={'20px'}>
          {renderRowInfor(
            'Native token',
            `${order.preMint === 0 ? 'BVM' : order.ticker || '--'}`,
          )}
          {renderRowInfor('RPC URL', `${order.rpc}`, true)}
          {renderRowInfor('Chain ID', `${order.chainId}`)}
          {renderRowInfor('Block explorer URL', `${order.explorer}`, true)}
          {renderRowInfor('Status', `${mapper.status}`, false, mapper.color)}
          {rednerButtonRow()}
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ItemDetailModal;
