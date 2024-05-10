import s from './styles.module.scss';

export default function MetaItem({label, value}: {label: string, value: string}) {
  return <div className={s.metaData}>
    <div className={s.label}>{label}</div>
    <div className={s.value}>{value}</div>
  </div>
}
