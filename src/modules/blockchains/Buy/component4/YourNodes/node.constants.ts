export const nodeKey = Object.freeze({
  CUSTOM_BOX: 'customBox',
  CHAIN_NODE: 'chainNode',
  DAPP_TEMPLATE: 'dappTemplate',

  // V2
  DAPP_NODE: 'dappNode',
  ACCOUNT_ABSTRACTION_NODE: 'accountAbstractionNode',
  BRIDGE_NODE: 'bridgeNode',
});

export const nodeOverlayType = Object.freeze({
  LOADING: 'loading',
  ACTION: 'action',
});

export const dappKeyMapNodeKey: Record<
  string,
  (typeof nodeKey)[keyof typeof nodeKey]
> = Object.freeze({
  account_abstraction: nodeKey.ACCOUNT_ABSTRACTION_NODE,
  bridge_apps: nodeKey.BRIDGE_NODE,
  issue_a_token: nodeKey.DAPP_NODE,
  staking: nodeKey.DAPP_NODE,
  airdrop: nodeKey.DAPP_NODE,
  yologame: nodeKey.DAPP_NODE,
  white_paper: nodeKey.DAPP_NODE,
});

export const dappKeyToNodeKey = (dappKey: string) => {
  return dappKeyMapNodeKey[dappKey] || nodeKey.DAPP_NODE;
};
