import IconClose from '@/public/icons/icon-close.svg';
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
        <IconClose />
      </Box>
    </Flex>
  );
};

export default ToastMessage;
