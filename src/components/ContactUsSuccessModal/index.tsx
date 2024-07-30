import { Flex, Text, Input, Textarea, Image } from '@chakra-ui/react';
import BaseModal from '../BaseModal';
import s from './styles2.module.scss';
import { useState } from 'react';
import { isEmpty } from 'lodash';

const ContactUsSuccessModal = ({ isShow, onHide }: any) => {
  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        direction={'column'}
        color={'black'}
        w={'100%'}
        align={'center'}
        padding={'30px'}
        gap={'30px'}
      >
        <Image
          src={`/icons/ic-checked-green.svg`}
          fit={'cover'}
          maxW={'78px'}
          maxH={'78px'}
        />
        {/* <Text
          fontSize={'32px'}
          fontWeight={500}
          lineHeight={'34px'}
          color={'#1C1C1C'}
        >
          Submission Received
        </Text> */}
        <Text
          fontSize={'20px'}
          fontWeight={400}
          lineHeight={'34px'}
          color={'#1C1C1C'}
        >
          Thank you. Our team will be in touch soon.
        </Text>
      </Flex>
    </BaseModal>
  );
};

export default ContactUsSuccessModal;
