import React from 'react';
import toast from 'react-hot-toast';
import s from './styles.module.scss';
import { Box, Flex, Text } from '@chakra-ui/react';

interface IProps {
  id: string;
  message: string;
  url?: string;
  linkText?: string;
  description?: string;
}

const ToastMessage: React.FC<IProps> = ({
  id,
  url,
  message,
  linkText,
  description,
}: IProps): React.ReactElement => {
  const onHandleLink = () => {
    toast.remove(id);
    if (!url) {
      return;
    }

    let target = '_blank';

    if (!url?.includes?.('http://') && !url?.includes?.('https://')) {
      target = '_self';
    }

    return window.open(url, target);
  };

  return (
    <Flex className={s.container}>
      <Flex
        gap={'4px'}
        justifyContent={'space-between'}
        width={'100%'}
        flexDirection={'column'}
      >
        <Text className={s.messageText}>{message}</Text>
        {description && (
          <Text className={s.descriptionText}>{description}</Text>
        )}
        {url && (
          <Text
            onClick={onHandleLink}
            target="_blank"
            rel="noopener noreferrer"
            className={s.walletLink}
            style={{ cursor: 'pointer' }}
            as={'a'}
          >
            {linkText || 'View transaction >>'}
          </Text>
        )}
      </Flex>
      <Box
        className={s.btnClose}
        onClick={() => toast.dismiss(id)}
        cursor={'pointer'}
      >
        <svg
          width="69"
          height="69"
          viewBox="0 0 69 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="68" height="69" rx="34" fill="white" />
          <path
            d="M34.5 33.086L39.45 28.136L40.864 29.55L35.914 34.5L40.864 39.45L39.449 40.864L34.499 35.914L29.55 40.864L28.136 39.449L33.086 34.499L28.136 29.549L29.55 28.137L34.5 33.086Z"
            fill="black"
          />
        </svg>
      </Box>
    </Flex>
  );
};

export default ToastMessage;
