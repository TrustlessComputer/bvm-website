// import { CDN_URL } from '@constants/config';
import React, {ReactElement, useState} from 'react';
import {Flex, Text} from '@chakra-ui/react';
import s from './styles.module.scss';
import {useContactUs} from '@/Providers/ContactUsProvider/hook';

type Props = {
  color?: 'black' | 'white';
};

const ContactUs = (props: Props): ReactElement => {
  const {showContactUsModal} = useContactUs();

  return (
    <>
      <Flex
        onClick={() => {
          showContactUsModal();
        }}
        flexDir={'row'}
        justify={'center'}
        align={'center'}
        className={s.btn}
        color={props?.color || 'white'}
        _hover={{
          cursor: 'pointer',
        }}
      >
        Contact Us
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="black" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round"></path>
        </svg>
      </Flex>
    </>
  );
};

export default ContactUs;
