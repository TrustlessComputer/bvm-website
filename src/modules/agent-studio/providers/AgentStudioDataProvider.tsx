import { IModelCategory } from '@/types/customize-model';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export interface IAgentStudioDataContext {
  templateList: IModelCategory[][];
  modelCategoryList: IModelCategory[];
}

export const AgentStudioDataContext = createContext<IAgentStudioDataContext>({
  templateList: [],
  modelCategoryList: [],
});

export const AgentStudioDataProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [isFetching, setFetching] = useState(false);
  const [templateList, setTemplateList] = useState<IModelCategory[][]>([]);
  const [modelCategoryList, setModelCategoryList] = useState<IModelCategory[]>(
    [],
  );

  const fetchtModelCategoryList = async () => {
    let dataList: IModelCategory[] = [];
    try {
      const data = await fetch(
        `https://l2aas-api.newbitcoincity.com/api/agent/available-list`,
      ).then((res) => res.json());
      dataList = data.result || [];
    } catch (error) {
      console.log('[fetchtModelCategoryList] ERROR: ', error);
      dataList = [];
    } finally {
      setModelCategoryList(dataList);
    }
  };

  const fetchTemplateList = async () => {
    let dataList: IModelCategory[][] = [];
    try {
      const data = await fetch(
        'https://l2aas-api.newbitcoincity.com/api/agent/available-list-template',
      ).then((res) => res.json());
      dataList = data.result || [];
    } catch (error) {
      console.log('[fetchTemplateList] ERROR: ', error);
      dataList = [];
    } finally {
      setTemplateList(dataList);
    }
  };

  const fetchData = async () => {
    setFetching(true);
    await Promise.all([fetchtModelCategoryList(), fetchTemplateList()]);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isFetching) return <></>;

  const values = {
    modelCategoryList,
    templateList,
  };

  return (
    <AgentStudioDataContext.Provider value={values}>
      {children}
    </AgentStudioDataContext.Provider>
  );
};
