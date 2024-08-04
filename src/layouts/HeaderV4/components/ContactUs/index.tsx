// import { CDN_URL } from '@constants/config';
import React, { ReactElement, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

type Props = {
  color?: 'black' | 'white';
};

const ContactUs = (props: Props): ReactElement => {
  const { showContactUsModal } = useContactUs();

  return (
    <>
      <Flex
        onClick={() => {
          showContactUsModal({ subjectDefault: 0 });
        }}
        flexDir={'row'}
        justify={'center'}
        align={'center'}
        className={s.btn}
        transition={'opacity .4s ease'}
        _hover={{
          cursor: 'pointer',
          opacity: .8,
        }}
      >
        Contact us
      </Flex>
    </>
  );
};

export default ContactUs;
