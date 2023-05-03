export type ApiLoggerCallback = (logLevel: string, logString: string) => void;

export type CompletionRequestMiddlewareType = (
  result?: any,
  e?: Error,
  status?: number
) => void;

export abstract class BaseRpc {
  protected readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000";
  }
}

export default BaseRpc;
