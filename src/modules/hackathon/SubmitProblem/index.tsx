'use client';
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import cn from 'classnames';
import { Formik } from 'formik';

import { showError, showSuccess } from '@/components/toast';
import { submitProblem } from '@/services/api/EternalServices';

import { useState } from 'react';
import s from './styles.module.scss';

type Props = {
  className?: string;
};

type FormValues = {
  contractAddress: string;
};

const TOPICS = [
  {
    id: 1,
    name: 'Problem 1',
  },
  {
    id: 2,
    name: 'Problem 2',
  },
  {
    id: 3,
    name: 'Problem 3',
  },
];

const SubmitProblem = ({ className }: Props) => {
  const [currentTopic, setCurrentTopic] = useState(TOPICS[0]);

  const validateForm = (values: FormValues) => {
    const errors: Record<string, string> = {};

    if (!values.contractAddress) {
      errors.contractAddress = 'Contract address is required.';
    } else if (!isAddress(values.contractAddress)) {
      errors.contractAddress = 'Contract address is invalid.';
    }

    return errors;
  };

  const handleSubmit = async (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (arg: boolean) => void },
  ) => {
    setSubmitting(true);
    const result = await submitProblem({
      contractAddress: values.contractAddress,
      problemCode: `${currentTopic.id}`,
    });

    if (result?.id) {
      showSuccess({
        message: 'Your submission has been sent.',
      });
      resetForm();
    } else {
      // failed
      showError({
        message: result?.message || 'Submission failed.',
      });
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        contractAddress: '',
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={cn(s.submitProblem, className)}
        >
          <Box position="relative">
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    className={s.submitProblem_topicMenu}
                    type="button"
                  >
                    {currentTopic.name}
                    <Image
                      className={cn(isOpen && s.submitProblem_rotate)}
                      src="/icons/ic_chevron_down.svg"
                    />
                  </MenuButton>
                  <MenuList className={s.submitProblem_topicMenuList}>
                    {TOPICS.map((topic) => (
                      <MenuItem
                        type="button"
                        key={topic.id}
                        onClick={() => {
                          setCurrentTopic(topic);
                        }}
                      >
                        {topic.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
            <input
              type="text"
              name="contractAddress"
              placeholder="Enter contract address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contractAddress}
            />
            <button
              className={s.submitProblem_submitBtn}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Spinner /> : 'Submit solutions'}
            </button>
          </Box>
          {errors.contractAddress &&
            touched.contractAddress &&
            errors.contractAddress && (
              <Box className={s.submitProblem_error}>
                {errors.contractAddress &&
                  touched.contractAddress &&
                  errors.contractAddress}
              </Box>
            )}
        </form>
      )}
    </Formik>
  );
};

export default SubmitProblem;
