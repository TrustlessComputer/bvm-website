import s from './style.module.scss'
import ImagePlaceholder from '@components/ImagePlaceholder';
import ModuleArchitectureCardContent from '@/modules/aiLandingModule/components/ModuleArchitectureCardContent';

const ModuleArchitectureCard = () => {
  return <div className={s.wrapper}>
    <ImagePlaceholder src={'/bvm-eternal/chart01.png'} alt={'chart01'} width={600} height={600}/>
    <div>
      <ModuleArchitectureCardContent/>
    </div>
  </div>
}

export default ModuleArchitectureCard;
