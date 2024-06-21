import BodySection from './BodySection';
import TitleSection from './TitleSection';

const DATA_LIST = [
  ['Network Explorer', true, true, true, 'Custom'],
  ['BVM Bridge', true, true, true, 'Custom'],
  ['Bitcoin Bridge', true, true, true, 'Custom'],
  ['Ethereum Bridge', true, true, true, 'Custom'],
];

const PreInstallDappSection = () => {
  return (
    <>
      <TitleSection title="Pre-installed dapps" />
      <BodySection dataList={DATA_LIST} />
    </>
  );
};

export default PreInstallDappSection;
