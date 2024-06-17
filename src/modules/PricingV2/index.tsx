import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import ModalLoading from '@/components/ModalLoading';
import useL2Service from '@/hooks/useL2Service';
import BoxContent from '@/layouts/BoxContent';
import { orderBuyAPI } from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAvailableList } from '@/stores/states/l2services/actions';
import {
  setShowAllChains,
  setViewMode,
  setViewPage,
} from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { getErrorMessage } from '@/utils/errorV2';
import sleep from '@/utils/sleep';
import {
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import CardInfor from './components/CardInfor';
import { orderRegisterBootstrapParams } from './services';
import s from './styles.module.scss';

const PriceModule = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { showContactUsModal } = useContactUs();
  const { loggedIn, setShowLoginModalCustomize, userInfo } = useWeb3Auth();
  const { fetchAllData } = useL2Service();

  const {
    isOpen: isOpenLoadingModal,
    onOpen: onOpenLoadingModal,
    onToggle: onToggleLoadingModal,
    onClose: onCloseLoadingModal,
  } = useDisclosure({
    id: 'LOADING_MODAL',
  });

  const { availableListFetching, availableList } = useAppSelector(
    getL2ServicesStateSelector,
  );

  useEffect(() => {
    dispatch(fetchAvailableList());
  }, []);

  const bootstrapLaunchOnClick = async () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      try {
        onOpenLoadingModal();

        const orderBuyReq = await orderRegisterBootstrapParams();
        const result = await orderBuyAPI(orderBuyReq);

        await sleep(1);

        if (result) {
          // Show Toast Success
          toast.success('Order successful', {
            duration: 1000,
          });

          await sleep(1);

          dispatch(setViewMode('Mainnet'));
          dispatch(setViewPage('ManageChains'));
          dispatch(setShowAllChains(false));

          router.push('/blockchains');
        }
      } catch (error) {
        const { message } = getErrorMessage(error);
        toast.error(message);
      } finally {
        onCloseLoadingModal();
      }
    }
  };
  const growthLaunchOnClick = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      router.push('/blockchains/customize');
    }
  };

  const enterpriseLaunchOnClick = () => {
    showContactUsModal();
  };

  const manageYourChainsOnClick = () => {
    if (!loggedIn) {
      setShowLoginModalCustomize && setShowLoginModalCustomize(true);
    } else {
      dispatch(setViewMode('Mainnet'));
      dispatch(setViewPage('ManageChains'));
      dispatch(setShowAllChains(false));
      router.push('/blockchains');
    }
  };

  return (
    <div className={s.container}>
      <BoxContent>
        {availableListFetching || !availableList ? (
          <Flex w={'100%'} minH={'500px'} justify={'center'} align={'center'}>
            <Spinner></Spinner>
          </Flex>
        ) : (
          <Flex flexDir={'column'} align={'center'} gap={'70px'}>
            {/* Heaader*/}
            <Flex flexDir={'column'} gap={'15px'}>
              <Text
                textAlign={'center'}
                fontSize={'40px'}
                lineHeight={'52px'}
                fontWeight={400}
              >
                {`Let’s build on Bitcoin.`}
              </Text>
              <Text
                textAlign={'center'}
                fontSize={'24px'}
                lineHeight={'33.6px'}
                fontWeight={400}
                opacity={0.7}
                className={s.fontType2}
              >
                {`Pricing for crypto teams of all sizes.`}
              </Text>
            </Flex>

            {/* Body */}
            <SimpleGrid columns={3} row={1} spacingX="60px">
              <CardInfor
                title="Bootstrap"
                desc="The basics for individuals and small teams"
                price={
                  <Flex direction={'column'}>
                    <Flex
                      direction={'row'}
                      align={'center'}
                      justify={'center'}
                      gap={'10px'}
                    >
                      <Text
                        fontSize={'40px'}
                        lineHeight={'52px'}
                        fontWeight={500}
                        textAlign={'center'}
                      >
                        {`${
                          availableList['package']?.['2']?.[0]?.price || '--'
                        }`}
                      </Text>
                      <Text
                        fontSize={'24px'}
                        lineHeight={'31px'}
                        fontWeight={300}
                        textAlign={'center'}
                        opacity={0.7}
                        className={s.fontType2}
                      >
                        {`${
                          availableList['package']?.['2']?.[0]?.priceNote ||
                          '--'
                        }`}
                      </Text>
                    </Flex>

                    <Text
                      fontSize={'12px'}
                      lineHeight={'16px'}
                      fontWeight={400}
                      textAlign={'center'}
                    >
                      {`per chain / month`}
                    </Text>
                  </Flex>
                }
                color="#fff"
                // bgGradient={'linear(to-r, #8AABF9, #627EEA)'}
                bgGradient={'linear(to-r, #3C6BE2, #3C6BE2)'}
                ctaButton={
                  <Button
                    bgColor={'#fff'}
                    color={'#000'}
                    borderRadius={'100px'}
                    h={'54px'}
                    w={'100%'}
                    className={s.fontType3}
                    onClick={bootstrapLaunchOnClick}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    Launch now
                  </Button>
                }
                hardwareList={[
                  'Memory: 16 GB RAM',
                  'CPU: 8 cores',
                  'Storage: 320 GB SSD',
                ]}
                blockChainInforsList={[
                  'Data availability: Polygon',
                  'Block Gas Limit: 30,000,000',
                  'Prover: No',
                  'Withdrawal Period: 2h',
                ]}
              />
              <CardInfor
                title="Growth"
                desc="A plan that grows with your community"
                price={
                  <Flex direction={'column'}>
                    <Flex
                      direction={'row'}
                      align={'center'}
                      justify={'center'}
                      gap={'10px'}
                    >
                      <Text
                        fontSize={'40px'}
                        lineHeight={'52px'}
                        fontWeight={500}
                        textAlign={'center'}
                      >
                        {`${
                          availableList['package']?.['2']?.[1]?.price || '--'
                        }`}
                      </Text>
                      <Text
                        fontSize={'24px'}
                        lineHeight={'31px'}
                        fontWeight={300}
                        textAlign={'center'}
                        opacity={0.5}
                        color={'#000'}
                        className={s.fontType2}
                      >
                        {`${
                          availableList['package']?.['2']?.[1]?.priceNote ||
                          '--'
                        }`}
                      </Text>
                    </Flex>

                    <Text
                      fontSize={'12px'}
                      lineHeight={'16px'}
                      fontWeight={400}
                      textAlign={'center'}
                    >
                      {`per chain / month`}
                    </Text>
                  </Flex>
                }
                ctaButton={
                  <Button
                    bgColor={'#FA4E0E'}
                    color={'#fff'}
                    borderRadius={'100px'}
                    h={'54px'}
                    w={'100%'}
                    className={s.fontType3}
                    onClick={growthLaunchOnClick}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    Customize your blockchain
                  </Button>
                }
                hardwareList={[
                  'Memory: 64 GB RAM',
                  'CPU: 32 cores',
                  'Storage: 650 GB SSD',
                ]}
                blockChainInforsList={undefined}
                isHideBlockchainInfor={true}
              />
              <CardInfor
                title="Enterprise"
                desc="For organizations who need customization and dedicated support"
                price={
                  <Text
                    fontSize={'28px'}
                    lineHeight={'36px'}
                    fontWeight={500}
                    textAlign={'center'}
                  >
                    {`Custom pricing`}
                  </Text>
                }
                ctaButton={
                  <Button
                    bgColor={'#FA4E0E'}
                    color={'#fff'}
                    borderRadius={'100px'}
                    h={'54px'}
                    w={'100%'}
                    className={s.fontType3}
                    fontSize={'18px'}
                    onClick={enterpriseLaunchOnClick}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    Contact us
                  </Button>
                }
                isHideBlockchainInfor={true}
                isHideHardware={true}
              />
            </SimpleGrid>

            {/* Footer */}
            <Text
              fontSize={'20px'}
              fontWeight={400}
              lineHeight={'29px'}
              color={'#FA4E0E'}
              className={s.fontType3}
              textAlign={'center'}
              opacity={0.7}
              _hover={{
                opacity: 0.8,
                cursor: 'pointer',
              }}
              onClick={manageYourChainsOnClick}
            >
              Manage your chains
            </Text>
          </Flex>
        )}
      </BoxContent>
      {isOpenLoadingModal && (
        <ModalLoading show={isOpenLoadingModal} onClose={onCloseLoadingModal} />
      )}
    </div>
  );
};

export default PriceModule;
