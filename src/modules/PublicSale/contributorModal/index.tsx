import BaseModal from '@/components/BaseModal';
import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import s from './styles.module.scss';
import LeaderBoard from '@/modules/PublicSale/leaderBoard';
import { FormikProps, useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { clearPublicSaleLeaderBoard } from '@/stores/states/user/reducer';
import { useAppDispatch } from '@/stores/hooks';

interface FormValues {
  userName: string;
}

const ContributorsModal = ({ isShow, onHide }: any) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch()

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
    } catch (error) {
      toast.error('Can not verify the post.');
    } finally {
      // setSubmitting(false);
    }
  };

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { userName: '' } as FormValues,
    onSubmit,
  });

  const formValues = React.useMemo(() => {
    return formik.values;
  }, [formik.values]);

  const onChangeText = (e: any) => {
    formik.setValues((values: any) => ({
      ...values,
      userName: e.target.value,
    }));
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearPublicSaleLeaderBoard())
    }
  }, [])

  return (
    <BaseModal
      isShow={isShow}
      onHide={onHide}
      title={'Find your contribution'}
      headerClassName={s.modalManualHeader}
      className={s.modalContent}
      size={"extra"}
    >
      <div className={s.container}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <div className={s.content}>
            <Flex gap={"10px"}  width={'100%'} mb={"20px"}>
              <div className={s.inputContainer}>
                <input
                  // type={'number'}
                  id='userName'
                  value={formValues.userName}
                  placeholder='Enter name'
                  className={s.input}
                  onChange={onChangeText}
                />
              </div>
              <Button
                type='submit'
                isDisabled={submitting}
                isLoading={submitting}
                // loadingText={'Submitting...'}
                className={s.button}
              >
                Search
              </Button>
            </Flex>
            <LeaderBoard userName={formValues.userName} isSearch={submitting} setSubmitting={setSubmitting}/>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ContributorsModal;
