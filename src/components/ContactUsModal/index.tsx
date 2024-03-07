import { Flex, Text, Input, Textarea } from '@chakra-ui/react';
import BaseModal from '../BaseModal';
import s from './styles2.module.scss';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import { submitContact } from '@/services/api/l2services';
import { SubmitFormParams } from '@/services/api/l2services/types';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';

const ContactUsModal = ({ isShow, onHide, onSuccesCB }: any) => {
  const [yourXAcc, setYourXAcc] = useState('');
  const [yourXAccErrMsg, setYourXAccErrMsg] = useState<string | undefined>(
    undefined,
  );

  const [yourTelegramAcc, setYourTelegramAcc] = useState('');
  const [yourTelegramAccErrMgs, setYourTelegramAccErrMgs] = useState<
    string | undefined
  >(undefined);

  const [yourPlan, setYouPlan] = useState('');
  const [yourPlanErrMgs, setYourPlanErrMgs] = useState<string | undefined>(
    undefined,
  );

  const valideYourXAcc = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourXAccErrMsg('Your X is required.');
      return false;
    } else {
      setYourXAccErrMsg(undefined);
      return true;
    }
  };

  const valideYourTelegramAcc = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourTelegramAccErrMgs('Your telegram is required.');
      return false;
    } else {
      setYourTelegramAccErrMgs(undefined);
      return true;
    }
  };

  const valideYourPlan = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourPlanErrMgs('Your plan is required.');
      return false;
    } else {
      setYourPlanErrMgs(undefined);
      return true;
    }
  };

  const submitHandler = async () => {
    try {
      let valid = true;
      if (!valideYourXAcc(yourXAcc)) {
        valid = false;
      }
      // if (!valideYourTelegramAcc(yourTelegramAcc)) {
      //   valid = false;
      // }
      // if (!valideYourPlan(yourPlan)) {
      //   valid = false;
      // }

      console.log('valid ', valid);
      if (valid) {
        const params: SubmitFormParams = {
          bitcoinL2Name: '',
          bitcoinL2Description: yourPlan,
          network: '',
          dataAvailability: '',
          blockTime: '',
          rollupProtocol: '',
          withdrawPeriod: '',
          twName: yourXAcc,
          telegram: yourTelegramAcc,
        };
        const result = await submitContact(params);
        console.log('[submitHandler] result: ', result);
        if (result) {
          onSuccesCB && onSuccesCB();
        }
      }
    } catch (error) {
      console.log('[submitHandler] ERROR: ', error);
      const { message } = getError(error);
      toast.error(message);
    }
  };

  return (
    <>
      <BaseModal
        isShow={isShow}
        onHide={onHide}
        headerClassName={s.modalManualHeader}
        className={s.modalContent}
        size="custom"
        icCloseUrl="/icons/ic-close-grey.svg"
      >
        <Flex direction={'column'} color={'black'} w={'100%'} gap={'20px'}>
          <Text fontSize={['24px']} fontWeight={500} lineHeight={'34px'}>
            Tell us a bit about you
          </Text>

          <Flex
            direction={'column'}
            display={'flex'}
            alignItems={'center'}
            justify={'flex-start'}
            textAlign={'left'}
            w={'100%'}
            gap={'20px'}
          >
            {/* Your X handle" */}
            <Flex
              direction={'column'}
              display={'flex'}
              alignItems={'center'}
              justify={'flex-start'}
              textAlign={'left'}
              w={'100%'}
              gap={'8px'}
            >
              <Text
                fontSize={'12px'}
                fontWeight={500}
                lineHeight={'20px'}
                alignSelf={'flex-start'}
                textTransform={'uppercase'}
                color={'#5B5B5B'}
              >
                Your X handle
<<<<<<< HEAD
              </Text>
              <Input
                border="1px solid #CECECE"
                placeholder="Paste your X profile link here"
=======
                <span className={s.reuiqredLabel}>(*)</span>
              </Text>
              <Input
                border="1px solid #CECECE"
                placeholder="Enter here"
>>>>>>> main
                _placeholder={{
                  color: 'grey',
                }}
                _hover={{}}
                height={'48px'}
                p={'11px'}
                value={yourXAcc}
                onChange={(e: any) => {
                  setYourXAcc(e.target.value);
                  valideYourXAcc(e.target.value);
                }}
              />

              {yourXAccErrMsg && (
                <Text
                  fontSize={'12px'}
                  fontWeight={500}
                  lineHeight={'20px'}
                  alignSelf={'flex-start'}
                  color={'red'}
                >
                  {yourXAccErrMsg}
                </Text>
              )}
            </Flex>

            {/* Your X handle" */}
            <Flex
              direction={'column'}
              display={'flex'}
              alignItems={'center'}
              justify={'flex-start'}
              textAlign={'left'}
              w={'100%'}
              gap={'8px'}
            >
              <Text
                fontSize={'12px'}
                fontWeight={500}
                lineHeight={'20px'}
                alignSelf={'flex-start'}
                textTransform={'uppercase'}
                color={'#5B5B5B'}
              >
                Your telegram handle
              </Text>
              <Input
                border="1px solid #CECECE"
<<<<<<< HEAD
                placeholder="Paste your telegram link here"
=======
                placeholder="Enter here"
>>>>>>> main
                _placeholder={{
                  color: 'grey',
                }}
                _hover={{}}
                height={'48px'}
                p={'11px'}
                value={yourTelegramAcc}
                onChange={(e: any) => {
                  setYourTelegramAcc(e.target.value);
<<<<<<< HEAD
                  valideYourTelegramAcc(e.target.value);
=======
                  // valideYourTelegramAcc(e.target.value);
>>>>>>> main
                }}
              />
              {yourTelegramAccErrMgs && (
                <Text
                  fontSize={'12px'}
                  fontWeight={500}
                  lineHeight={'20px'}
                  alignSelf={'flex-start'}
                  color={'red'}
                >
                  {yourTelegramAccErrMgs}
                </Text>
              )}
            </Flex>

            {/* Tell us more about your plan with your Bitcoin L2 */}
            <Flex
              direction={'column'}
              display={'flex'}
              alignItems={'center'}
              justify={'flex-start'}
              textAlign={'left'}
              w={'100%'}
              gap={'8px'}
            >
              <Text
                fontSize={'12px'}
                fontWeight={500}
                lineHeight={'20px'}
                alignSelf={'flex-start'}
                textTransform={'uppercase'}
                color={'#5B5B5B'}
              >
                Tell us more about your plan with your Bitcoin L2
              </Text>
              <Textarea
                border="1px solid #CECECE"
                placeholder="Enter your plan here"
                _placeholder={{
                  color: 'grey',
                }}
                _hover={{}}
                height={'48px'}
                p={'11px'}
                value={yourPlan}
                onChange={(e: any) => {
                  setYouPlan(e.target.value);
<<<<<<< HEAD
                  valideYourXAcc(e.target.value);
=======
                  // valideYourXAcc(e.target.value);
>>>>>>> main
                }}
              />
              {yourPlanErrMgs && (
                <Text
                  fontSize={'12px'}
                  fontWeight={500}
                  lineHeight={'20px'}
                  alignSelf={'flex-start'}
                  color={'red'}
                >
                  {yourPlanErrMgs}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex
            onClick={submitHandler}
            flexDir={'row'}
            borderRadius={'4px'}
            justify={'center'}
            align={'center'}
            px={'10px'}
            py={'5px'}
            className={s.submitBtn}
            color={'#fff'}
            gap={'10px'}
            _hover={{
              cursor: 'pointer',
            }}
          >
            Submit
          </Flex>
        </Flex>
      </BaseModal>
    </>
  );
};

export default ContactUsModal;
