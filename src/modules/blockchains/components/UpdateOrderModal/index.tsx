import BaseModal from '@/components/BaseModal';
import {
  Button,
  Flex,
  Spinner,
  Text,
  Textarea,
  Image,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import l2ServicesAPI, { orderDetailByID } from '@/services/api/l2services';

import { isEmpty } from 'lodash';
import ErrorMessage from '../../Buy/components/ErrorMessage';
import {
  IOrderUpdate,
  MetaConfig,
  OrderItem,
  OrderStatus,
  WebsiteConfig,
} from '@/stores/states/l2services/types';
import { getErrorMessage } from '@/utils/errorV2';
import toast from 'react-hot-toast';
import sleep from '@/utils/sleep';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '@/stores/hooks';
import {
  setOrderSelected,
  updateOrderByNewOrder,
} from '@/stores/states/l2services/reducer';

const checkImageURL = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
};

const TITLE_ERROR_MESSAGE = 'Rollup name is required';
const DESC_ERROR_MESSAGE = 'Description is required';
const LOGOURL_ERROR_MESSAGE = 'Thumb url is required';
const LOGOURL_INVALID_ERROR_MESSAGE = 'Thumb url is invalid format';

interface IProps {
  show: boolean;
  item?: OrderItem;
  onClose?: (() => void) | any;
  onSuccess?: () => void;
  cancelThisRollupOnClick?: () => void;
}

const UpdateOrderModal = (props: IProps) => {
  const { show, onClose, item, onSuccess, cancelThisRollupOnClick } = props;

  const dispatch = useAppDispatch();

  const [chainName, setChainName] = useState(item?.chainName || '');
  const [chainNameError, setChainNameError] = useState('');
  const [chainNameFocused, setChainNameFocused] = useState(false);

  const [desc, setDesc] = useState(item?.description || '');
  const [descError, setDescError] = useState('');
  const [descFocused, setDescFocused] = useState(false);

  const [logoUrl, setLogoUrl] = useState(item?.thumb || '');
  const [logoUrlError, setLogoUrlError] = useState('');
  const [logoUrlFocused, setLogoUrlFocused] = useState(false);

  const [isFetchingData, setFetchingData] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const isSubmitDisabled = useMemo(() => {
    return isFetchingData || isUpdating;
  }, [isFetchingData, isUpdating]);

  const buttonTitle = useMemo(() => {
    if (isUpdating) return 'Updating...';
    return 'Confirm';
  }, [isFetchingData, isUpdating]);

  const updateInforHandler = async () => {
    try {
      if (!item || !chainName || !desc) return;

      setUpdating(true);

      const params: IOrderUpdate = {
        chainName: chainName,
        description: desc,
        thumb: logoUrl,
      };

      const data: OrderItem = await l2ServicesAPI.orderUpdateAPI(
        params,
        item?.orderId,
      );

      console.log('1 DATA --- ', data);

      if (data) {
        const newData = await orderDetailByID(item?.orderId);

        console.log('2 newData --- ', newData);

        if (newData) {
          toast.success(
            'Your blockchain information has been updated successfully.',
          );

          dispatch(updateOrderByNewOrder(newData));
          dispatch(setOrderSelected(newData));
          await sleep(1);

          onSuccess && onSuccess();
        }
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  const checkValidData = () => {
    let valid = true;

    if (isEmpty(chainName)) {
      setChainNameError(TITLE_ERROR_MESSAGE);
      setChainNameFocused(true);
      valid = false;
    } else if (chainNameError) {
      setChainNameFocused(true);
      valid = false;
    }

    if (isEmpty(desc)) {
      setDescError(DESC_ERROR_MESSAGE);
      setDescFocused(true);
      valid = false;
    } else if (descError) {
      setDescFocused(true);
      valid = false;
    }

    // if (isEmpty(logoUrl)) {
    //   setLogoUrlError(LOGOURL_ERROR_MESSAGE);
    //   setLogoUrlFocused(true);
    //   valid = false;
    // } else if (logoUrlError) {
    //   setLogoUrlFocused(true);
    //   valid = false;
    // }

    return valid;
  };

  const submitHandler = async () => {
    const isValid = checkValidData();
    if (isValid) {
      updateInforHandler();
    }
  };

  const renderSubmitButton = () => {
    return (
      <Flex direction={'column'} display={'flex'} w={'100%'} mt={'20px'}>
        <Button
          px={'30px'}
          borderRadius={'14px'}
          minH={'50px'}
          minW={'160px'}
          bgColor={'#FA4E0E'}
          color={'#fff'}
          _hover={{
            opacity: 0.8,
          }}
          _disabled={{
            opacity: 0.5,
          }}
          isDisabled={isSubmitDisabled}
          isLoading={isFetchingData || isUpdating}
          loadingText={buttonTitle}
          fontSize={'16px'}
          onClick={submitHandler}
        >
          {buttonTitle}
        </Button>
      </Flex>
    );
  };

  const renderCancelThisRollup = () => {
    if (item?.status !== OrderStatus.WaitingPayment) return null;
    return (
      <Text
        marginTop={'20px'}
        opacity={0.7}
        color={'#F44915'}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
        _disabled={{
          opacity: 0.5,
        }}
        align={'center'}
        fontSize={'14px'}
        lineHeight={'19px'}
        onClick={() => {
          cancelThisRollupOnClick && cancelThisRollupOnClick();
        }}
      >
        {'Cancel this rollup'}
      </Text>
    );
  };

  const renderChainNameField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'flex-start'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex
          flexDir={'row'}
          w={'100%'}
          align={'center'}
          justify={'space-between'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`Rollup Name`}
          </Text>
        </Flex>

        <TextInput
          borderColor={'#bebebe'}
          minH={'50px'}
          fontSize={'14px'}
          placeholder="Rollup Name"
          id={'TITLE'}
          isInvalid={!!chainNameFocused && !!chainNameError}
          value={`${chainName || ''}`}
          onBlur={() => {
            setChainNameFocused(true);
          }}
          onFocus={(e: any) => {
            setChainNameFocused(true);
          }}
          onChange={(e: any) => {
            const value = e.target.value;
            if (!value || value.length < 1) {
              setChainName(TITLE_ERROR_MESSAGE);
            } else {
              setChainName('');
            }
            setChainName(value);
          }}
        />
        {chainNameFocused && chainNameError && (
          <ErrorMessage message={chainNameError} />
        )}
      </Flex>
    );
  };

  const renderDescField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'flex-start'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex
          flexDir={'row'}
          w={'100%'}
          align={'center'}
          justify={'space-between'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`Description`}
          </Text>
        </Flex>
        <Textarea
          borderColor={'#bebebe'}
          color={'#000'}
          fontSize={'14px'}
          height={'48px'}
          p={'11px'}
          borderWidth={'1px'}
          borderRadius={'12px'}
          _placeholder={{
            caretColor: '#2b35e4',
            color: '#5a5a5a7b',
          }}
          _hover={{
            borderColor: '#2b35e4',
          }}
          _active={{
            caretColor: '#2b35e4',
            color: '#000',
          }}
          maxLength={500}
          placeholder="Enter your description here"
          name={'TabDescription'}
          value={`${desc || ''}`}
          isInvalid={!!descError && !!descFocused}
          onBlur={() => {
            setDescFocused(true);
          }}
          onChange={(e) => {
            const value = e.target.value;
            if (!value || value.length < 1) {
              setDescError(DESC_ERROR_MESSAGE);
            } else {
              setDescError('');
            }
            setDesc(value);
          }}
          onFocus={(e: any) => {
            setDescFocused(true);
          }}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {descError && descFocused && <ErrorMessage message={descError} />}
      </Flex>
    );
  };

  const renderThumbURLField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'flex-start'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex
          flexDir={'row'}
          w={'100%'}
          align={'center'}
          justify={'space-between'}
        >
          <Text
            fontSize={'14px'}
            fontWeight={500}
            lineHeight={'20px'}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`Logo`}
          </Text>
        </Flex>

        <TextInput
          minH={'50px'}
          borderColor={'#bebebe'}
          fontSize={'14px'}
          placeholder="Logo (Ex: http://abc.[png, jpg, jpeg, svg] )"
          id={'TITLE'}
          name={'TITLE'}
          isInvalid={!!logoUrlError && !!logoUrlFocused}
          value={`${logoUrl || ''}`}
          onBlur={() => {
            setLogoUrlFocused(true);
          }}
          onFocus={(e: any) => {
            setLogoUrlFocused(true);
          }}
          onChange={(e: any) => {
            const value = e.target.value;
            // if (!value || value.length < 1) {
            //   setLogoUrlError('Thumb url is required');
            // } else if (!checkImageURL(value)) {
            //   setLogoUrlError(LOGOURL_INVALID_ERROR_MESSAGE);
            // } else {
            //   setLogoUrlError('');
            // }
            setLogoUrl(value);
          }}
        />

        {logoUrlError && logoUrlFocused && (
          <ErrorMessage message={logoUrlError} />
        )}
      </Flex>
    );
  };

  const renderLoading = () => {
    return (
      <Flex flex={1} w={500} h={500} align={'center'} justify={'center'}>
        <Spinner color={'#000'} />;
      </Flex>
    );
  };

  const renderContent = () => {
    if (errorMessage)
      return (
        <Text
          fontSize={'24px'}
          fontWeight={600}
          color={'#000'}
          lineHeight={'20px'}
          align={'center'}
        >
          {errorMessage}
        </Text>
      );
    return (
      <Flex
        mt={'20px'}
        display={'flex'}
        flexDir={'column'}
        w={'100%'}
        borderRadius={'10px'}
        p={'20px'}
        gap={'20px'}
      >
        {item?.status === OrderStatus.WaitingPayment && (
          <Flex align={'center'} flexDir={'row'}>
            <Text
              fontSize={'24px'}
              fontWeight={600}
              color={'#000'}
              lineHeight={'20px'}
              alignSelf={'flex-start'}
            >
              {`Update`}
            </Text>
            <Flex
              bgColor={'#FAFAFA'}
              borderRadius={'100px'}
              p={'8px'}
              overflow={'hidden'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
            >
              <Image
                src={`/icons/three_dots.svg`}
                onClick={() => {
                  cancelThisRollupOnClick && cancelThisRollupOnClick();
                }}
              />
            </Flex>
          </Flex>
        )}

        {renderChainNameField()}
        {renderThumbURLField()}
        {renderDescField()}
        {renderSubmitButton()}
        {/* {renderCancelThisRollup()} */}
      </Flex>
    );
  };

  if (!item) return null;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      {renderContent()}
    </BaseModal>
  );
};

export default UpdateOrderModal;
