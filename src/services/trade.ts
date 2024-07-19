import { delay } from '@utils/helpers';
import CApiClient from '@/services/apiClient';
import { API_URL } from '@/config';

const DEFAULT_LIMIT_RETRY_SCAN = 5;

class CTradeAPI {
  private prefix = `${API_URL}/api`;

  private limitScanTX = DEFAULT_LIMIT_RETRY_SCAN;

  private apiClient = new CApiClient().api;

  private getUrl(url: string) {
    return `${this.prefix}/${url}`;
  }

  public scanTrxAlpha = async ({
    tx_hash,
  }: {
    tx_hash: string;
  }): Promise<any> => {
    try {
      const rs = await this.apiClient.get(
        this.getUrl(`sync/scan-transaction-hash`),
        {
          params: {
            tx_hash,
            network: 'rune',
          },
        },
      );
      this.limitScanTX = DEFAULT_LIMIT_RETRY_SCAN;
      return rs;
    } catch (e) {
      this.limitScanTX--;
      if (this.limitScanTX > 0) {
        delay(1000);
        await this.scanTrxAlpha({ tx_hash });
      }
      // throw e;
    }
  };

  public scanTrxStaking = async ({
     tx_hash,
   }: {
    tx_hash: string;
  }): Promise<any> => {
    try {
      const rs = await this.apiClient.get(
        this.getUrl(`sync/scan-staking-hash`),
        {
          params: {
            tx_hash,
            network: 'rune',
          },
        },
      );
      this.limitScanTX = DEFAULT_LIMIT_RETRY_SCAN;
      return rs;
    } catch (e) {
      this.limitScanTX--;
      if (this.limitScanTX > 0) {
        delay(1000);
        await this.scanTrxAlpha({ tx_hash });
      }
      // throw e;
    }
  };


  public scanNativeTrxAlpha = async ({
    tx_hash,
  }: {
    tx_hash: string;
  }): Promise<any> => {
    try {
      const rs = await this.apiClient.get(
        this.getUrl(`sync/scan-native-transaction-hash`),
        {
          params: {
            tx_hash,
            network: 'rune',
          },
        },
      );
      this.limitScanTX = DEFAULT_LIMIT_RETRY_SCAN;
      return rs;
    } catch (e) {
      this.limitScanTX--;
      if (this.limitScanTX > 0) {
        delay(1000);
        await this.scanNativeTrxAlpha({ tx_hash });
      }
      // throw e;
    }
  };
}

export default CTradeAPI;
