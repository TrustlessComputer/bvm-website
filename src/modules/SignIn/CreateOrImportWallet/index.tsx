import React, { useEffect, useState } from 'react';
// import { Button } from "react-bootstrap";
import cs from 'classnames';
import { ethers, Wallet } from 'ethers';
// import { Spinner } from "react-bootstrap";
import { ClientOs } from '@/enums/client';
import {
  createAddressLinkTwitter,
  getLastAddressLinkTwitter,
} from '@/services/player-share';
import { detectClientOs } from '@/utils/client';
import { getErrorMessage } from '@/utils/error';
// import { AssetsContext } from "@/contexts/assets-context";
import { IGetPlayerPoolProfile } from '@/interfaces/api/player-share';
import errorLogger from '@/services/errorLogger';
import isEmpty from 'lodash/isEmpty';

import s from './CreateOrImportWallet.module.scss';
import useAnalyticsEventTracker, { AlphaActions } from '@/utils/ga';
import { useDispatch } from 'react-redux';
// import useTwitterSignInModal from "@/modules/AlphaPWA/Welcome/useTwitterSignInModal";
import { FEED_URL, IMPORT_PRIVATE_KEY } from '@/constants/route-path';
import { useWallet } from '@/providers/WalletProvider/hooks/useWallet';
import { requestReload } from '@/store/states/common/reducer';
import { useRouter } from 'next-nprogress-bar';
// import RequiredBackupModal from "../RequiredBackupModal";
import { closeModal } from '@/store/states/modal/reducer';
import { SIGN_IN_MODAL } from '..';
import Spinner from '@/components/Spinner';
import { showError } from '@/components/toast';
import {
  getReferralCode,
  useReferralCode as updateReferralCode,
} from '@/services/referral';

const CreateOrImportWallet: React.FC<any> = ({
  onClose,
  showTitle,
}: any): React.ReactElement => {
  const router = useRouter();
  const clientOs = detectClientOs();

  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [lastAddressLinkTwitter, setLastAddressLinkTwitter] = useState<
    IGetPlayerPoolProfile | undefined | null
  >(undefined);
  const [isOldWalletAddress, setIsOldWalletAddress] = useState<boolean>(false);
  const [_, setReferralCode] = useState<string>('');
  const [__, setFetchingReferralCode] = useState(true);

  const gaEventTracker = useAnalyticsEventTracker();
  const dispatch = useDispatch();

  const { wallet, onCreateNew } = useWallet();

  // const { wallet.address, keySetL2, onRandomAccountL2 } = useContext(WalletContext);
  // const { getPlayerPoolProfileByAddress, getReferralCodeFromContext } =
  //   useContext(AssetsContext);

  // const { closeSignInModal } = useTwitterSignInModal();

  // const getPlayerPoolProfileByAddress = async () => {
  //   if (wallet && wallet.address) {
  //     try {
  //       const res = await getPlayerPoolProfile2(wallet.address);
  //       if (res) {
  //         const {
  //           address,
  //           twitterId,
  //           twitterName,
  //           twitterUsername,
  //           twitterAvatar,
  //           tokenAddress,
  //           twitterVerified,
  //           twitterFollowersCount,
  //           twitterFollowingsCount,
  //           holders,
  //           holding,
  //           minHoldingRequirement,
  //           passTokenAddress,
  //           passTokenMinHoldingRequirement,
  //           passTokenHolders,
  //         } = res;

  //         dispatch(
  //           updateProfile({
  //             address,
  //             twitterId,
  //             twitterName,
  //             twitterUsername,
  //             twitterAvatar,
  //             tokenAddress,
  //             twitterVerified,
  //             twitterFollowersCount,
  //             twitterFollowingsCount,
  //             holdersCount: holders,
  //             holdingCount: holding,
  //             minHoldingRequirement,
  //             passTokenAddress,
  //             passTokenMinHoldingRequirement,
  //             passTokenHolders,
  //           }),
  //         );
  //         // accountStorage.setTwitterProfile(res);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const getReferralCodeFromContext = () => {
    getReferralCode()
      .then((code) => {
        setReferralCode(code);
      })
      .finally(() => {
        setFetchingReferralCode(false);
      });
  };

  const closeSignInModal = () => {
    dispatch(closeModal({ id: SIGN_IN_MODAL }));
  };

  const linkAddressWithTwitter = async (): Promise<void> => {
    if (wallet && wallet.address && wallet.privateKey) {
      try {
        const timeStamp = new Date().getTime();
        const _wallet = new Wallet(wallet.privateKey);
        const signMessage = ethers.utils.toUtf8Bytes(`${timeStamp}`);
        const signature = await _wallet.signMessage(signMessage);
        const result = await createAddressLinkTwitter({
          address: wallet.address,
          timestamp: timeStamp,
          signature,
        });
        if (!result || result?.code < 0 || typeof result === 'string') {
          showError({
            message: result?.message || 'Twitter authorize failed.',
          });
          errorLogger.report({
            address: wallet.address,
            action: 'CREATE_WALLET',
            error: JSON.stringify({
              error: 'Failed to create address link twitter',
              info: result,
              isOldWalletAddress,
            }),
          });
        } else {
          // await getPlayerPoolProfileByAddress();
          getReferralCodeFromContext();
          // await router.push(ROUTE_PATH.ALPHA_MOBILE_KEYS);
          await router.push(`${FEED_URL}`);
          dispatch(requestReload());
          // onClose && onClose();
          closeSignInModal();
        }
        // tracking
        gaEventTracker(
          AlphaActions.CreateNewWallet,
          JSON.stringify({
            address: wallet.address || '',
            is_old_wallet: isOldWalletAddress,
          }),
        );
      } catch (error) {
        const { message } = getErrorMessage(error);
        showError({ message: message });
        errorLogger.report({
          address: wallet.address,
          action: 'CREATE_WALLET',
          error: JSON.stringify({
            error: 'Failed to create address link twitter via client',
            info: message,
            isOldWalletAddress,
          }),
        });
      }
    }
    setIsProcess(false);
  };

  const createWallet = async (isOldWallet: boolean) => {
    setIsProcess(true);
    setIsOldWalletAddress(isOldWallet);
    // have a wallet before ?
    if (wallet && wallet.address && wallet.privateKey) {
      linkAddressWithTwitter();
    } else {
      // create a new wallet + private key
      // const password = `${Math.floor(1000 + Math.random() * 9000)}`;
      // await onRandomAccountL2({ password });
      onCreateNew();
    }
    updateReferralCode({ code: undefined });
    closeSignInModal();
  };

  const importPrivateKey = () => {
    onClose && onClose();
    // closeSignInModal();
    closeSignInModal();

    router.push(IMPORT_PRIVATE_KEY);
  };

  useEffect(() => {
    if (lastAddressLinkTwitter === undefined) {
      (async () => {
        const result = await getLastAddressLinkTwitter();
        if (isEmpty(result) === false) {
          setLastAddressLinkTwitter(result);
        } else {
          setLastAddressLinkTwitter(null);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (
      lastAddressLinkTwitter !== undefined &&
      lastAddressLinkTwitter === null
    ) {
      createWallet(false);
    }
  }, [lastAddressLinkTwitter]);

  return (
    <>
      <div
        className={cs(
          s.createOrImportWallet,
          clientOs === ClientOs.Ios && s.ios,
        )}
      >
        <div>
          <div
            className={cs({
              'd-none':
                lastAddressLinkTwitter === undefined ||
                lastAddressLinkTwitter === null,
            })}
          >
            {showTitle && (
              <h6 className={s.title}>You already have a wallet</h6>
            )}
            <div className={s.content}>
              {/* <div className={s.caption}>To get started with Alpha</div> */}
              <div className={s.note}>
                <div>
                  A wallet had been linked to this X account, please import the
                  private key to continue using the same wallet with Alpha.
                </div>
                <div>Alternatively, you can create a new wallet.</div>
              </div>
            </div>
            <div className={s.actionBlock}>
              <button
                className={s.btn}
                onClick={importPrivateKey}
                disabled={isProcess}
              >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path
                    d="M4.0413 7.13932C3.6073 6.72932 3.89725 5.99933 4.49459 6H6.10933V2.66667C6.10933 2.29867 6.408 2 6.776 2H10.776C11.144 2 11.4427 2.29867 11.4427 2.66667V6H13.172C13.7693 6 14.0593 6.72932 13.6253 7.13932L9.44202 11.0913C9.10068 11.414 8.56657 11.414 8.22457 11.0913L4.0413 7.13932ZM13.5 13.5H4.16663C3.89063 13.5 3.66663 13.724 3.66663 14C3.66663 14.276 3.89063 14.5 4.16663 14.5H13.5C13.776 14.5 14 14.276 14 14C14 13.724 13.776 13.5 13.5 13.5Z"
                    fill="white"
                  />
                </svg>
                Import private key
              </button>
              <button
                className={cs(s.btn, s.lowPriorityBtn)}
                onClick={() => createWallet(true)}
                disabled={isProcess}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6.41341 3.66667C4.69341 3.66667 3.66667 4.69333 3.66667 6.41333V11.1167C3.66667 11.2333 3.56327 11.3313 3.44727 11.32C2.48593 11.224 2 10.6427 2 9.58667V3.74666C2 2.58666 2.58674 2 3.74674 2H9.58659C10.6426 2 11.224 2.48601 11.32 3.44735C11.332 3.56335 11.234 3.66667 11.1174 3.66667H6.41341ZM14 6.41667V12.25C14 13.4167 13.4167 14 12.25 14H6.41667C5.25 14 4.66667 13.4167 4.66667 12.25V11.3333V6.41667C4.66667 5.25 5.25 4.66667 6.41667 4.66667H11.3333H12.25C13.4167 4.66667 14 5.25 14 6.41667ZM11.5 9.33333C11.5 9.05733 11.276 8.83333 11 8.83333H9.83333V7.66667C9.83333 7.39067 9.60933 7.16667 9.33333 7.16667C9.05733 7.16667 8.83333 7.39067 8.83333 7.66667V8.83333H7.66667C7.39067 8.83333 7.16667 9.05733 7.16667 9.33333C7.16667 9.60933 7.39067 9.83333 7.66667 9.83333H8.83333V11C8.83333 11.276 9.05733 11.5 9.33333 11.5C9.60933 11.5 9.83333 11.276 9.83333 11V9.83333H11C11.276 9.83333 11.5 9.60933 11.5 9.33333Z"
                    fill="white"
                  />
                </svg>
                Create new wallet
              </button>
            </div>
          </div>
          {isProcess && (
            <div className={s.loadingWrapper}>
              <Spinner color={'black'} />
              <div className={s.warningText}>
                Please do not close the app while the process is running.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateOrImportWallet;
