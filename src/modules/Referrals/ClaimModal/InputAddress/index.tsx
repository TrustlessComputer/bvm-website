import { closeModal, openModal } from '@/stores/states/modal/reducer';
import { Flex, Text } from '@chakra-ui/react';
import { Wallet } from 'ethers';
import { Field, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import CreateOrImportWallet, {
  CREATE_OR_IMPORT_MODAL,
} from '@/modules/Referrals/ClaimModal/InputAddress/CreateOrImportWallet';
import InputWrapper from '@components/Form/inputWrapper';
import FieldTextFormik from '@components/Form/formik/Field.Text.Formik';
import { WalletProvider } from '@/modules/Referrals/ClaimModal/InputAddress/providers/WalletProvider';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  fieldChanged?: any;
  validate?: any;
  className?: any;
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
        render: () => (
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
      className={props?.className}
      label={label}
      rightLabel={
        <Flex onClick={openSignInView} gap={"8px"} alignItems={"center"} cursor={"pointer"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.9">
              <path d="M15.5999 11.9998H11.9999M11.9999 11.9998H8.3999M11.9999 11.9998V15.5998M11.9999 11.9998L11.9999 8.3998M21.5999 12.0004C21.5999 17.3023 17.3018 21.6004 11.9999 21.6004C6.69797 21.6004 2.3999 17.3023 2.3999 12.0004C2.3999 6.69846 6.69797 2.40039 11.9999 2.40039C17.3018 2.40039 21.5999 6.69846 21.5999 12.0004Z" stroke="#FA4E0E" stroke-width="2" stroke-linecap="round"/>
            </g>
          </svg>
          <Text color={"#FB6026"} fontSize={"18px"} fontWeight={400}>Create wallet</Text>
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
