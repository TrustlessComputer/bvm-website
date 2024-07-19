import FieldTextFormik from "@/components/Form/form/Field.Text.Formik";
import InputWrapper from "@/components/Form/form/inputWrapper";
import CreateOrImportWallet, {
  CREATE_OR_IMPORT_MODAL,
} from "@/modules/CreateToken/components/InputAddress/CreateOrImportWallet";
import { WalletProvider } from "@/modules/CreateToken/providers/WalletProvider";
import { closeModal, openModal } from "@/store/states/modal/reducer";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Wallet } from "ethers";
import { Field, useFormikContext } from "formik";
import { useDispatch } from "react-redux";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  fieldChanged?: any;
  validate?: any;
}

const InputAddress = (props: IProps) => {
  const formik = useFormikContext();
  const { label, name, placeholder, fieldChanged, validate } = props;
  const dispatch = useDispatch();

  const handleCloseSignInModal = () => {
    dispatch(closeModal({ id: CREATE_OR_IMPORT_MODAL }));
  };

  const openSignInView = (options = {}) => {
    dispatch(
      openModal({
        ...options,
        id: CREATE_OR_IMPORT_MODAL,
        className: "signIn_modal",
        onClose: handleCloseSignInModal,
        render: (
          <WalletProvider>
            <CreateOrImportWallet showTitle={true} onSuccess={handleSuccess} />
          </WalletProvider>
        ),
      })
    );
  };

  const handleSuccess = ({ wallet }: { wallet: Wallet }) => {
    const value = wallet.address;
    formik.setFieldValue(name, value);
    fieldChanged?.(value);
  };

  return (
    <InputWrapper
      label={
        <Flex gap={"4px"} alignItems={"center"}>
          <Text>{label}</Text>
          <Box onClick={openSignInView}>
            <svg
              stroke="var(--secondary-color)"
              fill="var(--secondary-color)"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Circle_Plus">
                <g>
                  <path d="M15,12.5H12.5V15a.5.5,0,0,1-1,0V12.5H9a.5.5,0,0,1,0-1h2.5V9a.5.5,0,0,1,1,0v2.5H15A.5.5,0,0,1,15,12.5Z"></path>
                  <path d="M12,21.932A9.934,9.934,0,1,1,21.932,12,9.944,9.944,0,0,1,12,21.932ZM12,3.065A8.934,8.934,0,1,0,20.932,12,8.944,8.944,0,0,0,12,3.065Z"></path>
                </g>
              </g>
            </svg>
          </Box>
        </Flex>
      }
    >
      <Field
        validate={validate}
        name={name}
        component={FieldTextFormik}
        placeholder={placeholder}
        fieldChanged={fieldChanged}
      />
    </InputWrapper>
  );
};

export default InputAddress;
