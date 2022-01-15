// Interfaces com os protocolos HTTP.

export type HttpPostParams = {
  url: string;
  body?: object;
}
export interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}
