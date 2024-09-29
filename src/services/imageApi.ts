import { SearchImageResponse } from "@/models";
import { gatewayClient } from "./http";

class ImageApiService {
  private apiClient = gatewayClient;

  async searchImages(keyword: string): Promise<SearchImageResponse> {
    return await this.apiClient.request<SearchImageResponse>(
      `/search/photos`,
      "get",
      {
        params: {
          query: keyword,
          per_page: 9,
        },
      }
    );
  }
}

export default new ImageApiService();
