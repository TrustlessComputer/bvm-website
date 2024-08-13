import { Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import cs from 'classnames';
import s from './styles.module.scss';

type ISearchBarProps = {
  className?: string;
  txtSearch?: string;
  setTxtSearch: (data: string) => void;
  placeholder?: string;
  onEnterSearch?: () => void;
};

const SearchBar = (props: ISearchBarProps) => {
  const { className, txtSearch, setTxtSearch, placeholder, onEnterSearch } =
    props;
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
      />
    </InputGroup>
  );
};

export default SearchBar;
