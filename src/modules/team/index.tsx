import Content from './Content';
import Heading from './Heading';
import Members from './Members';
import s from './styles.module.scss';

export default function TeamModule() {
  return (
    <div className={s.ourStory}>
      <div className={s.inner}>
        <Heading />
        <Members />
        <Content />
      </div>
    </div>
  );
}
