import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import { parseYoloGames } from '@/modules/blockchains/dapp/parseUtils/yologame';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { IAirdrop } from '@/services/api/dapp/airdrop/interface';
import { IToken } from '@/services/api/dapp/token_generation/interface';
import { getModelCategories, getTemplates } from '@/services/customize-model';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { dappSelector } from '@/stores/states/dapp/selector';
import { BlockModel, DappModel, IModelCategory } from '@/types/customize-model';
import { ChainNode } from '@/types/node';
import { compareString } from '@/utils/string';
import { Edge, MarkerType } from '@xyflow/react';
import { useParams, usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { parseAirdrop } from '../../dapp/parseUtils/airdrop';
import { parseIssuedToken } from '../../dapp/parseUtils/issue-token';
import { parseStakingPools } from '../../dapp/parseUtils/staking';
import { useChainProvider } from '../../detail_v4/provider/ChainProvider.hook';
import { parseDappModel } from '../../utils';
import { nodeKey } from '../component4/YourNodes/node.constants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  templateIds2DSignal,
} from '../signals/useDragSignal';
import {
  formDappSignal,
  formTemplateDappSignal,
} from '../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore, { AppNode, AppState } from '../stores/useFlowStore';
import useUpdateFlowStore from '../stores/useUpdateFlowStore';
import { DappType } from '../types';
import { cloneDeep, FormDappUtil } from '../utils';
import useDapps from './useDapps';
import useAvailableListTemplate from '../studio/useAvailableListTemplate';
import useModelCategory from '../studio/useModelCategory';

export default function useFetchingTemplate() {
  const { templateList } = useAvailableListTemplate();
  const { modelCategoryList } = useModelCategory();
  const { dapps } = useDapps();
  const path = usePathname();
  const params = useParams();
  const isUpdateFlow = React.useMemo(() => !!params?.id, [params?.id]);

  const { order, isAAInstalled, isBridgeInstalled } = useChainProvider();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const {
    categories,
    setParsedCategories,
    setCategories,
    setCategoriesTemplates,
    categoriesTemplates,
    setCategoryMapping,
  } = useModelCategoriesStore();
  const { field, setFields } = useOrderFormStoreV3();
  const { setUpdated, updated } = useUpdateFlowStore();
  const param = useParams();

  const { l2ServiceUserAddress } = useWeb3Auth();
  const { initTemplate, setTemplate } = useTemplate();
  const { templateDapps, templateForm, setTemplateForm, setTemplateDapps } =
    useTemplateFormStore();

  const { counterFetchedDapp } = useAppSelector(commonSelector);
  const dappState = useAppSelector(dappSelector);
  const { tokens, airdrops, stakingPools, yoloGames } = dappState;

  const [needSetDataTemplateToBox, setNeedSetDataTemplateToBox] =
    React.useState(false);
  const [needCheckAndAddAA, setNeedCheckAndAddAA] = React.useState(false);

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
    const [categories, templates] = await Promise.all([
      getModelCategories(l2ServiceUserAddress),
      // getModelCategories('0x4113ed747047863Ea729f30C1164328D9Cc8CfcF'),
      getTemplates(),
    ]);

    // Use mockup data
    // const sortedCategories = (categoriesMockup || []).sort(
    // Use API
    const sortedCategories = (categories || []).sort(
      (a, b) => a.order - b.order,
    );

    sortedCategories.forEach((_field) => {
      newFields[_field.key] = {
        value: null,
        dragged: false,
      };
      categoryMapping[_field.key] = _field;
    });

    // if (isAAInstalled) {
    //   draggedDappIndexesSignal.value = [0];
    //   draggedIds2DSignal.value = [[]];
    // }

    setCategoryMapping(categoryMapping);
    setParsedCategories(convertData(sortedCategories));
    setCategories(sortedCategories);
    setCategoriesTemplates(templates);
    setFields(newFields);
    setNeedSetDataTemplateToBox(true);
  };

  const checkParam = useMemo(() => {
    return !!param.id;
  }, [param.id]);

  const dataTemplateToBox = async () => {
    formDappSignal.value = {};
    formTemplateDappSignal.value = {};

    console.log('SET DATA TEMPLATE TO BOX');
    const newNodes: AppNode[] = [];
    const rootNode = 'blockchain';
    // const aaAsDapp = accountAbstractionAsADapp;
    // if (isAAInstalled) {
    //   newNodes.unshift({
    //     id: '0',
    //     type: nodeKey.ACCOUNT_ABSTRACTION_NODE,
    //     dragHandle: '.drag-handle-area',
    //     position: { x: 0, y: 0 },
    //     data: {
    //       node: 'dapp',
    //       title: aaAsDapp.title,
    //       dapp: aaAsDapp,
    //       baseIndex: 0,
    //       categoryOption:
    //         (categories || []).find((dapp) => dapp.key === 'wallet')
    //           ?.options[0] || {},
    //       ids: [],
    //       targetHandles: [`${0}-t-${rootNode}`],
    //       sourceHandles: [],
    //     },
    //   });
    // }

    const chainNodeInitial: ChainNode = {
      id: rootNode,
      type: nodeKey.CHAIN_NODE,
      data: {
        node: 'chain',
        title: 'Blockchain',
        sourceHandles: checkParam
          ? [`${rootNode}-s-account-abstraction`, `${rootNode}-s-bridge_apps`]
          : [],
        targetHandles: [],
      },
      dragHandle: '.drag-handle-area',
      position: { x: 30, y: 30 },
    };
    newNodes.unshift(chainNodeInitial);

    if (!templateForm) {
      const edgeData: Edge[] = [];

      setEdges(edgeData);
      setNodes(newNodes);
      setNeedSetDataTemplateToBox(false);
      setNeedCheckAndAddAA(true);
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

      if (!draggedIds2D[baseIndex][index] && !isInBase) {
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
      (item) => item.id === rootNode,
    );

    let nodesData = nodes;
    let edgeData: Edge[] = [];

    const _newNodes: any[] = draggedIds2D.map((ids, index) => {
      const dappKey = templateDapps[index].key;
      const thisNode = [...tokens, ...airdrops, ...stakingPools, ...yoloGames][
        index
      ];
      const defaultPositionX = 30 + 500 * xOffsetCount[dappKey]++;
      const defaultPositionY = 30 + 500 * allDappKeys.indexOf(dappKey);
      const xOffset = thisNode?.position_x ?? defaultPositionX;
      const yOffset = thisNode?.position_y ?? defaultPositionY;
      const idNode = index.toString();
      const isHandleExists = getHandleNodeBlockChain?.data?.sourceHandles?.some(
        (handle) => handle === `${rootNode}-s-${templateDapps[index].title}`,
      );

      if (!isHandleExists) {
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-${templateDapps[index].title}`,
        );

        nodesData = newNodes.map((item) =>
          item.id === rootNode ? getHandleNodeBlockChain : item,
        ) as AppState['nodes'];
      }

      edgeData.push({
        id: `${Math.random()}`,
        source: rootNode,
        sourceHandle: `${rootNode}-s-${templateDapps[index].title}`,
        target: `${idNode}`,
        targetHandle: `${idNode}-t-${rootNode}`,
        type: 'customEdge',
        label: '',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 25,
          height: 25,
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
          node: 'dapp',
          label: templateDapps[index].title,
          status: 'Running',
          isChain: false,
          dapp: templateDapps[index],
          ids,
          baseIndex: index,
          targetHandles: [`${idNode}-t-${rootNode}`],
          sourceHandles: [],
          itemId: thisNode?.id,
          positionId: thisNode?.position_id,
        },
        position: { x: xOffset, y: yOffset },
      };
    });

    // if (updated) {
    //   const preNodes = (localStorage.getItem(
    //     LocalStorageKey.UPDATE_FLOW_NODES,
    //   ) || []) as AppNode[];

    //   _newNodes.forEach((node, index) => {
    //     if (!preNodes[index]) return;

    //     node.position = preNodes[index].position;
    //     node.data = {
    //       ...node.data,
    //       sourceHandles: preNodes[index].data.sourceHandles,
    //       targetHandles: preNodes[index].data.targetHandles,
    //     };
    //   });
    // }

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

    console.log('nodes----', {newArray, edgeData,formDapp, totalBase, draggedIds2D });
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

    console.log('[useFetchingTemplate] parsedTokensData', {
      tokens,
      airdrops,
      stakingPools,
    });

    setTemplateDapps([
      ...parsedTokensData,
      ...parsedAirdropsData,
      ...parsedStakingPoolsData,
      ...parsedYoloGameData,
    ]);
    setTemplateForm({
      ...parsedTokensForm.fieldValue,
      ...parsedAirdropsForm.fieldValue,
      ...parsedStakingPoolsForm.fieldValue,
      ...parsedYoloGameForm.fieldValue,
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
      newDraggedDappIndexes.push(0);
      newDraggedIds2D.push([]);
      // draggedDappIndexesSignal.value = [0];
      // draggedIds2DSignal.value = [[]];
    }

    if (isBridgeInstalled) {
      newDraggedDappIndexes.push(1);
      newDraggedIds2D.push([]);
      // draggedDappIndexesSignal.value = [...draggedDappIndexesSignal.value, 1];
      // draggedIds2DSignal.value = [...draggedIds2DSignal.value, []];
    }

    draggedDappIndexesSignal.value = newDraggedDappIndexes;
    draggedIds2DSignal.value = newDraggedIds2D;

    setNeedCheckAndAddAA(false);
  };

  React.useEffect(() => {
    fetchData();
    parseDappApiToDappModel();
  }, []);

  React.useEffect(() => {
    if (!isUpdateFlow) return;

    console.log('zzzzzzzzzzz');

    if (updated) {
      draggedDappIndexesSignal.value = [];
      draggedIds2DSignal.value = [];
      fetchData();
    }

    parseDappApiToDappModel();
    setUpdated(false);
  }, [counterFetchedDapp]);

  React.useEffect(() => {
    if (!needCheckAndAddAA) return;

    checkAndAddAA();
  }, [needCheckAndAddAA, isAAInstalled]);

  React.useEffect(() => {
    if (!needSetDataTemplateToBox) return;

    dataTemplateToBox();
  }, [needSetDataTemplateToBox]);

  React.useEffect(() => {
    if (isUpdateFlow && order) {
      setTemplate(order.selectedOptions || []);
    } else {
      initTemplate(0);
    }
  }, [categoriesTemplates]);
}
