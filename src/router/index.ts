import { RequestParams, Response, Route, RouteHandler } from './types';

class Router {
  private routes = new Map<Route, RouteHandler>();

  public handle<T>(params: RequestParams): Response {
    const { url, method, body } = params;

    const urlParams = url.match(/.*\/([-0-9a-zA-Z]+)/)?.[1];
    const urlWithoutFirstSlash = url.substring(url.indexOf('/') + 1);

    const handleRoute = this.getHandler(method, urlWithoutFirstSlash, urlParams);

    if (!handleRoute) {
      return {
        statusCode: 404,
        message: 'Route not found',
      };
    }

    return handleRoute({ url: urlWithoutFirstSlash, method, body, params: urlParams });
  }

  public addRoute(route: Route, handler: RouteHandler) {
    this.routes.set(route, handler);
  }

  private getHandler(method: string, url: string, urlParams: string): RouteHandler {
    for (const [route, handler] of this.routes.entries()) {
      if (
        route.method === method &&
        ((urlParams && route.url.match(/.*\/\$\{([0-9a-zA-Z]+)\}$/)?.[1]) || route.url === url)
      ) {
        return handler;
      }
    }
  }
}

export const router = new Router();
