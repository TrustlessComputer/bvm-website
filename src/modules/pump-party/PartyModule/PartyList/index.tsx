import Empty from '@/components/Common/Empty';
import Loading from '@/components/Loading';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper';
import CPumpPartyAPI from '@/services/api/pump-party';
import { IPumpParty } from '@/services/api/pump-party/types';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import {
  Box,
  Flex,
  Grid,
  Image,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import throttle from 'lodash/throttle';
import uniqBy from 'lodash/uniqBy';
import React, { useRef } from 'react';
import PartyItem from './Party.item';
import styles from './styles.module.scss';
import ButtonWrapper from '@/components/ButtonWrapper';
import PartyCreateModal from '../PartyCreateModal';

const PartyList = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const hasIncrementedPageRef = useRef(false);
  const refInitial = useRef(false);
  const refLoading = useRef(false);
  const refInput = useRef<HTMLInputElement | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  const refParams = useRef({
    page: 1,
    limit: 20,
    search: '',
  });

  const needReload = useAppSelector(commonSelector).needReload;

  const cPumpAPI = new CPumpPartyAPI();

  const [parties, setParties] = React.useState<IPumpParty[]>([]);

  const getTokens = async (isNew: boolean) => {
    if (refLoading.current) return;
    try {
      refLoading.current = true;

      refParams.current = {
        ...refParams.current,
        page: isNew ? 1 : refParams.current.page + 1,
      };

      const { parties: newParties } = await cPumpAPI.getPumpParties({
        page: refParams.current.page,
        limit: refParams.current.limit,
        search: refParams.current.search,
      });

      if (isNew) {
        setParties(newParties);
      } else {
        setParties((prev) =>
          uniqBy([...prev, ...newParties], (token) => token.id),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      refInitial.current = true;
      refLoading.current = false;
      setLoaded(true);
    }
  };

  const throttleGetTokens = React.useCallback(throttle(getTokens, 500), []);
  const debounceGetTokens = React.useCallback(debounce(getTokens, 500), []);

  const onSearch = (searchText: string) => {
    refParams.current = {
      ...refParams.current,
      search: searchText,
    };
    debounceGetTokens(true);
  };

  React.useEffect(() => {
    throttleGetTokens(true);
  }, [needReload]);

  const renderEmptyPlaceholder = () => {
    return (
      parties?.length === 0 && (
        <Empty className={styles.empty} text="No pump party found" />
      )
    );
  };

  const renderSearch = () => {
    return (
      <Flex flex={1} position="relative" className={styles.searchInput}>
        <input
          placeholder="Search name, address, twitter"
          ref={refInput as any}
          autoFocus
          onChange={(event) => {
            onSearch(event.target.value);
          }}
        />
        <Flex
          cursor="pointer"
          position="absolute"
          top="0"
          bottom="0"
          right="16px"
          marginTop="auto"
          marginBottom="auto"
          justifyContent="center"
          alignItems="center"
        >
          {!!refParams.current?.search ? (
            <Image
              width="18px"
              src="/pump-party/ic-search-close.svg"
              onClick={() => {
                if (refInput?.current?.value) {
                  refInput.current.value = '';
                  refParams.current = {
                    ...refParams.current,
                    search: '',
                  };
                  debounceGetTokens(true);
                  refInput?.current?.focus();
                }
              }}
            />
          ) : (
            <Image
              width="24px"
              src="/pump-party/ic-search.svg"
              onClick={() => refInput?.current?.focus()}
            />
          )}
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Flex flexDirection="column" w={'100%'} mt={'40px'}>
        <Flex flexDirection="column" alignItems={'center'} gap="16px" w="100%">
          <ButtonWrapper className={styles.btnNewCoin} buttonType="pump">
            <Button gap="12px" onClick={onOpen}>
              <Image
                width="32px"
                height="32px"
                src="/pump-party/ic-pepe-head.png"
              />
              <Text fontSize="16px" textTransform="uppercase">
                Start new Party
              </Text>
            </Button>
          </ButtonWrapper>
          {renderSearch()}
        </Flex>
        <Box height="40px" />
        {!loaded && <Loading />}
        <ScrollWrapper
          onFetch={() => {
            throttleGetTokens(false);
          }}
          isFetching={false}
          hasIncrementedPageRef={hasIncrementedPageRef.current}
          onFetchNewData={() => {
            throttleGetTokens(true);
          }}
        >
          {loaded && renderEmptyPlaceholder()}
          <Grid
            w="100%"
            mt="24px"
            gridTemplateColumns={{ base: '1fr 1fr', lg: '1fr' }}
            gap={{ base: '20px', lg: '32px' }}
          >
            {parties.map((party) => (
              <PartyItem party={party} key={party.id} />
            ))}
          </Grid>
          <Box height="40px" />
        </ScrollWrapper>
      </Flex>
      <PartyCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PartyList;
