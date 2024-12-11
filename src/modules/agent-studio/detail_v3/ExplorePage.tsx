import { IModelCategory } from '@/types/customize-model';
import ExplorePage from '../Buy/Explore';

type Props = {
  cloneItemCallback: (template: IModelCategory[]) => void;
};

const ExplorePageView = (props: Props) => {
  return <ExplorePage cloneItemCallback={props.cloneItemCallback} />;
};

export default ExplorePageView;
