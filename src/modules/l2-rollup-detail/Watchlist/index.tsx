import Avatar from '@/components/Avatar';
import { HEART_BEAT } from '@/constants/route-path';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { IWatchList } from '@/services/api/dapp/rollupl2-detail/interface';
import { commonSelector } from '@/stores/states/common/selector';
import { setOpenWatchList } from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { shortCryptoAddress } from '@/utils/address';
import {
  Box,
  Center,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.module.scss';
import uniqueBy from 'lodash.uniqby';

const WatchListAddresses = () => {
  const router = useRouter();
  const { onToggle } = useDisclosure();
  const needReload = useSelector(commonSelector).needReload;
  const openWatchList = useSelector(getL2ServicesStateSelector).openWatchList;
  const watchLists = useSelector(getL2ServicesStateSelector).watchLists;
  const dispatch = useDispatch();

  const rollupApi = new CRollupL2DetailAPI();
  const [watchList, setWatchList] = useState<IWatchList[]>([]);
  const [loading, setLoading] = useState(true);

  const { loggedIn } = useWeb3Auth();

  const isOpen = openWatchList;

  useEffect(() => {
    getWatchList();
  }, [loggedIn, needReload]);

  const getWatchList = async () => {
    try {
      setLoading(true);
      let _watchList = watchLists;
      if (loggedIn) {
        const rs = await rollupApi.getWatchLists();
        _watchList = _watchList.concat(rs);
      }

      setWatchList(uniqueBy(_watchList, 'org_address'));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box className={s.container}>
          <Flex
            className={s.header}
            alignItems={'center'}
            gap={'8px'}
            justifyContent={'space-between'}
            onClick={() => {
              dispatch(setOpenWatchList(!isOpen));
              onToggle();
            }}
          >
            <Flex alignItems={'center'} gap={'8px'}>
              <svg
                stroke="#aaa"
                fill="#aaa"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="18px"
                width="18px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
              </svg>
              <Text>WATCHLIST</Text>
            </Flex>
            <svg
              stroke="#aaa"
              fill="#aaa"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
            </svg>
          </Flex>
        </Box>
      </PopoverTrigger>
      <PopoverContent className={s.popoverContent}>
        <PopoverBody>
          <Flex
            maxHeight={'500px'}
            flexDirection={'column'}
            gap={'8px'}
            p={'10px'}
            overflow={'auto'}
            className={s.scroll}
          >
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : watchList.length === 0 ? (
              <Text fontSize={'9px'} opacity={0.7}>
                Nothing in this list yet...
              </Text>
            ) : (
              <>
                {watchList.map((w) => (
                  <Flex
                    onClick={() =>
                      router.push(`${HEART_BEAT}/address/${w.org_address}`)
                    }
                    className={s.item}
                    key={w.address}
                    alignItems={'center'}
                    gap={'8px'}
                  >
                    <Avatar width={20} address={w.org_address} />
                    <Text>{shortCryptoAddress(w.org_address, 10)}</Text>
                  </Flex>
                ))}
              </>
            )}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default WatchListAddresses;
