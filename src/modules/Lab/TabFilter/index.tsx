import s from './styles.module.scss';
import { useStoreFilterModule } from './useStoreFilterModule';
const TAB_LIST = [
  'All',
  'Data Validity',
  'Data Availability',
  'Cross-chain bridges',
  'Rollup protocol',
];

export default function TabFilter() {
  const { tagCurrent, setDataModule } = useStoreFilterModule();
  return (
    <div className={s.tab}>
      <div className={s.inner}>
        {TAB_LIST.map((item, index) => {
          const isActive = item === tagCurrent;
          return (
            <div
              onClick={() => {
                setDataModule(item);
              }}
              className={`${s.item} ${isActive && s.item__isActive}`}
              key={index}
            >
              <p> {item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
