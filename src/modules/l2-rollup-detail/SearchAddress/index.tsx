import { HEART_BEAT } from '@/constants/route-path';
import { validateEVMAddress, validateBTCAddress } from '@/utils/validate';
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import cs from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';

type ISearchBarProps = {
  className?: string;
  txtSearch?: string;
  setTxtSearch: (data: string) => void;
  placeholder?: string;
  onEnterSearch?: () => void;
  autoFocus?: boolean;
};

const SearchBar = (props: ISearchBarProps) => {
  const {
    className,
    txtSearch,
    setTxtSearch,
    placeholder,
    onEnterSearch,
    autoFocus,
  } = props;
  const onEnter = (e: any) => {
    if (e.code === 'Enter') {
      e.target.blur();
      onEnterSearch && onEnterSearch();
    }
  };
  return (
    <InputGroup className={cs(s.inputContainer, className)}>
      <InputLeftElement pointerEvents="none">
        <Image mt="4px" h="18px" src={`/icons/ic_search.svg`} />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={txtSearch}
        onChange={(e) => setTxtSearch(e.target.value)}
        enterKeyHint="search"
        onKeyDownCapture={onEnter}
        lang="en"
        autoFocus={autoFocus}
      />
    </InputGroup>
  );
};

type ISearchAddressProps = {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

const SearchAddress = (props: ISearchAddressProps) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const [searchAddress, setSearchAddress] = useState('');

  const isValidSearchAddress = useMemo(
    () =>
      validateEVMAddress(searchAddress) || validateBTCAddress(searchAddress),
    [searchAddress],
  );

  useOnClickOutside(ref, () => setSearchAddress(''));

  return (
    <Flex
      ref={ref}
      position={'relative'}
      direction={'column'}
      w={'max-content'}
    >
      <SearchBar
        txtSearch={searchAddress}
        setTxtSearch={setSearchAddress}
        placeholder={props.placeholder || 'Search address '}
        onEnterSearch={() => {
          if (isValidSearchAddress) {
            router.push(`${HEART_BEAT}/${searchAddress}`);
          }
        }}
        className={props.className}
        autoFocus={props.autoFocus}
      />
      {searchAddress && (
        <Flex
          position={'absolute'}
          top={'52px'}
          left={'0px'}
          borderRadius={'8px'}
          className={s.searchResult}
        >
          {isValidSearchAddress ? (
            <Flex
              direction={'row'}
              alignItems={'center'}
              gap={'6px'}
              cursor={'pointer'}
              pr={'12px'}
              onClick={() => router.push(`${HEART_BEAT}/${searchAddress}`)}
            >
              <Image w={'14px'} src={'/heartbeat/ic-link.svg'} />
              <Text fontSize={'12px'}>{searchAddress}</Text>
            </Flex>
          ) : (
            <>
              <Text minW={'200px'} fontSize={'12px'}>
                No match
              </Text>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default SearchAddress;
