export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestParams = {
  url: string;
  method: HTTPMethod | string;
  body: Record<string, unknown>;
  params?: string;
};

export type Response = {
  statusCode: number;
  message: string;
};

export type Route = Pick<RequestParams, 'url' | 'method'>;

export type RouteHandler = (payload: RequestParams) => Response;
