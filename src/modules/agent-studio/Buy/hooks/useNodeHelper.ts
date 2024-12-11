import React from 'react';
import { IModelOption } from '@/types/customize-model';
import { ChainNode, DappNode } from '@/types/node';
import { MarkerType } from '@xyflow/react';
import {
  dappKeyToNodeKey,
  nodeKey,
} from '../component4/YourNodes/node.constants';
import { FieldKeyPrefix } from '../contants';
import {
  draggedDappIndexesSignal,
  draggedIds2DSignal,
  Field,
} from '../signals/useDragSignal';
import useDappsStore from '../stores/useDappStore';
import useDraggedId2DStore from '../stores/useDraggedId2DStore';
import useFlowStore, { AppState } from '../stores/useFlowStore';
import useModelCategoriesStore from '../stores/useModelCategoriesStore';
import { needReactFlowRenderSignal } from '../studio/ReactFlowRender';
import { dappKeyToChainKey } from '../utils';
import {
  createAgentGeneralIdeaAsBrainstorm,
  missionAsBrainstorm,
  gamingAppsAsADapp,
} from '../mockup_3';
import useStudioInfo from '../studio/ActionsWorkArea/useStudioInfo';

const useNodeHelper = () => {
  const setDraggedIds2D = useDraggedId2DStore((state) => state.setDraggedIds2D);

  const categories = useModelCategoriesStore((state) => state.categories);
  const dapps = useDappsStore((state) => state.dapps);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  const { isUpdateFlow } = useStudioInfo();

  const getSourceHandle = ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => `${target}-s-${source}`;

  const getChainNodeId = React.useCallback(() => 'blockchain', []);
  const getAccountAbstractionNodeId = React.useCallback(
    () => 'general_idea',
    [],
  );
  const getBridgeAppsNodeId = React.useCallback(() => 'bridge_apps', []);
  const getGamingAppsNodeId = React.useCallback(() => 'gaming_apps', []);

  const getChainNode = React.useCallback(
    (position: { x: number; y: number }): ChainNode => {
      return {
        id: getChainNodeId(),
        type: nodeKey.CHAIN_NODE,
        data: {
          node: 'chain',
          title: 'Agent structure',
          sourceHandles: isUpdateFlow
            ? [
                `${getChainNodeId()}-s-${getAccountAbstractionNodeId()}`,
                `${getChainNodeId()}-s-${getBridgeAppsNodeId()}`,
                `${getChainNodeId()}-s-${getGamingAppsNodeId()}`,
              ]
            : [],
          targetHandles: [],
        },
        dragHandle: '.drag-handle-area',
        position,
      };
    },
    [],
  );

  const getAccountAbstractionNode = React.useCallback(
    (position: { x: number; y: number }): DappNode => {
      const dapp = createAgentGeneralIdeaAsBrainstorm;

      return {
        id: getAccountAbstractionNodeId(),
        type: dappKeyToNodeKey(dapp.key),
        dragHandle: '.drag-handle-area',
        position,
        data: {
          node: 'dapp',
          title: dapp.title,
          dapp,
          baseIndex: 0,
          categoryOption: {} as IModelOption,
          ids: [],
          targetHandles: [],
          sourceHandles: [
            getSourceHandle({
              source: getChainNodeId(),
              target: getAccountAbstractionNodeId(),
            }),
          ],
        },
      };
    },
    [],
  );

  const getBridgeAppsNode = React.useCallback(
    (position: { x: number; y: number }): DappNode => {
      const dapp = missionAsBrainstorm;

      return {
        id: getBridgeAppsNodeId(),
        type: dappKeyToNodeKey(dapp.key),
        dragHandle: '.drag-handle-area',
        position,
        data: {
          node: 'dapp',
          title: dapp.title,
          dapp,
          baseIndex: 0,
          categoryOption: {} as IModelOption,
          ids: [],
          targetHandles: [],
          sourceHandles: [
            getSourceHandle({
              source: getChainNodeId(),
              target: getBridgeAppsNodeId(),
            }),
          ],
        },
      };
    },
    [],
  );

  const getGamingAppsNode = React.useCallback(
    (position: { x: number; y: number }): DappNode => {
      const dapp = gamingAppsAsADapp;

      return {
        id: getGamingAppsNodeId(),
        type: dappKeyToNodeKey(dapp.key),
        dragHandle: '.drag-handle-area',
        position,
        data: {
          node: 'dapp',
          title: dapp.title,
          dapp,
          baseIndex: 0,
          categoryOption: {} as IModelOption,
          ids: [],
          targetHandles: [],
          sourceHandles: [
            getSourceHandle({
              source: getChainNodeId(),
              target: getGamingAppsNodeId(),
            }),
          ],
        },
      };
    },
    [],
  );

  const addDappToNode = (dappIndex: number, position = { x: 600, y: 30 }) => {
    const { x, y } = position;
    const thisDapp = dapps[dappIndex];

    if (!thisDapp) {
      return;
    }

    const category = categories?.find((category) =>
      category.options.some(
        (option) => option.key === dappKeyToChainKey(thisDapp.key),
      ),
    );
    const categoryOption = category?.options.find(
      (option) => option.key === dappKeyToChainKey(thisDapp.key),
    );

    if (!categoryOption && !thisDapp.isDefaultDapp) {
      return;
    }

    const rootNode = 'blockchain';
    let suffix = thisDapp.title;

    const getHandleNodeBlockChain = nodes.find((item) => item.id === rootNode);
    const isHandleExists = edges.some(
      (handle) => handle.sourceHandle === `${rootNode}-s-${suffix}`,
    );
    let nodesData = nodes;

    if (!isHandleExists) {
      getHandleNodeBlockChain?.data?.sourceHandles?.push(
        `${rootNode}-s-${suffix}`,
      );
      nodesData = nodes.map((item) =>
        item.id === rootNode ? getHandleNodeBlockChain : item,
      ) as AppState['nodes'];
    }

    let newNodeId = `${nodes.length + 1}`;
    const ids: Field[] = [];

    if (
      (thisDapp.baseModuleFields?.length || 0) > 0 &&
      thisDapp.baseBlock.fields.length === 0
    ) {
      ids.push({
        name: `right-${FieldKeyPrefix.BASE_MODULE}-${
          thisDapp.baseModuleFields![0].key
        }`,
        value: thisDapp.baseModuleFields![0].fields[0].value,
        parentNames: [],
        children: [],
      });
    }

    const newNode: DappNode = {
      id: newNodeId,
      type: dappKeyToNodeKey(thisDapp.key),
      dragHandle: '.drag-handle-area',
      position: {
        x,
        y,
      },
      data: {
        node: 'dapp',
        title: thisDapp.title,
        dapp: thisDapp,
        baseIndex: draggedIds2DSignal.value.length - 1,
        categoryOption: categoryOption as IModelOption,
        ids,
        targetHandles: [],
        sourceHandles: [`${newNodeId}-t-${rootNode}`],
      },
    };
    const newEdge = {
      id: `${Math.random()}`,
      source: rootNode,
      sourceHandle: `${rootNode}-s-${suffix}`,
      target: `${newNodeId}`,
      targetHandle: `${newNodeId}-t-${rootNode}`,
      type: 'customEdge',
      label: '',
      selectable: false,
      selected: false,
      focusable: false,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 25,
        height: 25,
        strokeWidth: 1,
        color: '#AAAAAA',
      },
      animated: true,
      style: {
        stroke: '#AAAAAA',
        strokeWidth: 2,
      },
    };

    draggedDappIndexesSignal.value = [
      ...draggedDappIndexesSignal.value,
      dappIndex,
    ];
    draggedIds2DSignal.value = [...draggedIds2DSignal.value, ids];

    setDraggedIds2D([...draggedIds2DSignal.value]);
    setNodes([...nodesData, newNode]);
    setEdges([...edges, newEdge]);

    needReactFlowRenderSignal.value = true;
  };

  return {
    addDappToNode,
    getChainNode,
    getAccountAbstractionNode,
    getBridgeAppsNode,
    getGamingAppsNode,
    getChainNodeId,
    getAccountAbstractionNodeId,
    getBridgeAppsNodeId,
    getGamingAppsNodeId,
  };
};

export default useNodeHelper;
