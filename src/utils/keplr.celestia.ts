const KeplrCelestiaConfig = {
  chainId: 'celestia',
  chainName: 'Celestia',
  rpc: 'https://rpc.lunaroasis.net/',
  rest: 'https://api.lunaroasis.net/',
  messageForSign: 'Are you a Modular Blockchain OG?'
};

export interface CelestiaAddress {
  bech32Address: string;
  algo: string;
  name: string;
  address: Buffer;
  pubKey: Buffer;
}

export interface CelestiaSignature {
  pub_key: {
    type: string,
    value: string,
  },
  signature: string,
}

const getKeplrProvider = () => (window as any)?.keplr;

const addOrSwitchToCelestia = async () => {
  const keplr = getKeplrProvider()
  if (!keplr) {
    window.open('https://www.keplr.app/download')
    throw new Error('Please install keplr extension')
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
  const signature = (await keplr.signArbitrary(
    KeplrCelestiaConfig.chainId,
    address.bech32Address,
    KeplrCelestiaConfig.messageForSign
  )) as CelestiaSignature;
  return {
    address,
    signature
  }
}

const keplrCelestiaHelper = {
  KeplrCelestiaConfig,
  addOrSwitchToCelestia,
  getKeplrProvider,
  signCelestiaMessage
};

export default keplrCelestiaHelper;
