import BaseModal from '@/components/BaseModal';
import { Divider, Flex, Text, Link } from '@chakra-ui/react';

import { useState } from 'react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';
import { useAppSelector } from '@/stores/hooks';
import { getOrderByIDSelector } from '@/stores/states/l2services/selector';
import useOrderMapper from '../../hooks/useOrderMapper';

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
  item?: OrderItem;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, onClose, item, onSuccess } = props;
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
  ) => {
    return (
      <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
        <Text fontSize={'18px'} fontWeight={600} color={'#17066c'}>
          {label}
        </Text>
        {isLink ? (
          <Link
            fontSize={'18px'}
            fontWeight={400}
            color={'#1c1c1c'}
            href={`${content}`}
            textDecorationStyle={'solid'}
            textDecorationLine={`${content.length > 0 ? 'underline' : 'none'}`}
            textDecorationColor={'#000'}
            alignSelf={'flex-end'}
            textAlign={'end'}
          >
            {`${content.length > 0 ? content : '--'}`}
          </Link>
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
          {renderRowInfor('Bitcoin L2 Name', `${order.chainName}`)}
          {!mapper.isLayer1 &&
            renderRowInfor('Rollup protocol', 'Optimistic rollups')}
          {!!isHasValue(order.blockTime) &&
            renderRowInfor('Block time', `${mapper.blockTime}`)}
          {!!isHasValue(order.finalizationPeriod) &&
            renderRowInfor('Withdrawal Period', `${mapper.finalizationPeriod}`)}
          {renderRowInfor(
            'Network type',
            `${order.isMainnet ? 'Bitcoin Mainnet' : 'Bitcoin Testnet'}`,
          )}
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
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
