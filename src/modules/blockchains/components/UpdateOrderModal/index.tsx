import BaseModal from '@/components/BaseModal';
import TextInput from '@/components/TextInput/TextInput';
import l2ServicesAPI, { orderDetailByID } from '@/services/api/l2services';
import {
  Button,
  Flex,
  Image,
  ListItem,
  Spinner,
  Text,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { isMobile } from 'react-device-detect';
import { useAppDispatch } from '@/stores/hooks';
import {
  setOrderSelected,
  updateOrderByNewOrder,
} from '@/stores/states/l2services/reducer';
import {
  IOrderUpdate,
  OrderItem,
  OrderStatus,
} from '@/stores/states/l2services/types';
import { getErrorMessage } from '@/utils/errorV2';
import sleep from '@/utils/sleep';
import { isEmpty } from 'lodash';
import toast from 'react-hot-toast';
import ErrorMessage from '../../Buy/components/ErrorMessage';
import DropFile from './DropFile';
import cs from 'classnames';

const MAXIMUM_FILE_UPLOAD = 1; //1 MB
const TITLE_ERROR_MESSAGE = 'Chain name is required';
const DESC_ERROR_MESSAGE = 'Description is required';

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

  const [isFetchingData, setFetchingData] = useState<boolean>(false);
  const [isUpdating, setUpdating] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const [rawFile, setRawFile] = useState<File | undefined>(undefined);

  const [preview, setPreview] = useState<string | null>(null);

  const floadFilePreview = async (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    floadFilePreview(rawFile);
  }, [rawFile]);

  const isSubmitDisabled = useMemo(() => {
    return isFetchingData || isUpdating;
  }, [isFetchingData, isUpdating]);

  const buttonTitle = useMemo(() => {
    if (isUpdating) return 'Updating...';
    return 'Confirm';
  }, [isFetchingData, isUpdating]);

  const uploadLogoHandler = async () => {
    if (!rawFile) return;
    try {
      return l2ServicesAPI.uploadLogoFile(rawFile);
    } catch (error) {
      throw error;
    }
  };

  const updateInforHandler = async () => {
    try {
      if (!item || !chainName) return;

      setUpdating(true);

      const logoURL = await uploadLogoHandler();

      const params: IOrderUpdate = {
        chainName: chainName,
        description: desc,
        logoURL: logoURL || '',
      };

      const data: OrderItem = await l2ServicesAPI.orderUpdateAPI(
        params,
        item?.orderId,
      );

      if (data) {
        const newData = await orderDetailByID(item?.orderId);

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

    // if (isEmpty(desc)) {
    //   setDescError(DESC_ERROR_MESSAGE);
    //   setDescFocused(true);
    //   valid = false;
    // } else if (descError) {
    //   setDescFocused(true);
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
          minH={['40px', '45px', '50px']}
          minW={['120px', '140px', '160px']}
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
          fontSize={['14px', '15px', '16px']}
          onClick={submitHandler}
        >
          {buttonTitle}
        </Button>
      </Flex>
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
            fontSize={['12px', '13px', '14px']}
            fontWeight={500}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`Chain Name`}
          </Text>
        </Flex>

        <TextInput
          borderColor={'#bebebe'}
          minH={['40px', '45px', '50px']}
          fontSize={['12px', '13px', '14px']}
          placeholder="Chain Name"
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
            fontSize={['12px', '13px', '14px']}
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
          fontSize={['12px', '13px', '14px']}
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
            // if (!value || value.length < 1) {
            //   setDescError(DESC_ERROR_MESSAGE);
            // } else {
            //   setDescError('');
            // }
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

  const handleChangeFile = (file: File | undefined): void => {
    setRawFile(file);
  };

  const renderLogoField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'flex-start'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex flexDir={'column'} w={'100%'}>
          <Text
            fontSize={['12px', '13px', '14px']}
            fontWeight={500}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`Logo`}
          </Text>
        </Flex>

        <DropFile
          labelText={'Upload your image file here'}
          className={s.dropZoneContainer}
          acceptedFileType={['png', 'svg', 'jpg', 'jpeg']}
          maxSize={MAXIMUM_FILE_UPLOAD} //unit MB
          onChange={handleChangeFile}
          fileOrFiles={rawFile ? [rawFile] : undefined}
          onErrorCB={(message) => {
            setRawFile(undefined);
          }}
        />

        <UnorderedList
          color={'#6C6F93'}
          fontSize={['12px', '13px', '14px']}
          fontWeight={500}
        >
          <ListItem>{'Supported file formats: svg, png, jpg, jpeg'}</ListItem>
          <ListItem>{`Maximum file size: ${MAXIMUM_FILE_UPLOAD} MB`}</ListItem>
          <ListItem>{`Recommended image sizes: 200x200`}</ListItem>
        </UnorderedList>
      </Flex>
    );
  };

  const renderPreviewLogo = () => {
    if (preview || (item?.logoURL && item?.logoURL.length > 0)) {
      return (
        <Image
          w="auto"
          h={'150px'}
          fit={'contain'}
          src={preview || item?.logoURL}
        />
      );
    }
    return null;
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
              fontSize={['18px', '20px', '24px']}
              fontWeight={600}
              color={'#000'}
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
        {renderDescField()}
        {renderLogoField()}
        {renderPreviewLogo()}
        {renderSubmitButton()}
      </Flex>
    );
  };

  if (!item) return null;
  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={cs(s.modalContent, isMobile ? s.isMobile : {})}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      {renderContent()}
    </BaseModal>
  );
};

export default UpdateOrderModal;
