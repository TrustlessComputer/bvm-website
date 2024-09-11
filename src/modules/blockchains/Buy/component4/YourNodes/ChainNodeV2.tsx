import TopupModal from '@/modules/blockchains/components/TopupModal';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { ChainNode as ChainNodeProps } from '@/types/node';
import { useDisclosure } from '@chakra-ui/react';
import { NodeProps } from '@xyflow/react';
import ChainRenderer from '../DappRenderer/ChainRenderer';
import Node from '../Node/Node';

const ChainNodeV2 = ({ data, id }: NodeProps<ChainNodeProps>) => {
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const { showContactUsModal } = useContactUs();
  const {
    getBlockChainStatus,
    isChainLoading,
    isChainNeedAction,
    getChainTypeIconUrl,
    isInsufficientBalance,
    textCTA,
  } = useChainProvider();
  const {
    statusStr: statusMessage,
    statusColorStr: borderColor,
    borderStatusStr: headingBackground,
    bgColorStr,
  } = getBlockChainStatus();

  const {
    isOpen: isOpenTopUpModal,
    onOpen: onOpenTopUpModal,
    onClose: onCloseTopUpModal,
  } = useDisclosure({
    id: 'DEPOSIT_TOPUP',
  });

  const actionChainNode = () => {
    if (isInsufficientBalance) {
      return onOpenTopUpModal();
    } else {
      showContactUsModal({
        title: 'Contact Us',
        description: `Have questions or need assistance? We're here to help! Please fill out the form below, and we will get back to you shortly.`,
        subjectDefault: 0,
      });
    }
  };

  return (
    <>
      <Node
        {...data}
        overlay={
          isChainLoading || isChainNeedAction
            ? {
                type: isChainLoading ? 'loading' : 'action',
                iconUrl: '/coffee.gif',
                message:
                  'Grab a coffee and relax! BVM is cooking, and your Bitcoin rollup will be ready in 2 hours.',
                action: {
                  label: `${textCTA || ''}`,
                  bgColor: isInsufficientBalance ? '#000' : '#fff',
                  textColor: isInsufficientBalance ? '#fff' : '#000',
                  onClick: () => {
                    actionChainNode();
                  },
                },
              }
            : undefined
        }
        key={JSON.stringify(data)}
        id={id}
        heading={{
          title: data.title,
          // TODO: @Tony - get icon
          // icon: getChainTypeIconUrl(),
          status: {
            message: statusMessage,
            color: borderColor,
            icon: getChainTypeIconUrl(),
          },
          backgroundColor: bgColorStr,
        }}
        content={{
          children: <ChainRenderer />,
        }}
        borderColor={borderColor}
      />

      {isOpenTopUpModal && (
        <TopupModal
          show={isOpenTopUpModal}
          infor={{
            paymentAddress: `${accountInforL2Service?.topupWalletAddress}`,
          }}
          order={undefined}
          onClose={onCloseTopUpModal}
        />
      )}
    </>
  );
};

export default ChainNodeV2;
