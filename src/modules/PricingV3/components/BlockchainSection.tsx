import BodySection from './BodySection';
import TitleSection from './TitleSection';

const DATA_LIST = [
  [
    'Data availability',
    'Polygon',
    'Polygon, Celestia, Near DA, Eigen DA',
    'Polygon, Celestia, Near DA, Eigen DA',
    'Custom',
  ],
  ['Max block gas limit', '30,000,000', '50,000,000', ' 100,000,000', 'Custom'],
  ['Zk Prover', false, false, true, 'Custom'],
  ['Withdrawal period', '6 hours', '4 hours', '2 hours', 'Custom'],
];

const BlockchainSection = () => {
  return (
    <>
      <TitleSection title="Blockchain" />
      <BodySection dataList={DATA_LIST} />
    </>
  );
};

export default BlockchainSection;
