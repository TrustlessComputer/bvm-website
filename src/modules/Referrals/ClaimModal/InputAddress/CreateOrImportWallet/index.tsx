import cs from "classnames";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import s from "./styles.module.scss";

import ImportPrivateKey from "../ImportPrivateKey";
import { closeModal } from '@/stores/states/modal/reducer';
import {Flex, Spinner, Text} from "@chakra-ui/react";
import { useWallet } from '@/modules/Referrals/ClaimModal/InputAddress/providers/WalletProvider/hooks/useWallet';

export const CREATE_OR_IMPORT_MODAL = 'CREATE_OR_IMPORT_MODAL';

const CreateOrImportWallet: React.FC<any> = ({
  showTitle,
  onSuccess
}: any): React.ReactElement => {
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [_, setIsOldWalletAddress] = useState<boolean>(false);

  const [type, setType] = React.useState<"home" | "import">("home");

  const dispatch = useDispatch();

  const { onCreateNew } = useWallet();

  const closeSignInModal = () => {
    dispatch(closeModal({ id: CREATE_OR_IMPORT_MODAL }));
  };

  const createWallet = async (isOldWallet: boolean) => {
    setIsProcess(true);
    setIsOldWalletAddress(isOldWallet);
    const wallet = await onCreateNew();
    onSuccess && onSuccess({wallet});
    closeSignInModal();
  };

  const importPrivateKey = () => {
    setType("import");
  };

  return (
    <>
      <div className={cs(s.createOrImportWallet)}>
        {type === "import" ? (
          <ImportPrivateKey
            onGoBack={() => {
              setType("home");
            }}
            onClose={closeSignInModal}
            onSuccess={onSuccess}
          />
        ) : (
          <div style={{ width: "100%" }}>
            <div
              className={cs({
                "d-none": false,
              })}
            >
              {showTitle && <h6 className={s.title}>Create your wallet</h6>}
              {/*<div className={s.content}>
                <div className={s.note}>
                  The community-owned Bitcoin L2 designed for runes
                </div>
              </div>*/}
              <div className={s.actionBlock}>
                <button
                  className={cs(s.btn)}
                  onClick={() => createWallet(true)}
                  disabled={isProcess}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6.41341 3.66667C4.69341 3.66667 3.66667 4.69333 3.66667 6.41333V11.1167C3.66667 11.2333 3.56327 11.3313 3.44727 11.32C2.48593 11.224 2 10.6427 2 9.58667V3.74666C2 2.58666 2.58674 2 3.74674 2H9.58659C10.6426 2 11.224 2.48601 11.32 3.44735C11.332 3.56335 11.234 3.66667 11.1174 3.66667H6.41341ZM14 6.41667V12.25C14 13.4167 13.4167 14 12.25 14H6.41667C5.25 14 4.66667 13.4167 4.66667 12.25V11.3333V6.41667C4.66667 5.25 5.25 4.66667 6.41667 4.66667H11.3333H12.25C13.4167 4.66667 14 5.25 14 6.41667ZM11.5 9.33333C11.5 9.05733 11.276 8.83333 11 8.83333H9.83333V7.66667C9.83333 7.39067 9.60933 7.16667 9.33333 7.16667C9.05733 7.16667 8.83333 7.39067 8.83333 7.66667V8.83333H7.66667C7.39067 8.83333 7.16667 9.05733 7.16667 9.33333C7.16667 9.60933 7.39067 9.83333 7.66667 9.83333H8.83333V11C8.83333 11.276 9.05733 11.5 9.33333 11.5C9.60933 11.5 9.83333 11.276 9.83333 11V9.83333H11C11.276 9.83333 11.5 9.60933 11.5 9.33333Z"
                      fill="white"
                    />
                  </svg>
                  Continue
                </button>
                <Flex mt={2} gap={"2px"}>
                  <Text opacity={0.6}>Already have one?</Text>{" "}
                  <Text
                    cursor={"pointer"}
                    onClick={importPrivateKey}
                    as={"span"}
                    _hover={{
                      opacity: 1,
                    }}
                  >
                    Restore it
                  </Text>
                </Flex>
              </div>
            </div>
            {isProcess && (
              <div className={s.loadingWrapper}>
                <Spinner />
                <div className={s.warningText}>
                  Please do not close the app while the process is running.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateOrImportWallet;
