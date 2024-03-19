import s from './style.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import ModuleArchitectureCardContent from '@/modules/aiLandingModule/components/ModuleArchitectureCardContent';

type TModuleArchitectureCard = {
  className?: string;
  data: any;
}

const ModuleArchitectureCard = ({ data, className }: TModuleArchitectureCard) => {
  return <div className={`${s.wrapper} ${className}`}>
    <div className={s.image}>
      <ImagePlaceholder src={data.thumbnail} alt={'chart01'} width={600} height={600}/>
    </div>

    <div className={s.wrapperContent}>
      {
        data.content.map((item: any) => {
          return <ModuleArchitectureCardContent key={item.id} title={item.heading} description={item.description}/>
        })
      }
      {/*<ModuleArchitectureCardContent/>*/}
      {/*<ModuleArchitectureCardContent/>*/}
    </div>
  </div>
}

export default ModuleArchitectureCard;
