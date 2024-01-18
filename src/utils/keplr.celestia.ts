const KeplrCelestiaConfig = {
  chainId: 'celestia',
  chainName: 'Celestia',
  rpc: 'https://rpc.lunaroasis.net/',
  rest: 'https://api.lunaroasis.net/'
};

export interface CelestiaAddress {
  bech32Address: string
}

const getKeplrProvider = () => (window as any)?.keplr;

const addOrSwitchToCelestia = async () => {
  const keplr = getKeplrProvider()
  if (!keplr) {
    alert("Please install keplr extension");
  } else {
    if (keplr.experimentalSuggestChain) {
      try {
        await keplr.experimentalSuggestChain({
          chainId: KeplrCelestiaConfig.chainId,
          chainName: KeplrCelestiaConfig.chainName,
          rpc: KeplrCelestiaConfig.rpc,
          rest: KeplrCelestiaConfig.rest,
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "celestia",
            bech32PrefixAccPub: "celestia" + "pub",
            bech32PrefixValAddr: "celestia" + "valoper",
            bech32PrefixValPub: "celestia" + "valoperpub",
            bech32PrefixConsAddr: "celestia" + "valcons",
            bech32PrefixConsPub: "celestia" + "valconspub",
          },
          currencies: [
            {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
            },
          ],
          feeCurrencies: [
            {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
              gasPriceStep: {
                low: 0.01,
                average: 0.02,
                high: 0.1,
              },
            },
          ],
          stakeCurrency: {
            coinDenom: "TIA",
            coinMinimalDenom: "utia",
            coinDecimals: 6,
            coinGeckoId: "celestia",
          },
        });
      } catch {
        alert("Failed to suggest the chain");
      }
    }
    const chainId = KeplrCelestiaConfig.chainId;
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether to allow access if they haven't visited this website.
    // Also, it will request that the user unlock the wallet if the wallet is locked.
    await keplr.enable(chainId);
  }
}

const signCelestiaMessage = async () => {
  const keplr = getKeplrProvider();
  await addOrSwitchToCelestia();
  const address = (await keplr.getKey(KeplrCelestiaConfig.chainId)) as CelestiaAddress;
  alert(address.bech32Address);
  const message = 'Are you a Celestia OG?'
  const signature = await keplr.signArbitrary(KeplrCelestiaConfig.chainId, address.bech32Address, message);
  console.log('SANG TEST: ', { signature, address, message, chainID: KeplrCelestiaConfig.chainId });
}

const keplrCelestiaHelper = {
  KeplrCelestiaConfig,
  addOrSwitchToCelestia,
  getKeplrProvider,
  signCelestiaMessage
};

export default keplrCelestiaHelper;
