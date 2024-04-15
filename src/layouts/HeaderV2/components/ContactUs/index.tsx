// import { CDN_URL } from '@constants/config';
import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';

type Props = {
  color?: 'black' | 'white';
};

const ContactUs = (props: Props) => {
  const { showContactUsModal } = useContactUs();

  // const handleConnect = async () => {
  //   try {
  //     await login();
  //   } catch (err: unknown) {
  //     toast.error(
  //       (err as Error).message ||
  //         'Something went wrong. Please try again later.',
  //     );
  //   }
  // };

  return (
    <>
      <Flex
        onClick={() => {
          showContactUsModal();
        }}
        flexDir={'row'}
        borderRadius={'4px'}
        justify={'center'}
        align={'center'}
        py={'5px'}
        color={props?.color || 'white'}
        gap={'10px'}
        _hover={{
          cursor: 'pointer',
        }}
      >
        <p className={s.contact}> Contact us</p>
      </Flex>
    </>
  );
};

export default ContactUs;
