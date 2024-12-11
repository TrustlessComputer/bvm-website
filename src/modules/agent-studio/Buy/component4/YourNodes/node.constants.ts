export const nodeKey = Object.freeze({
  // CUSTOM_BOX: 'customBox',
  // CHAIN_NODE: 'chainNode',
  // DAPP_TEMPLATE: 'dappTemplate',

  // V2
  CHAIN_NODE: 'chainNode',
  DAPP_NODE: 'dappNode',
  NFT_ETHER_NODE: 'nftEtherNode',
  NFT_ORDINAL_BTC_NODE: 'nftOrdinalBtcNode',
  TOKENS_PUMP_NODE: 'tokensPumpNode',
  GENERAL_IDEA_NODE: 'generalIdeaNode',
});

export const nodeOverlayType = Object.freeze({
  LOADING: 'loading',
  ACTION: 'action',
});

export const dappKeyMapNodeKey: Record<
  string,
  (typeof nodeKey)[keyof typeof nodeKey]
> = Object.freeze({
  general_idea: nodeKey.GENERAL_IDEA_NODE,
  nft_ether: nodeKey.NFT_ETHER_NODE,
  ordinal_bitcoin: nodeKey.NFT_ORDINAL_BTC_NODE,
  tokens_pump_fun: nodeKey.TOKENS_PUMP_NODE,
});

export const dappKeyToNodeKey = (dappKey: string) => {
  return dappKeyMapNodeKey[dappKey] || nodeKey.DAPP_NODE;
};
