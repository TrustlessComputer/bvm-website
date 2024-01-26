import BaseModal from '@/components/BaseModal';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';
import LeaderBoard from '@/modules/PublicSale/leaderBoard';

const ContributorsModal = ({ isShow, onHide }: any) => {

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Find your contribution'}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
    >
      <div className={s.container}>
        <div className={s.content}>
          <Text className={s.desc}>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</Text>
          <LeaderBoard />
        </div>
      </div>
    </BaseModal>
  );
};

export default ContributorsModal;
