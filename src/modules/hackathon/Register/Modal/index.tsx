import React, { useState } from 'react';
import s from './RegisterModal.module.scss';
import { Field, Form, Formik } from 'formik';
import ButtonConnected from '@/components/ButtonConnected/v2';
import cs from 'classnames';
import { Button, Input } from '@chakra-ui/react';
import { showError } from '@/components/toast';
import { registerCodeBattle } from '@/services/api/EternalServices';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/stores/states/modal/reducer';

type Props = {
  userInfo: any;
  setIsRegistered: (v: boolean) => void;
};

export const REGISTER_MODAL = 'REGISTER_MODAL';

const RegisterModal = ({ userInfo, setIsRegistered }: Props) => {
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    if (!values.nickname || !values.email) return;

    try {
      const payload = {
        team: values.nickname,
        university: values.affiliation,
        email: values.email,
      };

      const res = await registerCodeBattle(payload);
      if (res) {
        toast.success('Register success');
        dispatch(closeModal({ id: REGISTER_MODAL }));
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Error register', error);
      toast.error(error as string);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className="header">
        <h4>Register</h4>
      </div>
      <Formik
        onSubmit={onSubmit}
        initialValues={
          {
            nickname: undefined,
            email: userInfo?.email,
            affiliation: undefined,
          } as any
        }
        validate={(values) => {
          const errors: any = {};
          if (!values.nickname) {
            errors.nickname = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }

          return errors;
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form className={s.form} onSubmit={handleSubmit}>
            {/* <ButtonConnected className={cs(s.button)}> */}
            <Field name="nickname">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className={s.input_wrapper}>
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" {...field} />
                  {meta.touched && meta.error && (
                    <div className={s.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="email">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className={s.input_wrapper}>
                  <label>Email</label>
                  <input type="email" placeholder="Enter email" {...field} />
                  {meta.touched && meta.error && (
                    <div className={s.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="affiliation">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className={s.input_wrapper}>
                  <label>
                    Affiliation <span>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Carnegie Mellon University"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className={s.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <Button
              type="submit"
              isDisabled={isSubmitting || submitting}
              isLoading={isSubmitting || submitting}
              loadingText={'Submitting...'}
              className={s.button}
            >
              <p className={s.button_text}>Submit</p>
            </Button>
            {/* </ButtonConnected> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterModal;
