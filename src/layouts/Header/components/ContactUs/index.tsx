// import { CDN_URL } from '@constants/config';
import React, { useState } from 'react';
import cs from 'classnames';
import { toast } from 'react-hot-toast';
import { useWeb3Authenticated } from '@/Providers/AuthenticatedProvider/hooks';
import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import ContactUsModal from '@/components/ContactUsModal';
import ContactUsSuccessModal from '@/components/ContactUsSuccessModal';

type Props = {
  color: 'black' | 'white';
};

const ContactUs = (props: Props) => {
  const [showContactUsModal, setContactUsModal] = useState(false);
  const [showSubmitSuccessModal, setShowSubmitSuccessModal] = useState(false);

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
          setContactUsModal(true);
        }}
        flexDir={'row'}
        borderRadius={'4px'}
        justify={'center'}
        align={'center'}
        px={'10px'}
        py={'5px'}
        className={s.btnLogin}
        color={props?.color === 'black' ? 'white' : 'black'}
        gap={'10px'}
        _hover={{
          cursor: 'pointer',
        }}
      >
        Contact us
      </Flex>

      {showContactUsModal && (
        <ContactUsModal
          isShow={true}
          onHide={() => setContactUsModal(false)}
          onSuccesCB={() => {
            setContactUsModal(false);
            setShowSubmitSuccessModal(true);
          }}
        />
      )}
      {showSubmitSuccessModal && (
        <ContactUsSuccessModal
          isShow={true}
          onHide={() => setShowSubmitSuccessModal(false)}
        />
      )}
    </>
  );
};

export default ContactUs;
