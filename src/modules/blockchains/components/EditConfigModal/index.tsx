import BaseModal from '@/components/BaseModal';
import { Button, Flex, Spinner, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import l2ServicesAPI from '@/services/api/l2services';

import { isEmpty } from 'lodash';
import ErrorMessage from '../../Buy/components/ErrorMessage';
import {
  MetaConfig,
  OrderItem,
  WebsiteConfig,
} from '@/stores/states/l2services/types';
import { getErrorMessage } from '@/utils/errorV2';
import toast from 'react-hot-toast';
import sleep from '@/utils/sleep';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const checkImageURL = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
};

// TO DO
const checkValidHexColor = (hexColor: string) => {
  //With transparent support
  var reg = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i;
  return reg.test(hexColor);
};

const TITLE_ERROR_MESSAGE = 'Title is required';
const DESC_ERROR_MESSAGE = 'Description is required';
const LOGOURL_ERROR_MESSAGE = 'LogoUrl is required';
const LOGOURL_INVALID_ERROR_MESSAGE = 'Logo url is invalid format';

interface IProps {
  show: boolean;
  item?: OrderItem;
  onClose?: (() => void) | any;
  onSuccess?: () => void;
}

const EditConfigModal = (props: IProps) => {
  const { show, onClose, item, onSuccess } = props;

  const [configObj, setConfigObj] = useState<WebsiteConfig>();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [titleFocused, setTitleFocused] = useState(false);

  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState('');
  const [descFocused, setDescFocused] = useState(false);

  const [logoUrl, setLogoUrl] = useState('');
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

  useEffect(() => {
    fetchConfigInforData();
  }, []);

  const fetchConfigInforData = async () => {
    try {
      setFetchingData(true);
      const data = (await l2ServicesAPI.getConfigInfor(
        item?.domain!,
      )) as WebsiteConfig;
      setConfigObj(data);
      if (data) {
        setTitle(data.metaConfig?.tabTitle);
        setDesc(data.metaConfig?.tabDesc);
        setLogoUrl(data.metaConfig?.favIconUrl);
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      setErrorMessage(message);
      // toast.error(message); //Show Toast Error if Needed
      // onClose & onClose();
    } finally {
      setFetchingData(false);
    }
  };

  const updateInforHandler = async () => {
    try {
      if (!configObj) return;

      setUpdating(true);

      const params: WebsiteConfig = {
        ...configObj,
        metaConfig: {
          ...configObj.metaConfig,
          tabTitle: title,
          tabDesc: desc,
          favIconUrl: logoUrl,
        },
        themeConfig: {
          ...configObj.themeConfig,
        },
      };
      const data = await l2ServicesAPI.updateConfigInfor(item?.domain!, params);
      if (data) {
        setTitle(data.metaConfig?.tabTitle);
        setDesc(data.metaConfig?.tabDesc);
        setLogoUrl(data.metaConfig?.favIconUrl);

        toast.success('Update Successful');

        await sleep(1);

        onSuccess && onSuccess();
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

    if (isEmpty(title)) {
      setTitleError(TITLE_ERROR_MESSAGE);
      setTitleFocused(true);
      valid = false;
    }

    if (isEmpty(desc)) {
      setDescError(DESC_ERROR_MESSAGE);
      setDescFocused(true);
      valid = false;
    }

    if (isEmpty(logoUrl)) {
      setLogoUrlError(LOGOURL_ERROR_MESSAGE);
      setLogoUrlFocused(true);
      valid = false;
    }

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
          bgColor={'#17066C'}
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

  const renderTitleField = () => {
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
            {`Title`}
          </Text>
        </Flex>

        <TextInput
          borderColor={'#bebebe'}
          minH={'50px'}
          fontSize={'14px'}
          placeholder="Your title"
          id={'TITLE'}
          isInvalid={!!titleFocused && !!titleError}
          value={`${title || ''}`}
          onBlur={() => {
            setTitleFocused(true);
          }}
          onFocus={(e: any) => {
            setTitleFocused(true);
          }}
          onChange={(e: any) => {
            const value = e.target.value;
            if (!value || value.length < 1) {
              setTitleError(TITLE_ERROR_MESSAGE);
            } else {
              setTitleError('');
            }
            setTitle(value);
          }}
        />
        {titleFocused && titleError && <ErrorMessage message={titleError} />}
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
  const renderLogoURLField = () => {
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
            {`Logo Url`}
          </Text>
        </Flex>

        <TextInput
          minH={'50px'}
          borderColor={'#bebebe'}
          fontSize={'14px'}
          placeholder="Logo url (Ex: http://abc.[png, jpg, jpeg, svg] )"
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
            if (!value || value.length < 1) {
              setLogoUrlError('LogoUrl is required');
            } else if (!checkImageURL(value)) {
              setLogoUrlError(LOGOURL_INVALID_ERROR_MESSAGE);
            } else {
              setLogoUrlError('');
            }
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
        bgColor={'#ECECEC'}
        borderRadius={'10px'}
        p={'20px'}
        gap={'20px'}
      >
        <Flex align={'center'} justify={'space-between'}>
          <Text
            fontSize={'24px'}
            fontWeight={600}
            color={'#000'}
            lineHeight={'20px'}
            alignSelf={'flex-start'}
          >
            {`Edit`}
          </Text>

          {/* <Flex gap={'5px'} align={'center'}>
            <Link
              fontSize={'15px'}
              fontWeight={600}
              color={'#2e26cd'}
              lineHeight={'20px'}
              alignSelf={'flex-start'}
              href={item.plugins[0].link}
              target="_blank"
              textDecorationLine={'underline'}
            >
              {'Your Bridge Page'}
            </Link>
            <ExternalLinkIcon w={'18px'} h={'18px'} color={'#2e26cd'} />
          </Flex> */}
        </Flex>

        {renderTitleField()}
        {renderLogoURLField()}
        {renderDescField()}
        {renderSubmitButton()}
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
      {isFetchingData ? renderLoading() : renderContent()}
    </BaseModal>
  );
};

export default EditConfigModal;
