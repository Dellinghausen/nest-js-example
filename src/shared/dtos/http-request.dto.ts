export interface HttpRequestDTO {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  params?: unknown;
  data?: unknown;
  headers?: Record<string, string>;
}
