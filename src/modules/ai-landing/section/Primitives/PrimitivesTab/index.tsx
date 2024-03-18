import { TDataPrimitive } from '../data';
import ButtonInner from './Button';
import Desc from './Desc';
import ImagePrimitive from './Images';
import Title from './Title';
import s from './styles.module.scss';

export default function PrimitivesTab({ data }: {
  data: TDataPrimitive[]
}) {
  return (
    <div className={`${s.wrapperTab} ${data[0].caseStudy ? s.show : ''}`}>
      <div className={`${s.contentTab}`}>
        <div className={s.contentTab_title}>
          {data.map((item, index) => {
            return <Title title={item.title} key={index} id={index} />;
          })}
        </div>
        <div className={s.contentTab_decs}>
          {data.map((item, index) => {
            return <Desc id={index} desc={item.description} key={index} />;
          })}
        </div>
        <div className={s.contentTab_button}>
          {data.map((item, index) => {
            return <ButtonInner title={item.linkTitle} isOpen={item.isOpen} link={item.link} id={index} />;
          })}
        </div>
      </div>
      <div className={`${s.wrapperImage}`}>
        {data.map((item, index) => {
          return <ImagePrimitive id={index} src={item.image} />;
        })}
      </div>
    </div>
  );
}
