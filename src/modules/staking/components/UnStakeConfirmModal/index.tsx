import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const UnStakeConfirmModal = ({ show, onHide, onConfirm }: IProps) => {
  return (
    <BaseModal theme="dark" isShow={show} onHide={onHide} title="Are you sure you want to unstake?" size="small">
      <p>By unstaking, you will forfeit all your <span style={{fontWeight: '600', color: '#6FFE43'}}>Shard</span>, future airdrop benefits, and exclusive access.</p>
      <Flex mt="24px" direction="row" alignItems="center" gap="16px">
        <Button
          w="100%"
          h="44px"
          bg="transparent !important"
          border='1px solid #ACF8C6'
          color="#ACF8C6 !important"
          onClick={() => {
            onConfirm();
            onHide();
          }}
          borderRadius="100px"
        >
          Un-Stake
        </Button>
        <Button
          w="100%"
          h="44px"
          bg="#ACF8C6 !important"
          color="#000000 !important"
          borderRadius="100px"
          onClick={onHide}
        >
          Cancel
        </Button>
      </Flex>
    </BaseModal>
  );
};

export default UnStakeConfirmModal;
