import BaseModal from '@/components/BaseModal';
import { Flex, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import s from './styles.module.scss';

interface IProps {
  title: string;
  show: boolean;
  onClose: (() => void) | any;
  content: React.ReactNode | null | string;
}

const DescriptionModal = forwardRef((props: IProps, ref: any) => {
  const { title, show, onClose, content } = props;
  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        m={['10px', '20px']}
        direction={'column'}
        color={'black'}
        p={['7px', '10px']}
        gap={'10px'}
      >
        {title && (
          <Text fontSize={['18px', '20px', '24px']} fontWeight={600}>
            {title}
          </Text>
        )}
        {content &&  <div className={s.content} dangerouslySetInnerHTML={{ __html: content as any }} />}
      </Flex>
    </BaseModal>
  );
});

export default DescriptionModal;
