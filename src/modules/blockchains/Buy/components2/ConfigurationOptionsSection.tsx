import { useBuy } from '../../providers/Buy.hook';
import Section from '../components/Section';

const ConfigurationOptionsSection = () => {
  const {
    availableListData,
    isMainnet,
    dataValiditySelected,
    setDataValiditySelected,
  } = useBuy();

  return (
    <Section
      title={'Configuration Options'}
      description={''}
      descriptionDetail={undefined}
    >
      {/* {renderFlattenList()} */}
    </Section>
  );
};

export default ConfigurationOptionsSection;
