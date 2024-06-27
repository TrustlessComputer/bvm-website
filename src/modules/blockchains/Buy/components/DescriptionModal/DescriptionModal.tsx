import BaseModal from '@/components/BaseModal';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import s from './styles.module.scss';

interface IProps {
  title: string;
  show: boolean;
  onClose: (() => void) | any;
  content: React.ReactNode | null;
}

const DescriptionModal = (props: IProps) => {
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
        align={'center'}
      >
        {title && (
          <Text fontSize={['18px', '20px', '24px']} fontWeight={600}>
            {title}
          </Text>
        )}
        {content && <Text fontSize={['15px', '16px', '18px']}>{content}</Text>}
      </Flex>
    </BaseModal>
  );
};

export default DescriptionModal;
