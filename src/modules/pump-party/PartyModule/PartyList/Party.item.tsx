import Avatar from '@/components/Avatar';
import { IPumpParty } from '@/services/api/pump-party/types';
import { formatCurrency } from '@/utils/format';
import { Flex, Image, Text } from '@chakra-ui/react';
import BigNumberJS from 'bignumber.js';
import React from 'react';
import styles from './styles.module.scss';

interface IProps {
  party: IPumpParty;
}

const PumpItem = ({ party }: IProps) => {
  const handleGoToTrade = () => {};

  return (
    <Flex key={party.id} flexDirection="column" width="100%">
      <Flex
        className={styles.boardItem}
        flexDirection="row"
        gap="16px"
        onClick={handleGoToTrade}
      >
        <Flex gap="8px" flex={1}>
          <Image
            width="40px"
            height="40px"
            src={party.image}
            borderRadius="8px"
          />
          <Flex flexDirection="column" gap="4px">
            <Text
              fontSize="12px"
              fontWeight="500"
              color="white"
              lineHeight="140%"
            >
              {party.name}{' '}
              {!!party.rune_number && <span>(Rune#{party.rune_number})</span>}
            </Text>
            <Flex alignItems="center" gap="6px">
              <Text
                color="white"
                opacity="0.7"
                fontSize="12px"
                fontWeight="500"
              >
                Created by
              </Text>
              <Flex alignItems="center" gap="6px">
                <Avatar
                  width={16}
                  circle={true}
                  url={party?.owner?.twitter_avatar}
                  address={party?.owner?.address}
                />
                <Text color="white" fontSize="12px" fontWeight="500">
                  {party?.owner?.address?.slice(0, 6)}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="10px" color="white" opacity="0.7">
              Replies: {party.reply_count || '0'}
            </Text>
            <Text fontSize="10px" color="rgba(19, 250, 119, 1)">
              Market cap ${formatCurrency(party.cap, 0, 3, 'BTC', false, 1000)}
            </Text>
          </Flex>
        </Flex>
        <Flex width="90px" flexDirection="column" gap="2px">
          <Text
            fontSize="12px"
            fontWeight="600"
            color="white"
            lineHeight="140%"
            textAlign="end"
          >
            {formatCurrency(party.price)}
          </Text>
          <Text
            fontSize="10px"
            fontWeight="500"
            color="white"
            lineHeight="140%"
            textAlign="end"
            opacity="0.7"
          >
            ${formatCurrency(party.price_usd)}
          </Text>
          <Text
            fontSize={'14px'}
            fontWeight="600"
            lineHeight="140%"
            textAlign="end"
            color="green"
          >
            {formatCurrency(
              Math.abs(new BigNumberJS(party.percent || 0).toNumber()),
              2,
              2,
            )}
            %
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PumpItem;
