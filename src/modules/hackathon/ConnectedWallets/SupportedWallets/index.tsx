import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import { HACKATHON_NETWORK } from '../constants';
import { EIP6963ProviderDetail, useSyncProviders } from '../hooks/providers';
import { showError, showSuccess } from '@/components/toast';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/stores/states/modal/reducer';
import { useEffect, useState } from 'react';

export const SUPPORTED_WALLETS_MODAL_ID = 'SUPPORTED_WALLETS_MODAL_ID';

export default function SupportedWallets() {
  const [chainInstalled, setChainInstalled] = useState<Record<string, boolean>>(
    {},
  );
  const providers = useSyncProviders();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('providers', providers);
    const requestChainId = async () => {
      providers?.forEach(async (provider: EIP6963ProviderDetail) => {
        const chainInfo = await provider.provider.request({
          method: 'eth_chainId',
          params: [],
        });
        setChainInstalled((prev) => ({
          ...prev,
          [provider.info.uuid]: chainInfo === HACKATHON_NETWORK.chainId,
        }));
      });
    };

    requestChainId();
  }, [providers]);

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    if (chainInstalled[providerWithInfo.info.uuid]) {
      return;
    }
    try {
      // await providerWithInfo.provider.request({
      //   method: 'eth_requestAccounts',
      // });

      try {
        await providerWithInfo.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: HACKATHON_NETWORK.chainId }],
        });

        dispatch(
          closeModal({
            id: SUPPORTED_WALLETS_MODAL_ID,
          }),
        );
        showSuccess({
          message: 'Switch network successfully',
        });
      } catch (switchError: any) {
        console.log('wallet_switchEthereumChain error', switchError);

        if (switchError.code === 4902) {
          try {
            await providerWithInfo.provider.request({
              method: 'wallet_addEthereumChain',
              params: [HACKATHON_NETWORK],
            });
            dispatch(
              closeModal({
                id: SUPPORTED_WALLETS_MODAL_ID,
              }),
            );
            showSuccess({
              message: 'Add network successfully',
            });
          } catch (addError) {
            console.log('wallet_addEthereumChain error', addError);
            showError({
              message: 'Failed to add network',
            });
          }
        }
      }
    } catch (connectError) {
      console.log('eth_requestAccounts error', connectError);
      showError({
        message: 'Failed to connect wallet',
      });
    }
  };

  return (
    <div className={s.supportedWallets}>
      <div className={s.container}>
        <div className={s.title}>Add Network</div>
        <div className={s.wallets}>
          {providers.length > 0 &&
          providers.find((p) => p.info.name === 'MetaMask') ? (
            providers
              .filter((p) => p.info.name === 'MetaMask')
              ?.map((provider: EIP6963ProviderDetail) => (
                <div
                  className={s.wallets__item}
                  onClick={() => handleConnect(provider)}
                  key={provider.info.uuid}
                >
                  <div className={s.wallets__item__wallet}>
                    <img src={provider.info.icon} alt={provider.info.name} />
                    <span>{provider.info.name}</span>
                  </div>

                  <div className={s.wallet__install}>
                    {chainInstalled[provider.info.uuid] ? (
                      <span>{HACKATHON_NETWORK.chainName}</span>
                    ) : (
                      <span>Add</span>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <div className={s.wallets__item}>
              <div className={s.wallets__item__wallet}>
                <SvgInset
                  size={24}
                  svgUrl="/images/poc/wallets/logos--metamask-icon.svg"
                />
                <span>Metamask</span>
              </div>

              <div className={s.wallet__install}>
                <a
                  rel="noopener noreferrer"
                  href="https://metamask.io/download/"
                  target="_blank"
                >
                  Download
                  <SvgInset svgUrl="/images/poc/wallets/ic-arrow-up-right.svg" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
