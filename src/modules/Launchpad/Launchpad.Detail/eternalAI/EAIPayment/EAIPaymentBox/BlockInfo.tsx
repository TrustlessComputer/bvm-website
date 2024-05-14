import Countdown from '@/components/Countdown';
import ContributorsModal from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/ContributorModal';
import ContributorInfo from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/EAIPaymentBox/contributorInfo';

import { formatCurrency } from '@/utils/format';
import {
  Box,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import cs from 'classnames';
import { isAddress } from 'ethers/lib/utils';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styles from './styles.module.scss';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  summarySelector,
  userContributeSelector,
} from '@/modules/Launchpad/store/lpEAIPayment/selector';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { clearPublicSaleLeaderBoard } from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { isAmount } from '@/utils/number';
import { requestReload } from '@/stores/states/common/reducer';

interface IProps {
  isEnd: boolean;
}

const BlockInfo = ({ isEnd }: IProps) => {
  const summary = useSelector(summarySelector);
  const userContribute = useSelector(userContributeSelector);
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();

  const address = wallet?.address;
  const isAuthenticated = address;

  const { isOpen, onClose, onOpen } = useDisclosure();

  // const cachedEndTime = useRef(summary?.end_time);

  const endTime = useMemo(() => {
    // if (summary?.end_time) {
    //   cachedEndTime.current = summary?.end_time;
    //   return summary?.end_time;
    // }
    // return cachedEndTime.current;
    return '2024-03-29T15:00:00Z';
  }, []);

  return (
    <SimpleGrid
      gridTemplateColumns={{ base: '1fr', md: '1fr 2fr 2fr' }}
      width="100%"
      gap="24px"
    >
      <Box className={styles.block}>
        <p className={styles.block_title}>Backers</p>
        <p
          className={styles.block_value}
          onClick={() => {
            dispatch(clearPublicSaleLeaderBoard());
            if (isAmount(summary?.total_user)) {
              onOpen();
            }
          }}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {formatCurrency(summary?.total_user, 0)}
        </p>
      </Box>
      <Box className={styles.block}>
        <p className={styles.block_title}>Ends in</p>
        <p className={styles.block_value}>
          <Countdown
            showDay={true}
            className={cs(styles.countdownTime, styles.highLight)}
            expiredTime={endTime as string}
            onRefreshEnd={() => dispatch(requestReload())}
            hideIcon={true}
          />
        </p>
      </Box>
      {isAuthenticated ? (
        <Popover trigger={'hover'} placement="top" isLazy>
          <PopoverTrigger>
            <Flex cursor={'pointer'} alignItems={'center'} gap={'4px'}>
              <Box className={styles.block}>
                <Flex alignItems="center" gap="6px">
                  {userContribute?.twitter_username &&
                  !isAddress(userContribute?.twitter_username) ? (
                    <Image
                      alt={userContribute?.address}
                      src={userContribute?.twitter_avatar}
                      width={'18px'}
                      height={'18px'}
                      borderRadius={'100%'}
                      fallback={
                        <Jazzicon
                          diameter={18}
                          seed={jsNumberForAddress(address || '')}
                        />
                      }
                    />
                  ) : (
                    <Jazzicon
                      diameter={18}
                      seed={jsNumberForAddress(address || '')}
                    />
                  )}

                  <p className={styles.block_title}>Your contribution</p>
                </Flex>
                <Flex alignItems="center" gap="6px">
                  <p className={styles.block_value}>
                    ${formatCurrency(userContribute?.usdt_value, 0, 3)}
                  </p>
                  {Boolean(userContribute?.view_boost) &&
                    !!Number(userContribute?.view_boost || 0) && (
                      <Flex
                        gap={'2px'}
                        alignItems={'center'}
                        bg={'linear-gradient(90deg, #00F5A0 0%, #00D9F5 100%)'}
                        borderRadius={'100px'}
                        p={'4px 8px'}
                        width={'90px'}
                        justifyContent="center"
                      >
                        <Text
                          fontSize={'14px'}
                          fontWeight={'500'}
                          color={'#000'}
                          textAlign="center"
                          // className={s.boost}
                        >
                          {userContribute?.view_boost
                            ? `+${formatCurrency(
                                userContribute?.view_boost,
                                0,
                                0,
                                'BTC',
                                true,
                              )}% boost`
                            : '-'}
                        </Text>
                      </Flex>
                    )}
                </Flex>
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent backgroundColor="white" width="400px">
            <PopoverArrow backgroundColor="white" />
            <PopoverBody
              style={{
                padding: '12px',
                borderRadius: '8px',
              }}
              backgroundColor="white !important"
            >
              <ContributorInfo data={userContribute!} isEnd={isEnd} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Box className={styles.block}>
          <p className={styles.block_title}>Your contribution</p>
          <p className={styles.block_value}>
            ${formatCurrency(userContribute?.usdt_value, 0, 3)}
          </p>
        </Box>
      )}

      {isOpen && (
        <ContributorsModal isShow={isOpen} isEnd={isEnd} onHide={onClose} />
      )}
    </SimpleGrid>
  );
};

export default BlockInfo;
