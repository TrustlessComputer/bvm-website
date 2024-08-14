export const PAGE_ID = {
  CREATE_STAKING_POOL: "new-pool",
  STAKING: "staking",
  STAKING_HISTORY: "staking-history",
  CREATE_TOKEN: "create-token",
  MARKETS: "markets",
  TOKEN: "token",
};

export const PAGE_NEED_OWNER = [
  PAGE_ID.CREATE_TOKEN,
  PAGE_ID.CREATE_STAKING_POOL,
  PAGE_ID.STAKING_HISTORY,
];

export const onMapPageToName = (page: string) => {
  switch (page) {
    case PAGE_ID.CREATE_STAKING_POOL:
      return "Create Staking Pool";
    case PAGE_ID.STAKING:
      return "Staking";
    case PAGE_ID.STAKING_HISTORY:
      return "Staking History";
    case PAGE_ID.CREATE_TOKEN:
      return "Create Token";
    case PAGE_ID.MARKETS:
      return "Markets";
    case PAGE_ID.TOKEN:
      return "Token";
    default:
      return "";
  }
}
