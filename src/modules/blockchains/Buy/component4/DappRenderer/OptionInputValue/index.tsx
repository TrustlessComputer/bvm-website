import classNames from 'classnames';
// import styles from '@/modules/blockchains/Buy/component4/DappRenderer/styles.module.scss';
import Label from '@/modules/blockchains/Buy/components3/Label';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  useOptionInputStore,
  useOptionInputValue,
} from '@/modules/blockchains/Buy/component4/DappRenderer/OptionInputValue/useOptionInputStore';
import { useSignalEffect } from '@preact/signals-react';
import { IModelOption } from '@/types/customize-model';
import { Flex, Input, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { isEmpty, debounce } from 'lodash';
import { getErrorMessage } from '@/utils/errorV2';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';

export default function OptionInputValue({ option }: { option: IModelOption }) {
  const { isUpdateFlow } = useChainProvider();
  const { setValue } = useOptionInputStore();
  const vl = useOptionInputValue(option.key);

  const [sta, seSta] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );

  const endpointURL = useMemo(() => {
    return option.addOnInputs?.attrs?.api_check_valid + '';
  }, [option]);

  const isFieldRequired = useMemo(() => {
    return (
      !!option.addOnInputs?.attrs?.required &&
      !!option.addOnInputs?.attrs?.api_check_valid
    );
    // return false;
  }, [option]);

  const isError = useMemo(() => {
    if (!isFieldRequired) return undefined;
    return !!errorMessage;
  }, [isFieldRequired, errorMessage]);

  const apiHandler = async (text: string) => {
    let isValid = true;
    let errorMsg = undefined;
    try {
      const apiURLFull = `${endpointURL}?value=${text}`;
      const response = await fetch(`${apiURLFull}`, {
        method: 'GET',
      });

      const dataJSON = await response.json();

      if (dataJSON && dataJSON.result && dataJSON.result.valid) {
        isValid = true;
      } else {
        isValid = false;
        const errorMessgeFromServer = dataJSON.error;
        if (dataJSON && errorMessgeFromServer) {
          if (errorMessgeFromServer.includes('already exist')) {
            errorMsg = 'Already exists!';
          } else {
            errorMsg = dataJSON.error || '';
          }
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      console.log('message ERROR: ', message);
      errorMsg = message;
    } finally {
      setErrorMessage(errorMsg);
      return {
        isValid,
        errorMsg,
      };
    }
  };

  const apiCheckDebouce = useCallback(debounce(apiHandler, 500), []);

  const checkValidate = (text: string | undefined) => {
    if (!text || isEmpty(text)) {
      setErrorMessage('Field is required.');
    } else {
      apiCheckDebouce(text);
    }
  };

  // console.log(' --- ', {
  //   endpointURL,
  //   isFieldRequired,
  //   isError,
  //   option,
  // });

  useEffect(() => {
    console.log('[useEffect] option -- ', option);
  }, []);

  useSignalEffect(() => {
    seSta(vl.value);
  });

  const onChangeHandler = (text: any) => {
    if (isFieldRequired) {
      checkValidate(text);
    }
  };

  return (
    <div className={classNames(s.isOptionInput)}>
      <Label icon={option.icon} title={option.title} />
      <Flex flexDir={'row'} align={'center'} gap={'4px'}>
        {/* <input
          type={option.addOnInputs?.type || 'text'}
          placeholder={option.addOnInputs?.attrs?.placeholder}
          onChange={(e) => {
            setValue(option.key, e.target.value);
            onChangeHandler(e.target.value);
          }}
          value={sta}
        /> */}

        <Input
          className={s.input}
          type={option.addOnInputs?.type || 'text'}
          placeholder={option.addOnInputs?.attrs?.placeholder}
          fontSize={'14px'}
          value={sta}
          borderColor={isError ? 'red' : 'transparent'}
          borderWidth={isError ? '2px' : 'none'}
          disabled={isUpdateFlow}
          onBlur={(e: any) => {
            const text = e.target.value;
            onChangeHandler(text);
          }}
          onChange={(e) => {
            const text = e.target.value;
            setValue(option.key, text);
            onChangeHandler(text);
          }}
          _hover={{
            cursor: isUpdateFlow ? 'not-allowed' : 'auto',
          }}
          _focus={{
            borderColor: isError ? '#ff6666ff' : 'transparent',
          }}
          _disabled={{
            color: '#fff',
          }}
        />
        {isError && errorMessage && (
          <Text
            px={'5px'}
            bgColor={'#FF4747'}
            borderRadius={'4px'}
            maxW={'max-content'}
            className={s.fontError}
            position={'relative'}
            color={'#fff'}
            fontWeight={500}
            fontSize={['13px']}
          >
            {errorMessage}
          </Text>
        )}
      </Flex>
    </div>
  );
}
