import CApiClient from "@/services/api/apiClient";

class CTokenomicsApi extends CApiClient {
  scanTx = async ({ tx_hash }: { tx_hash: string }) => {
    try {
      await this.api.get(`/scan-hash`, {
        params: { tx_hash },
      });
    } catch (error) {
      throw error;
    }
  };

  createToken = async ({ data_hex }: { data_hex: string }) => {
    try {
      await this.api.post(`/tokens/create`, {
        data_hex,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default CTokenomicsApi;
