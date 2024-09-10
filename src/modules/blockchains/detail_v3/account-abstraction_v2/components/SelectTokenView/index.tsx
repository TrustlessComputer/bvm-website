import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import { useDAServicesHelper } from '@/modules/blockchains/detail_v4/hook/useDAServicesHelper';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { Flex, Image, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

const SelectTokenView = () => {
  const { isUpdateFlow } = useChainProvider();
  const { aaStatusData, aaInstalledData, isCanNotEdit } = useAAModule();
  const { statusCode } = aaStatusData;

  const { tokenIssueList } = useDAServicesHelper();

  const [tokenSelected, setTokenSelected] = useState<any>('');

  // const {
  //   setTokenContractAddress,
  //   tokenContractAddress,
  //   isTokenContractAddressFocused,
  //   tokenContractAddressErrMsg,
  //   setTokenContractFocused,
  //   checkTokenContractAddress,
  // } = useAccountAbstractionStore();

  return (
    <Flex flexDir={'row'} align={'center'} gap={'10px'} color={'#000'}>
      <Tooltip
        hasArrow
        label={`The token that users can use to pay for gas fees.`}
        bg={'#fff'}
        color={'#000'}
        p="5px"
      >
        <Image src={'/icons/white_tooltip_ic.svg'} w="20px" h="20px" />
      </Tooltip>

      {/* <Select
        className={s.selectStyle}
        placeholder="Select token"
        _placeholder={{
          color: 'red',
        }}
        value={tokenIssueList[tokenSelectedIndex].name}
        height={'25px'}
        borderRadius={'20px'}
        fontSize={['15px']}
        bgColor={'#fff'}
        onChange={(e) => {
          console.log('AA e ', e);
          console.log('AA e.target.value ', e.target.value);
          setTokenSelectedIndex(Number(e.target.value));
        }}
      >
        {tokenIssueList.map((item, index) => {
          return (
            <option key={`${item.name}-${index}`} className={s.selectStyle}>
              {`${tokenIssueList[index].name} - ${tokenIssueList[index].contract_address}`}
            </option>
          );
        })}
      </Select> */}
    </Flex>
  );
};

export default SelectTokenView;
