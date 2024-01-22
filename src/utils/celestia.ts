const CelestiaConfig = {
  chainId: 'celestia',
  chainName: 'Celestia',
  rpc: 'https://rpc.lunaroasis.net/',
  rest: 'https://api.lunaroasis.net/',
  messageForSign: 'Are you a Modular Blockchain Pioneer?'
};

export enum ModularType {
  kelpr,
  leap
}

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
const getLeapProvider = () => {
  const provider = (window as any)?.leap;
  if (!provider) {
    window.open('https://www.leapwallet.io/#inpage-download')
    throw new Error('Please install leap extension')
  }
  return provider;
};

const addOrSwitchToCelestia = async () => {
  const keplr = getKeplrProvider()
  if (!keplr) {
    window.open('https://www.keplr.app/download')
    throw new Error('Please install keplr extension')
  } else {
    if (keplr.experimentalSuggestChain) {
      try {
        await keplr.experimentalSuggestChain({
          chainId: CelestiaConfig.chainId,
          chainName: CelestiaConfig.chainName,
          rpc: CelestiaConfig.rpc,
          rest: CelestiaConfig.rest,
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
    const chainId = CelestiaConfig.chainId;
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether to allow access if they haven't visited this website.
    // Also, it will request that the user unlock the wallet if the wallet is locked.
    await keplr.enable(chainId);
  }
}

const signCelestiaMessage = async (type: ModularType) => {
  let provider = undefined;

  switch (type) {
    case ModularType.kelpr:
      provider = getKeplrProvider();
      await addOrSwitchToCelestia();
      break;
    case ModularType.leap:
      provider = getLeapProvider()
      break;
  }

  if (!provider) throw Error("Please install wallet.");

  const address = (await provider.getKey(CelestiaConfig.chainId)) as CelestiaAddress;

  const signature = (await provider.signArbitrary(
    CelestiaConfig.chainId,
    address.bech32Address,
    CelestiaConfig.messageForSign
  )) as CelestiaSignature;

  return {
    address,
    signature
  }
}

const celestiaHelper = {
  CelestiaConfig,
  addOrSwitchToCelestia,
  getKeplrProvider,
  getLeapProvider,
  signCelestiaMessage,
};

export default celestiaHelper;
