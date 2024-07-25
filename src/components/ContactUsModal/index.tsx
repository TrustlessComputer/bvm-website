import { Flex, Text, Input, Textarea } from '@chakra-ui/react';
import BaseModal from '../BaseModal';
import s from './styles2.module.scss';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import { submitContact } from '@/services/api/l2services';
import { SubmitFormParams } from '@/services/api/l2services/types';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import { Select } from '@chakra-ui/react';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';
import { DATA_BRAND } from '@/modules/landingV3/data-sections';
import Image from 'next/image';

const SUBJECT_LIST = [
  `I'd like to build a blockchain on Bitcoin`,
  `I'd like to make a partnership proposal`,
  `I have an issue with the payment process`,
  `I'd like to setup an Enterprise account with BVM`,
  `Others`,
];

const METHODS_CONTACT = [`Email`, `X (Twitter)`, `Telegram`];

enum METHODS_CONTACT_ENUM {
  Email = 0,
  Twitter,
  Telegram,
}

const ContactUsModal = ({
  isShow,
  onHide,
  onSuccesCB,
  subjectDefault,
  params,
}: any) => {
  const [subject, setSubject] = useState(subjectDefault);
  const [methodContact, setMethodContact] = useState(0);

  const { tracking } = useL2ServiceTracking();

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

  const [methodInput, setMethodInput] = useState('');
  const [methodInputErrMgs, setmethodInputErrMgs] = useState<
    string | undefined
  >(undefined);

  const valideYourXAcc = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourXAccErrMsg('Your X is required.');
      return false;
    } else {
      setYourXAccErrMsg(undefined);
      return true;
    }
  };

  const validateMethodContact = (text: string) => {
    if (!text || isEmpty(text)) {
      setmethodInputErrMgs('Preferred contact method is required!');
      return false;
    } else {
      setmethodInputErrMgs(undefined);
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
    tracking('SUBMIT_CONTACT_US');
    try {
      let valid = true;
      // if (!valideYourXAcc(yourXAcc)) {
      //   valid = false;
      // }
      // if (!valideYourTelegramAcc(yourTelegramAcc)) {
      //   valid = false;
      // }
      // if (!valideYourPlan(yourPlan)) {
      //   valid = false;
      // }

      if (!validateMethodContact(methodInput)) {
        valid = false;
      }

      // console.log('valid ', valid);
      // console.log('methodContact ', methodContact);

      if (valid) {
        const submitParams: SubmitFormParams = {
          bitcoinL2Name: '',
          bitcoinL2Description: yourPlan,
          network: '',
          dataAvailability: '',
          blockTime: '',
          rollupProtocol: '',
          withdrawPeriod: '',
          email:
            methodContact === METHODS_CONTACT_ENUM.Email ? methodInput : '',
          twName:
            methodContact === METHODS_CONTACT_ENUM.Twitter ? methodInput : '',
          telegram:
            methodContact === METHODS_CONTACT_ENUM.Telegram ? methodInput : '',
          isContractUs: true,
          subject: SUBJECT_LIST[subject],
          nodeConfigs: params ? params : [],
        };

        console.log('[submitHandler] Params: ', submitParams);
        const result = await submitContact(submitParams);
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

  const renderXfield = () => {
    return (
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
          fontSize={'14px'}
          color={'#00000099'}
          fontWeight={400}
          alignSelf={'flex-start'}
          textTransform={'uppercase'}
        >
          Your X handle
          <span className={s.reuiqredLabel}>(*)</span>
        </Text>
        <Input
          border="1px solid #E7E7E7"
          _placeholder={{
            color: 'grey',
          }}
          _hover={{}}
          height={'62px'}
          p={'11px'}
          fontSize={'18px'}
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
        fontWeight={400}
        lineHeight={'20px'}
        alignSelf={'flex-start'}
        color={'red'}
      >
        {yourXAccErrMsg}
      </Text>
    )} */}
      </Flex>
    );
  };

  const renderTelegramField = () => {
    return (
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
          fontSize={'14px'}
          color={'#00000099'}
          fontWeight={400}
          alignSelf={'flex-start'}
          textTransform={'uppercase'}
        >
          Your telegram handle
          {/* <span className={s.reuiqredLabel}>(*)</span> */}
        </Text>
        <Input
          border="1px solid #E7E7E7"
          _placeholder={{
            color: 'grey',
          }}
          _hover={{}}
          height={'62px'}
          p={'11px'}
          fontSize={'18px'}
          value={yourTelegramAcc}
          onChange={(e: any) => {
            setYourTelegramAcc(e.target.value);
            // valideYourTelegramAcc(e.target.value);
          }}
        />
        {/* {yourTelegramAccErrMgs && (
    <Text
      fontSize={'12px'}
      fontWeight={400}
      lineHeight={'20px'}
      alignSelf={'flex-start'}
      color={'red'}
    >
      {yourTelegramAccErrMgs}
    </Text>
  )} */}
      </Flex>
    );
  };

  const renderMethodContact = () => {
    return (
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
          fontSize={'14px'}
          color={'#00000099'}
          fontWeight={400}
          alignSelf={'flex-start'}
          textTransform={'uppercase'}
        >
          Preferred contact method:
          {/* <span className={s.reuiqredLabel}>(*)</span> */}
        </Text>
        <Select
          value={methodContact}
          height={'50px'}
          borderRadius={'8px'}
          fontSize={['18px']}
          border="1px solid #E7E7E7"
          _hover={{}}
          onChange={(e) => {
            setMethodContact(Number(e.target.value));
          }}
        >
          {METHODS_CONTACT.map((subject, index) => {
            return (
              <option
                key={subject + index}
                value={index}
                defaultValue={METHODS_CONTACT[0]}
              >
                {METHODS_CONTACT[index]}
              </option>
            );
          })}
        </Select>
      </Flex>
    );
  };

  const renderMethodInput = () => {
    return (
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
          fontSize={'14px'}
          color={'#00000099'}
          fontWeight={400}
          alignSelf={'flex-start'}
          textTransform={'uppercase'}
        >
          {/* Preferred contact method: */}
          {/* <span className={s.reuiqredLabel}>(*)</span> */}
        </Text>
        <Input
          border="1px solid #E7E7E7"
          _placeholder={{
            color: 'grey',
          }}
          _hover={{}}
          height={'50px'}
          p={'11px'}
          fontSize={'18px'}
          value={methodInput}
          onChange={(e: any) => {
            setMethodInput(e.target.value);
            // valideYourTelegramAcc(e.target.value);
          }}
        />
      </Flex>
    );
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
        <div className={s.modalContent_inner}>
          <Flex
            direction={'column'}
            padding={'28px'}
            color={'black'}
            backgroundColor={'#fff'}
            gap={'20px'}
          >
            <div>
              <Text fontSize={['18px', '20px', '24px']} fontWeight={500}>
                Get a personalized demo
              </Text>
              <Text fontSize={['14', '16']} fontWeight={400}>
                Help us tailor the demo experience to your needs.
              </Text>
            </div>

            <Flex
              direction={'column'}
              display={'flex'}
              alignItems={'center'}
              justify={'flex-start'}
              textAlign={'left'}
              w={'100%'}
              gap={'20px'}
            >
              {/* <Flex w={'100%'} flexDir={'row'} align={'center'} gap={'20px'}>
                {renderXfield()}
                {renderTelegramField()}
              </Flex> */}

              <Flex w={'100%'} flexDir={'column'} align={'center'} gap={'20px'}>
                <Text
                  fontSize={'14px'}
                  color={'#00000099'}
                  fontWeight={400}
                  alignSelf={'flex-start'}
                  textTransform={'uppercase'}
                >
                  Preferred contact method:
                  {/* <span className={s.reuiqredLabel}>(*)</span> */}
                </Text>

                <Flex
                  mt={'-10px'}
                  w={'100%'}
                  flexDir={'row'}
                  align={'center'}
                  justify={'space-between'}
                  gap={'20px'}
                >
                  <Select
                    value={methodContact}
                    height={'50px'}
                    w="100%"
                    borderRadius={'8px'}
                    fontSize={['18px']}
                    border="1px solid #E7E7E7"
                    _hover={{}}
                    onChange={(e) => {
                      setMethodContact(Number(e.target.value));
                      setMethodInput('');
                    }}
                  >
                    {METHODS_CONTACT.map((subject, index) => {
                      return (
                        <option
                          key={subject + index}
                          value={index}
                          defaultValue={METHODS_CONTACT[0]}
                        >
                          {METHODS_CONTACT[index]}
                        </option>
                      );
                    })}
                  </Select>

                  <Input
                    border="1px solid #E7E7E7"
                    _placeholder={{
                      color: 'grey',
                    }}
                    _hover={{}}
                    height={'50px'}
                    p={'11px'}
                    fontSize={'18px'}
                    value={methodInput}
                    onChange={(e: any) => {
                      setMethodInput(e.target.value);
                      // valideYourTelegramAcc(e.target.value);
                    }}
                  />
                </Flex>
                {methodInputErrMgs && (
                  <Text
                    mt={'-10px'}
                    fontSize={'12px'}
                    fontWeight={400}
                    lineHeight={'20px'}
                    alignSelf={'flex-start'}
                    color={'red'}
                  >
                    {methodInputErrMgs}
                  </Text>
                )}
              </Flex>

              <Flex
                flexDir={'row'}
                align={'center'}
                width={'100%'}
                mt={'-10px'}
              >
                <Flex flex={1}>
                  {yourXAccErrMsg && (
                    <Text
                      fontSize={['10px', '11px', '12px']}
                      fontWeight={400}
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
                    fontWeight={400}
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
                  fontSize={'14px'}
                  color={'#00000099'}
                  fontWeight={400}
                  alignSelf={'flex-start'}
                  textTransform={'uppercase'}
                >
                  Subject
                </Text>
                <Select
                  value={subject}
                  height={'50px'}
                  borderRadius={'8px'}
                  fontSize={['18px']}
                  border="1px solid #E7E7E7"
                  _hover={{}}
                  onChange={(e) => {
                    setSubject(Number(e.target.value));
                  }}
                >
                  {SUBJECT_LIST.map((subject, index) => {
                    return (
                      <option
                        key={subject + index}
                        value={index}
                        defaultValue={SUBJECT_LIST[3]}
                      >
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
                  fontSize={'14px'}
                  color={'#00000099'}
                  fontWeight={400}
                  alignSelf={'flex-start'}
                  textTransform={'uppercase'}
                >
                  Please provide us with more details (optional)
                </Text>
                <Textarea
                  border="1px solid #E7E7E7"
                  placeholder=""
                  _placeholder={{
                    color: 'grey',
                  }}
                  resize={'none'}
                  _hover={{}}
                  height={'124px'}
                  p={'11px'}
                  fontSize={'18px'}
                  value={yourPlan}
                  onChange={(e: any) => {
                    setYouPlan(e.target.value);
                    // valideYourXAcc(e.target.value);
                  }}
                />
                {yourPlanErrMgs && (
                  <Text
                    fontSize={['10px', '11px', '12px']}
                    fontWeight={400}
                    alignSelf={'flex-start'}
                    color={'red'}
                  >
                    {yourPlanErrMgs}
                  </Text>
                )}
              </Flex>
            </Flex>
            {/*<Flex*/}
            {/*  onClick={submitHandler}*/}
            {/*  flexDir={'row'}*/}
            {/*  borderRadius={'4px'}*/}
            {/*  justify={'center'}*/}
            {/*  align={'center'}*/}
            {/*  px={'10px'}*/}
            {/*  py={'14px'}*/}
            {/*  className={s.submitBtn}*/}
            {/*  color={'#fff'}*/}
            {/*  gap={'10px'}*/}
            {/*  _hover={{*/}
            {/*    cursor: 'pointer',*/}
            {/*  }}*/}
            {/*>*/}
            {/*</Flex>*/}
            <div className={s.submitBtn} onClick={submitHandler}>
              <p>Submit</p>
            </div>
          </Flex>
          <Flex
            direction={'column'}
            padding={'28px'}
            justifyContent={'center'}
            alignItems={'center'}
            color={'black'}
            backgroundColor={'#F4F4F4'}
            gap={'20px'}
          >
            <div>
              <Text
                fontSize={['24px', '32px']}
                fontWeight={500}
                textTransform={'uppercase'}
                textAlign={'center'}
              >
                Build with the Best
              </Text>
              <Text fontSize={['18px']} fontWeight={400} textAlign={'center'}>
                Build your blockchain with ease using modules from the best
                blockchain technologies.
              </Text>
            </div>
            <div className={s.brand}>
              {DATA_BRAND.map((item) => {
                return (
                  <div className={s.brand_item} key={item.title}>
                    <Image
                      className={s.brand_item_img}
                      src={item.icon}
                      width={180}
                      quality={100}
                      height={73}
                      alt="brand"
                    />
                  </div>
                );
              })}
            </div>
          </Flex>
        </div>
      </BaseModal>
    </>
  );
};

export default ContactUsModal;
