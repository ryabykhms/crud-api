type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestParams<T> = {
  url: string;
  method: HTTPMethod | string;
  body: T;
};

type Response = {
  statusCode: number;
  message: string;
};

type RouteHandler = (payload: any) => Response; // TODO: change payload type

class Router {
  public handle<T>(params: RequestParams<T>): Response {
    const { url, method, body } = params;
    const handleRoute = this.getHandler(method, url);

    if (!handleRoute) {
      return {
        statusCode: 404,
        message: 'Route not found', // TODO: change message
      };
    }

    handleRoute({ url, method, body });
  }

  // TODO: implement
  private getHandler(method: string, url: string): RouteHandler {
    return;
  }
}

export const router = new Router();
