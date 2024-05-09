import BaseModal from '@/components/BaseModal';
import InputWrapper from '@/components/Form/inputWrapper';
import { Button, Flex, Text } from '@chakra-ui/react';
import cs from 'classnames';
import React, {
  PropsWithRef,
  forwardRef,
  useRef,
  useState,
  useContext,
} from 'react';
import s from './styles.module.scss';
import { Field, Form, useFormState, useForm } from 'react-final-form';
import FieldText from '@/components/Form/Field.Text';
import { composeValidators, required } from '@/utils/form-validate';
import FieldAmount from '@/components/Form/fieldAmount';
import { requiredAmount, requiredValidateEVMAddress } from '@/utils/validate';
import { FormApi } from 'final-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CProposal from '@/contract/proposal';
import { useDispatch } from 'react-redux';
import { ProposalType } from '@/contract/proposal/proposal.interface';
import DropDownProposalType from '../DropDownProposalType';
import sanitizeHtml from 'sanitize-html';
import { TEXT_DIRTY_CONFIG } from '@/constants/constants';
import { requestReload } from '@/stores/states/common/reducer';
import toast from 'react-hot-toast';
import { getError } from '@/utils/error';
import {
  NakaConnectContext,
  INakaConnectContext,
} from '@/Providers/NakaConnectProvider';
import { BVM_GOVERNOR_ADDRESS } from '@/contract/proposal/configs';

interface IProps {
  isShow: boolean;
  onClose: () => void;
}

interface IFormModal extends PropsWithRef<any> {
  handleSubmit: any;
  submitting: boolean;
}

const FormModal: React.FC<IFormModal> = forwardRef(
  ({ handleSubmit, submitting }, _) => {
    const { errors, values } = useFormState();
    const { change } = useForm();
    const disableBtn = errors?.amount || errors?.desc;

    const [isFocusQuill, setIsFocusQuill] = useState(false);

    return (
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="12px" mt="24px">
          <InputWrapper
            className={s.inputWrapper}
            label="Subject"
            theme="light"
            labelColor="#000"
          >
            <Field
              component={FieldText}
              name="title"
              placeholder="Enter title"
              validate={composeValidators(required)}
            />
          </InputWrapper>
          <InputWrapper
            className={s.inputWrapper}
            label="Purpose"
            theme="light"
            labelColor="#000"
          >
            <DropDownProposalType
              proposalType={values?.proposalType}
              onItemSelected={(value) => change('proposalType', value)}
            />
          </InputWrapper>
          {values?.proposalType === ProposalType.marketing && (
            <InputWrapper
              className={s.inputWrapper}
              label="Requested amount"
              theme="light"
              labelColor="#000"
            >
              <Field
                name="amount"
                component={FieldAmount}
                validate={composeValidators(requiredAmount)}
                placeholder="0.0"
                decimals={1}
                bgColor="transparent"
              />
            </InputWrapper>
          )}
          {values?.proposalType === ProposalType.marketing && (
            <InputWrapper
              className={s.inputWrapper}
              label="Recipient address"
              theme="light"
              labelColor="#000"
            >
              <Field
                component={FieldText}
                name="address"
                placeholder="0x1234..."
                validate={composeValidators(
                  required,
                  requiredValidateEVMAddress,
                )}
              />
            </InputWrapper>
          )}
          <InputWrapper
            className={s.inputWrapper}
            label="Description"
            theme="light"
            labelColor="#000"
          >
            <ReactQuill
              className={s.quill}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
              ]}
              placeholder="Enter description"
              value={values?.desc}
              onChange={(value: any) => change('desc', value)}
              onFocus={() => setIsFocusQuill(true)}
              onBlur={() => setIsFocusQuill(false)}
            />
            {isFocusQuill && required(values?.desc) && (
              <Text
                style={{
                  marginTop: '4px',
                  fontSize: '12px',
                  color: '#dd3b4b',
                  textAlign: 'left',
                  fontWeight: '400',
                }}
                className="error-text"
              >
                {required(values?.desc)}
              </Text>
            )}
          </InputWrapper>
          <Button
            type="submit"
            w={'100%'}
            minH={'56px'}
            fontSize="16px"
            bg="#000"
            mt="8px"
            isDisabled={disableBtn}
            isLoading={submitting}
            _hover={{ bg: '#000', opacity: 0.8 }}
            loadingText={'Processing'}
          >
            Submit
          </Button>
        </Flex>
      </form>
    );
  },
);

const SubmitProposalModal = (props: IProps) => {
  const { isShow, onClose } = props;
  const dispatch = useDispatch();

  const refForm = useRef<FormApi>();
  const proposalContract = useRef(new CProposal()).current;
  const { getConnector } = useContext(
    NakaConnectContext,
  ) as INakaConnectContext;

  const onSubmit = async (values: any) => {
    try {
      const connector = getConnector();
      const description = JSON.stringify({
        title: values.title,
        desc: sanitizeHtml(values.desc, TEXT_DIRTY_CONFIG),
        proposalType: values.proposalType,
      });
      const calldata = proposalContract.createProposalCallData({
        receipient: values.address,
        amount: values.amount,
        description,
        proposalType: values.proposalType,
      });
      await connector.requestSign({
        calldata,
        target: 'popup',
        to: BVM_GOVERNOR_ADDRESS || '',
        functionType: 'Submit a proposal',
        chainType: 'NAKA',
      });
      toast.success('Submit a proposal successfully!');
      dispatch(requestReload());
      onClose();
    } catch (error: any) {
      const { message } = getError(error);
      toast.error(message);
    }
  };

  return (
    <BaseModal
      isShow={isShow}
      onHide={onClose}
      size="normal"
      className={cs(s.modalBox)}
      title=""
      headerClassName={s.modalHeader}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <div className={s.container}>
        <p className={s.title}>Submit a proposal</p>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            proposalType: ProposalType.project,
            desc: '<h2><strong>Summary</strong></h2><p><br></p><p>...</p><p><br></p><h2><strong>The Value for the BVM DAO Community:</strong></h2><p><br></p><p>...</p>',
          }}
        >
          {({ handleSubmit, submitting }) => (
            <FormModal
              ref={refForm}
              handleSubmit={handleSubmit}
              submitting={submitting}
            />
          )}
        </Form>
      </div>
    </BaseModal>
  );
};

export default SubmitProposalModal;
