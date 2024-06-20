import { Flex, Text, Input, Textarea } from '@chakra-ui/react';
import BaseModal from '../BaseModal';
import s from './styles2.module.scss';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import { submitContact } from '@/services/api/l2services';
import { SubmitFormParams } from '@/services/api/l2services/types';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import { Select } from '@chakra-ui/react';

const SUBJECT_LIST = [
  `I'd like to build a ZK Rollup on Bitcoin`,
  `I'd like to make a partnership proposal`,
  `I have an issue with the payment process`,
  `I'd like to setup an Enterprise account with BVM`,
  `Others`,
];

const ContactUsModal = ({ isShow, onHide, onSuccesCB }: any) => {
  const [subject, setSubject] = useState(0);

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
          isContractUs: true,
          subject: SUBJECT_LIST[subject],
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
            How can we help you?
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
            <Flex w={'100%'} flexDir={'row'} align={'center'} gap={'20px'}>
              {/* Your X handle */}
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
                  <span className={s.reuiqredLabel}>(*)</span>
                </Text>
                <Input
                  border="1px solid #CECECE"
                  placeholder=""
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
                {/* 
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
                )} */}
              </Flex>

              {/* Your Telegram handle" */}
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
                  {/* <span className={s.reuiqredLabel}>(*)</span> */}
                </Text>
                <Input
                  border="1px solid #CECECE"
                  placeholder=""
                  _placeholder={{
                    color: 'grey',
                  }}
                  _hover={{}}
                  height={'48px'}
                  p={'11px'}
                  value={yourTelegramAcc}
                  onChange={(e: any) => {
                    setYourTelegramAcc(e.target.value);
                    // valideYourTelegramAcc(e.target.value);
                  }}
                />
                {/* {yourTelegramAccErrMgs && (
                  <Text
                    fontSize={'12px'}
                    fontWeight={500}
                    lineHeight={'20px'}
                    alignSelf={'flex-start'}
                    color={'red'}
                  >
                    {yourTelegramAccErrMgs}
                  </Text>
                )} */}
              </Flex>
            </Flex>

            <Flex flexDir={'row'} align={'center'} width={'100%'} mt={'-10px'}>
              <Flex flex={1}>
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

              {/* <Flex flex={1}>
                {yourTelegramAccErrMgs && (
                  <Text
                    marginLeft={'15px'}
                    fontSize={'12px'}
                    fontWeight={500}
                    lineHeight={'20px'}
                    alignSelf={'flex-end'}
                    color={'red'}
                  >
                    {yourTelegramAccErrMgs}
                  </Text>
                )}
              </Flex> */}
            </Flex>

            {/* Common reasons. */}
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
                Subject
              </Text>
              <Select
                defaultValue={SUBJECT_LIST[subject]}
                height={'50px'}
                borderRadius={'8px'}
                border={'0.5px solid #c2c2c2'}
                _hover={{}}
                onChange={(e) => {
                  setSubject(Number(e.target.value));
                }}
              >
                {SUBJECT_LIST.map((subject, index) => {
                  return (
                    <option key={subject + index} value={index}>
                      {SUBJECT_LIST[index]}
                    </option>
                  );
                })}
              </Select>
            </Flex>

            {/* PLEASE PROVIDE US WITH MORE DETAILS. */}
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
                Please provide us with more details.
              </Text>
              <Textarea
                border="1px solid #CECECE"
                placeholder=""
                _placeholder={{
                  color: 'grey',
                }}
                _hover={{}}
                height={'48px'}
                p={'11px'}
                value={yourPlan}
                onChange={(e: any) => {
                  setYouPlan(e.target.value);
                  // valideYourXAcc(e.target.value);
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
