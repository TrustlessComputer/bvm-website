import TextInput from '@/components/TextInput/TextInput';

import { FormFields } from '../Buy.constanst';
import ErrorMessage from '../components/ErrorMessage';
import { useBuy } from '../../providers/Buy.hook';
import { isEmpty } from 'lodash';
import Section from '../components/Section';

const ProjectInformationSection = () => {
  const {
    projectWebSiteField,
    setProjectXField,
    projectXField,
    setProjectWebSiteField,
  } = useBuy();

  const PROJECT_X_ID = FormFields.PROJECT_X;
  const PROJECT_WEBSITE_ID = FormFields.PROJECT_WEBSITE;

  const onChangeHandler = async (field: FormFields, e: any) => {
    const text = e.target.value;
    if (field == PROJECT_X_ID) {
      setProjectXField({
        ...projectXField,
        value: text,
        hasFocused: true,
        hasError: !!projectXField.isRequired && isEmpty(text),
      });
    }

    if (field == PROJECT_WEBSITE_ID) {
      setProjectWebSiteField({
        ...projectWebSiteField,
        value: text,
        hasFocused: true,
        hasError: !!projectWebSiteField.isRequired && isEmpty(text),
      });
    }
  };

  return (
    <Section title="Project information" isRequired>
      <TextInput
        placeholder="Project X account link/handle"
        id={PROJECT_X_ID}
        name={PROJECT_X_ID}
        value={projectXField.value}
        isInvalid={projectXField.hasFocused && projectXField.hasError}
        onChange={(e: any) => {
          onChangeHandler(PROJECT_X_ID, e);
        }}
        onBlur={(e: any) => {
          onChangeHandler(PROJECT_X_ID, e);
        }}
      />
      {projectXField.hasFocused && projectXField.hasError && (
        <ErrorMessage message={projectXField.errorMessage} />
      )}
      <TextInput
        placeholder="Project website"
        id={PROJECT_WEBSITE_ID}
        name={PROJECT_WEBSITE_ID}
        value={projectWebSiteField.value}
        isInvalid={
          projectWebSiteField.hasFocused && projectWebSiteField.hasError
        }
        onChange={(e: any) => {
          onChangeHandler(PROJECT_WEBSITE_ID, e);
        }}
        onBlur={(e: any) => {
          onChangeHandler(PROJECT_WEBSITE_ID, e);
        }}
      />
    </Section>
  );
};

export default ProjectInformationSection;
