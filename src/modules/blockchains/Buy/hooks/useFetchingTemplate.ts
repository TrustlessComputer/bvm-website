import useTemplate from '@/modules/blockchains/Buy/hooks/useTemplate';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
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
import { useParams } from 'next/navigation';
import React from 'react';
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
import { formTemplateDappSignal } from '../signals/useFormDappsSignal';
import { useTemplateFormStore } from '../stores/useDappStore';
import useFlowStore, { AppNode, AppState } from '../stores/useFlowStore';
import { DappType } from '../types';
import { cloneDeep, FormDappUtil } from '../utils';

export default function useFetchingTemplate() {
  const params = useParams();
  const isUpdateChainPage = React.useMemo(() => !!params?.id, [params?.id]);

  const { order, isAAInstalled, isUpdateFlow } = useChainProvider();
  const { nodes, setNodes, edges, setEdges } = useFlowStore();
  const {
    setParsedCategories,
    setCategories,
    setCategoriesTemplates,
    categoriesTemplates,
    setCategoryMapping,
  } = useModelCategoriesStore();
  const { field, setFields } = useOrderFormStoreV3();

  const { l2ServiceUserAddress } = useWeb3Auth();
  const { initTemplate, setTemplate } = useTemplate();
  const { templateDapps, templateForm, setTemplateForm, setTemplateDapps } =
    useTemplateFormStore();

  const { needReload } = useAppSelector(commonSelector);
  const dappState = useAppSelector(dappSelector);
  const { tokens, airdrops, stakingPools } = dappState;

  const [apiCount, setApiCount] = React.useState(0);

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
      // getModelCategories(l2ServiceUserAddress),
      getModelCategories('0x4113ed747047863Ea729f30C1164328D9Cc8CfcF'),
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

    if (isAAInstalled) {
      draggedDappIndexesSignal.value = [0];
      draggedIds2DSignal.value = [[]];
    }

    const chainNodeInitial: ChainNode = {
      id: 'blockchain',
      type: nodeKey.CHAIN_NODE,
      data: {
        node: 'chain',
        title: 'Blockchain',
        sourceHandles: [],
        targetHandles: [],
      },
      dragHandle: '.drag-handle-area',
      position: { x: 30, y: 30 },
    };
    nodes.unshift(chainNodeInitial);

    setCategoryMapping(categoryMapping);
    setParsedCategories(convertData(sortedCategories));
    setCategories(sortedCategories);
    setCategoriesTemplates(templates);
    setNodes(nodes);
    setFields(newFields);
    setApiCount((prev) => prev + 1);
  };

  const dataTemplateToBox = async () => {
    if (!templateForm) return;

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

    const rootNode = 'blockchain';

    const setDappKeys = new Set(templateDapps.map((dapp) => dapp.key));
    const allDappKeys = Array.from(setDappKeys);
    const xOffsetCount = allDappKeys.reduce((acc, key) => {
      acc[key] = 1;
      return acc;
    }, {} as Record<string, number>);
    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);

    let nodesData = nodes;
    let edgeData: Edge[] = [];

    const newNodes: any[] = draggedIds2D.map((ids, index) => {
      const dappKey = templateDapps[index].key;
      const xOffset = 30 + 500 * xOffsetCount[dappKey]++;
      const yOffset = 30 + 500 * allDappKeys.indexOf(dappKey);
      const idNode = index.toString();
      const isHandleExists = edges.some(
        (handle) =>
          handle.sourceHandle === `${rootNode}-s-${templateDapps[index].title}`,
      );

      if (!isHandleExists) {
        getHandleNodeBlockChain?.data?.sourceHandles?.push(
          `${rootNode}-s-${templateDapps[index].title}`,
        );
        nodesData = nodes.map((item) =>
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
          label: templateDapps[index].title,
          status: 'Running',
          isChain: false,
          dapp: templateDapps[index],
          ids,
          baseIndex: index,
          targetHandles: [`${idNode}-t-${rootNode}`],
          sourceHandles: [],
        },
        position: { x: xOffset, y: yOffset },
      };
    });
    // const newNodes: DappNode[] = draggedIds2D.map((ids, index) => {
    //   return {
    //     id: Math.random().toString(),
    //     type: nodeKey.DAPP_NODE,
    //     dragHandle: '.drag-handle-area',
    //     data: {
    //       title: templateDapps[index].title,
    //       dapp: templateDapps[index],
    //       ids,
    //       baseIndex: index,
    //       sourceHandles: [],
    //       targetHandles: [],
    //       node: 'dapp',
    //       categoryOption: {} as IModelCategory,
    //     },
    //     position: { x: 30 * (index + 2), y: 30 * (index + 2) },
    //   } as DappNode;
    // });

    const map: any = {};
    for (const element of [...nodesData, ...newNodes]) {
      map[element.id] = element;
    }
    const newArray = Object.values(map) as AppNode[];

    setEdges(edgeData);
    // setNodes([...nodes, ...newNodes]);
    setNodes(newArray);

    templateIds2DSignal.value = [...draggedIds2D];
    formTemplateDappSignal.value = { ...formDapp };
  };

  const parseDappApiToDappModel = async () => {
    const parsedTokensData = parseTokensData(tokens);
    const parsedTokensForm = parseDappModel({
      key: DappType.token_generation,
      model: parsedTokensData,
      startIndex: 0,
    });

    const parsedAirdropsData = await parseAirdropsData(airdrops, tokens);
    const parsedAirdropsForm = parseDappModel({
      key: DappType.airdrop,
      model: parsedAirdropsData,
      startIndex: parsedTokensData.length,
    });

    const parsedStakingPoolsData = parseStakingPools(stakingPools);
    const parsedStakingPoolsForm = parseDappModel({
      key: DappType.staking,
      model: parsedStakingPoolsData,
      startIndex: parsedTokensData.length + parsedAirdropsData.length,
    });

    setTemplateDapps([
      ...parsedTokensData,
      ...parsedAirdropsData,
      ...parsedStakingPoolsData,
    ]);
    setTemplateForm({
      ...parsedTokensForm.fieldValue,
      ...parsedAirdropsForm.fieldValue,
      ...parsedStakingPoolsForm.fieldValue,
    } as any);

    setApiCount((prev) => prev + 1);
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
      const _token = tokens.find((v) =>
        compareString(v.contract_address, airdrop.token_address),
      );

      const t = await parseAirdrop(airdrop, _token as IToken);
      result.push(t);
    }

    return result;
  };

  React.useEffect(() => {
    fetchData();
  }, [isUpdateFlow]);

  React.useEffect(() => {
    parseDappApiToDappModel();
  }, [needReload]);

  React.useEffect(() => {
    // Chain API and Dapp API
    if (apiCount < 2) return;

    dataTemplateToBox();
  }, [apiCount]);

  React.useEffect(() => {
    if (isUpdateChainPage && order) {
      setTemplate(order.selectedOptions || []);
    } else {
      initTemplate(0);
    }
  }, [order, categoriesTemplates]);
}
