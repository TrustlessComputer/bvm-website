// @refresh reset

import useTemplate from '@/modules/agent-studio/Buy/hooks/useTemplate';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useFirstLoadTemplateBoxStore from '@/modules/agent-studio/Buy/stores/useFirstLoadTemplateBoxStore';
import useModelCategoriesStore from '@/modules/agent-studio/Buy/stores/useModelCategoriesStore';
import { parseWalletType } from '@/modules/agent-studio/dapp/parseUtils/wallet-type';
import { parseYoloGames } from '@/modules/agent-studio/dapp/parseUtils/yologame';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { IAirdrop } from '@/services/api/dapp/airdrop/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { getModelCategories, getTemplates } from '@/services/agent-model';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { dappSelector } from '@/stores/states/dapp/selector';
import { BlockModel, DappModel, IModelCategory } from '@/types/customize-model';
import { compareString } from '@/utils/string';
import handleStatusEdges from '@utils/helpers';
import { Edge, MarkerType } from '@xyflow/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { parseAirdrop } from '../../dapp/parseUtils/airdrop';
import { parseIssuedToken } from '../../dapp/parseUtils/issue-token';
import { parseStakingPools } from '../../dapp/parseUtils/staking';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import { parseDappModel } from '../../utils';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  isRenderedInUpdateFlowSignal,
  templateIds2DSignal,
} from '../signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../signals/useFormDappsSignal';
import useDappsStore, { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore, { AppNode, AppState } from '../stores/useFlowStore';
import useUpdateFlowStore from '../stores/useUpdateFlowStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import useAvailableListTemplate from '../studio/useAvailableListTemplate';
import useModelCategory from '../studio/useModelCategory';
import { DappType } from '../types';
import { cloneDeep, FormDappUtil } from '../utils';
import { parseWhitePapers } from '@/modules/agent-studio/dapp/parseUtils/whitePaper';
import useStudioHelper from './useStudioHelper';
import useNodeHelper from './useNodeHelper';
import useStudioInfo from './useStudioInfo';

export default function useFetchingTemplate() {
  const path = usePathname();

  const dapps = useDappsStore((state) => state.dapps);

  const templateDapps = useTemplateFormStore((state) => state.templateDapps);
  const templateForm = useTemplateFormStore((state) => state.templateForm);
  const setTemplateForm = useTemplateFormStore(
    (state) => state.setTemplateForm,
  );
  const setTemplateDapps = useTemplateFormStore(
    (state) => state.setTemplateDapps,
  );

  const nodes = useFlowStore((state) => state.nodes);
  const setNodes = useFlowStore((state) => state.setNodes);
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);

  const setParsedCategories = useModelCategoriesStore(
    (state) => state.setParsedCategories,
  );
  const setCategories = useModelCategoriesStore((state) => state.setCategories);
  const setCategoriesTemplates = useModelCategoriesStore(
    (state) => state.setCategoriesTemplates,
  );
  const setCategoryMapping = useModelCategoriesStore(
    (state) => state.setCategoryMapping,
  );

  const field = useOrderFormStoreV3((state) => state.field);
  const setFields = useOrderFormStoreV3((state) => state.setFields);

  const modelCategoryList = useModelCategory().modelCategoryList;

  const { setUpdated, updated } = useUpdateFlowStore();
  const { setIsFirstLoadTemplateBox } = useFirstLoadTemplateBoxStore();
  const { l2ServiceUserAddress } = useWeb3Auth();
  const { setTemplate } = useTemplate();
  const { isUpdateFlow } = useStudioInfo();
  const { getChainNode, getChainNodeId } = useNodeHelper();
  const { order, isAAInstalled, isBridgeInstalled, isGamingAppsInstalled } =
    useChainProvider();
  const { templateList, templateDefault } = useAvailableListTemplate();
  const { counterFetchedDapp } = useAppSelector(commonSelector);
  const dappState = useAppSelector(dappSelector);
  const { tokens, airdrops, stakingPools, yoloGames, walletType, whitePapers } =
    dappState;

  const [needSetDataTemplateToBox, setNeedSetDataTemplateToBox] =
    React.useState(false);
  const [needCheckAndAddAA, setNeedCheckAndAddAA] = React.useState(false);
  const [needSetPreTemplate, setNeedSetPreTemplate] = React.useState(false);
  const [reseted, setReseted] = React.useState(false);

  const convertData = (data: IModelCategory[]) => {
    const newData = data?.map((item) => {
      return {
        ...item,
        options: item.options?.map((option) => {
          return {
            ...option,
            value: option.key,
            label: option.title,
            disabled: !option.selectable || item.disable,
          };
        }),
      };
    });

    return newData || [];
  };

  const fetchData = async () => {
    const newFields = cloneDeep(field);
    const categoryMapping: Record<string, IModelCategory> = {};

    // DON'T REMOVE THIS, IT CAUSES ERROR
    const [categories, templates] = await Promise.all([
      getModelCategories(l2ServiceUserAddress),
      getTemplates(),
    ]);
    const sortedCategories = [...modelCategoryList];

    sortedCategories.forEach((_field) => {
      newFields[_field.key] = {
        value: null,
        dragged: false,
      };
      categoryMapping[_field.key] = _field;
    });

    setCategoryMapping(categoryMapping);
    setParsedCategories(convertData(sortedCategories));
    setCategories(sortedCategories);
    setCategoriesTemplates(templateList);
    setFields(newFields);
    setNeedSetDataTemplateToBox(true);
    setNeedSetPreTemplate(true);
  };

  const dataTemplateToBox = async () => {
    setIsFirstLoadTemplateBox(true);

    const newNodes: AppNode[] = [];
    newNodes.unshift(getChainNode({ x: 30, y: 30 }));

    if (!templateForm) {
      const edgeData: Edge[] = [];

      setEdges(edgeData);
      setNodes(newNodes);
      setNeedSetDataTemplateToBox(false);

      if (isUpdateFlow) setNeedCheckAndAddAA(true);

      return;
    }

    let formDapp: Record<string, any> = {};

    const totalBase = new Set(
      Object.keys(templateForm).map((fieldKey) =>
        FormDappUtil.getBaseIndex(fieldKey),
      ),
    ).size;
    const draggedIds2D: typeof templateIds2DSignal.value = Array(
      totalBase,
    ).fill([]);

    Object.keys(templateForm).forEach((fieldKey) => {
      const value = templateForm[fieldKey];
      const baseIndex = FormDappUtil.getBaseIndex(fieldKey);
      const thisDapp = templateDapps[baseIndex];
      const blockFieldMapping = {} as Record<string, BlockModel>;
      const key = FormDappUtil.getOriginalKey(fieldKey);
      const index = FormDappUtil.getIndex(fieldKey);
      const blockKey = FormDappUtil.getBlockKey(fieldKey);
      const isInBase = FormDappUtil.isInBase(fieldKey);
      const isInBlock = FormDappUtil.isInBlock(fieldKey);
      (thisDapp?.blockFields || []).forEach((item) => {
        blockFieldMapping[item.key] = item;
      });

      if (
        draggedIds2D[baseIndex] &&
        !draggedIds2D[baseIndex][index] &&
        !isInBase
      ) {
        const _key = isInBlock ? blockKey : key;
        const prefix = 'right-' + FormDappUtil.getBlockType(fieldKey);
        const children = !isInBlock
          ? []
          : (blockFieldMapping[blockKey].childrenFields || []).map((item) => ({
              name: item.key,
              value: '',
              parentNames: [],
              children: [],
            }));

        draggedIds2D[baseIndex] = [
          ...draggedIds2D[baseIndex],
          {
            name: prefix + '-' + _key,
            value: '',
            parentNames: [],
            children,
          },
        ];
      }

      formDapp = {
        ...formDapp,
        [fieldKey]: value,
      };
    });

    const setDappKeys = new Set(templateDapps.map((dapp) => dapp.key));
    const allDappKeys = Array.from(setDappKeys);
    const xOffsetCount = allDappKeys.reduce((acc, key) => {
      acc[key] = 1;
      return acc;
    }, {} as Record<string, number>);
    const getHandleNodeBlockChain = newNodes.find(
      (item) => item.id === getChainNodeId(),
    );

    let nodesData = nodes;
    let edgeData: Edge[] = [];

    const _newNodes: any[] = draggedIds2D.map((ids, index) => {
      const dappKey = templateDapps[index].key;
      const statusDapp = templateDapps[index].label?.status || '';
      const titleStatusDapp = templateDapps[index].label?.title || '';

      const thisNode = [
        ...tokens,
        ...airdrops,
        ...stakingPools,
        ...yoloGames,
        ...whitePapers,
      ][index];
      const defaultPositionX =
        50 * (xOffsetCount[dappKey] - 1) + 500 * xOffsetCount[dappKey]++;
      const defaultPositionY = 30 + 500 * (allDappKeys.indexOf(dappKey) + 1);
      // const xOffset = thisNode?.position_x ?? defaultPositionX;
      const xOffset = defaultPositionX;
      // const yOffset = thisNode?.position_y ?? defaultPositionY;
      const yOffset = defaultPositionY;
      const idNode = index.toString();
      const isHandleExists = getHandleNodeBlockChain?.data?.sourceHandles?.some(
        (handle) =>
          handle === `${getChainNodeId()}-s-${templateDapps[index].title}`,
      );

      if (!isHandleExists) {
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${getChainNodeId()}-s-${templateDapps[index].title}`,
        );

        nodesData = newNodes.map((item) =>
          item.id === getChainNodeId() ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];
      }

      edgeData.push({
        id: `${Math.random()}`,
        source: getChainNodeId(),
        sourceHandle: `${getChainNodeId()}-s-${templateDapps[index].title}`,
        target: `${idNode}`,
        targetHandle: `${idNode}-t-${getChainNodeId()}`,
        type: 'customEdge',
        label: handleStatusEdges(statusDapp, 'running', idNode).icon,
        animated: handleStatusEdges(statusDapp, 'running', idNode).animate,
        selectable: false,
        selected: false,
        focusable: false,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          strokeWidth: 1,
          color: '#AAAAAA',
        },
        style: {
          stroke: '#AAAAAA',
          strokeWidth: 2,
        },
      });

      return {
        id: idNode,
        type: 'dappTemplate',
        dragHandle: '.drag-handle-area',
        data: {
          node: 'template',
          label: templateDapps[index].title,
          status: titleStatusDapp,
          isChain: false,
          dapp: templateDapps[index],
          ids,
          baseIndex: index,
          // targetHandles: [`${idNode}-t-${getChainNodeId()}`],
          targetHandles: [],
          sourceHandles: [`${idNode}-t-${getChainNodeId()}`],
          // sourceHandles: [],
          itemId: thisNode?.id,
          positionId: thisNode?.position_id,
        },
        position: { x: xOffset, y: yOffset },
      };
    });

    const map: any = {};
    for (const element of [...newNodes, ...nodesData, ..._newNodes]) {
      map[element.id] = element;
    }
    const newArray = Object.values(map) as AppNode[];

    templateIds2DSignal.value = [...draggedIds2D];
    formTemplateDappSignal.value = { ...formDapp };
    // console.log('[...edges, ...edgeData]', [...edges, ...edgeData]);
    // console.log('Nodes', newArray);
    if (path === '/studio') {
      setEdges([...edgeData]);
    } else {
      setEdges([...edges, ...edgeData]);
    }
    setNodes(newArray);
    setNeedSetDataTemplateToBox(false);
    setNeedCheckAndAddAA(true);
  };

  const parseDappApiToDappModel = async () => {
    console.log('PARSE DAPP API TO DAPP MODEL');

    let startIndex = 0;

    const parsedTokensData = parseTokensData(tokens);
    const parsedTokensForm = parseDappModel({
      key: DappType.token_generation,
      model: parsedTokensData,
      startIndex: startIndex,
    });

    startIndex += parsedTokensData.length;
    const parsedAirdropsData = await parseAirdropsData(airdrops, tokens);
    const parsedAirdropsForm = parseDappModel({
      key: DappType.airdrop,
      model: parsedAirdropsData,
      startIndex: startIndex,
    });

    startIndex += parsedAirdropsData.length;
    const parsedStakingPoolsData = parseStakingPools(stakingPools);
    const parsedStakingPoolsForm = parseDappModel({
      key: DappType.staking,
      model: parsedStakingPoolsData,
      startIndex: startIndex,
    });

    startIndex += parsedStakingPoolsData.length;
    const parsedYoloGameData = parseYoloGames(yoloGames);
    const parsedYoloGameForm = parseDappModel({
      key: DappType.yologame,
      model: parsedYoloGameData,
      startIndex: startIndex,
    });

    startIndex += yoloGames.length;
    const parsedWalletData = walletType ? parseWalletType(walletType) : [];
    const parsedWalletForm = walletType
      ? parseDappModel({
          key: DappType.walletType,
          model: parsedWalletData,
          startIndex: startIndex,
        })
      : {};

    startIndex += parsedYoloGameData.length;
    const parsedWhitePaperData = parseWhitePapers(whitePapers);
    const parsedWhitePaperForm = parseDappModel({
      key: DappType.white_paper,
      model: parsedWhitePaperData,
      startIndex: startIndex,
    });

    console.log('[useFetchingTemplate] parsedTokensData', {
      tokens,
      airdrops,
      stakingPools,
      parsedWalletData,
      yoloGames,
      whitePapers,
    });

    setTemplateDapps([
      ...parsedTokensData,
      ...parsedAirdropsData,
      ...parsedStakingPoolsData,
      ...parsedYoloGameData,
      ...parsedWalletData,
      ...parsedWhitePaperData,
    ]);
    setTemplateForm({
      ...parsedTokensForm.fieldValue,
      ...parsedAirdropsForm.fieldValue,
      ...parsedStakingPoolsForm.fieldValue,
      ...parsedYoloGameForm.fieldValue,
      ...((parsedWalletForm as any)?.fieldValue || {}),
      ...parsedWhitePaperForm.fieldValue,
    } as any);

    setNeedSetDataTemplateToBox(true);
  };

  const parseTokensData = (tokens: IToken[]) => {
    const result: DappModel[] = [];

    for (const token of tokens) {
      const t = parseIssuedToken(token);
      result.push(t);
    }

    return result;
  };

  const parseAirdropsData = async (
    _airdrops: IAirdrop[],
    _tokens: IToken[],
  ) => {
    const result: DappModel[] = [];

    for (const airdrop of _airdrops) {
      const _token = tokens.find((v: IToken) =>
        compareString(v.contract_address, airdrop.token_address),
      );

      const t = await parseAirdrop(airdrop, _token as IToken);
      result.push(t);
    }

    return result;
  };

  const checkAndAddAA = () => {
    console.log(
      '[useFetchingTemplate] MUST CALL LAST',
      draggedIds2DSignal.value,
    );

    const newDraggedIds2D = [];
    const newDraggedDappIndexes = [];

    if (isAAInstalled) {
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'general_idea');
      newDraggedDappIndexes.push(dappIndex);
      newDraggedIds2D.push([]);
    }

    if (isBridgeInstalled) {
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'bridge_apps');
      newDraggedDappIndexes.push(dappIndex);
      newDraggedIds2D.push([]);
    }

    if (isGamingAppsInstalled) {
      const dappIndex = dapps.findIndex((dapp) => dapp.key === 'gaming_apps');
      newDraggedDappIndexes.push(dappIndex);
      newDraggedIds2D.push([]);
    }

    draggedDappIndexesSignal.value = newDraggedDappIndexes;
    draggedIds2DSignal.value = newDraggedIds2D;
    isRenderedInUpdateFlowSignal.value = true;

    setNeedCheckAndAddAA(false);
  };

  const setPreTemplate = () => {
    if (isUpdateFlow && order) {
      setTemplate(order.selectedOptions || []);
    } else {
      setTemplate(templateDefault || []);
    }

    setNeedSetPreTemplate(false);
  };

  React.useEffect(() => {
    setNodes([]);
    setEdges([]);
    setCategories([]);
    setParsedCategories([]);
    setCategoriesTemplates([]);
    setFields({});
    setCategoryMapping({});
    setTemplateDapps([]);
    setTemplateForm(null);

    setNeedSetDataTemplateToBox(false);
    setNeedSetPreTemplate(false);
    setNeedCheckAndAddAA(false);

    draggedIds2DSignal.value = [];
    draggedDappIndexesSignal.value = [];
    templateIds2DSignal.value = [];
    formTemplateDappSignal.value = {};
    formDappSignal.value = {};

    needReactFlowRenderSignal.value = true;

    setReseted(true);
  }, []);

  React.useEffect(() => {
    if (!reseted) return;

    fetchData();
    // parseDappApiToDappModel();
  }, [reseted]);

  React.useEffect(() => {
    if (!isUpdateFlow) return;

    if (updated) {
      draggedDappIndexesSignal.value = [];
      draggedIds2DSignal.value = [];
      fetchData();
    }

    parseDappApiToDappModel();
    setUpdated(false);
  }, [counterFetchedDapp]);

  React.useEffect(() => {
    if (!needCheckAndAddAA || !isUpdateFlow) return;

    checkAndAddAA();
  }, [needCheckAndAddAA, isAAInstalled, isUpdateFlow]);

  React.useEffect(() => {
    if (!needSetDataTemplateToBox) return;

    dataTemplateToBox();
  }, [needSetDataTemplateToBox]);

  React.useEffect(() => {
    if (!needSetPreTemplate) return;

    setPreTemplate();
  }, [needSetPreTemplate]);
}
