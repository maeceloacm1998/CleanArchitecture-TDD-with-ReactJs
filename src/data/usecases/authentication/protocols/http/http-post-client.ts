// Interfaces com os protocolos HTTP.
export interface HttpPostClient {
  post(url: string): Promise<void>;
}
