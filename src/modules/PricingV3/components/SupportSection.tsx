import BodySection from './BodySection';
import TitleSection from './TitleSection';

const DATA_LIST = [
  ['Support response time', '48h', '24h', '12h', '1h'],
  ['Telegram support', true, true, true, true],
  ['Dedicated Telegram group', false, true, true, true],
  ['Access to BVM engineering team', false, false, false, true],
];

const SupportSection = () => {
  return (
    <>
      <TitleSection title="Support" />
      <BodySection dataList={DATA_LIST} />
    </>
  );
};

export default SupportSection;
