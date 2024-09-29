import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
  private gateway: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_URL,
  });

  constructor() {
    this.gateway.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Client-ID ${
        import.meta.env.VITE_ACCESS_KEY
      }`;
      config.headers["Accept-Version"] = "v1";
      return config;
    });
  }

  async request<T>(
    url: string,
    method: "get" | "post" | "put" | "delete" = "get",
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await this.gateway[method](url, data, config);
      return response.data as T;
    } catch (error: unknown) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): AxiosError {
    return error;
  }
}
export const gatewayClient = new ApiClient();
