import { router } from '..';
import { users } from '../../api/users';
import { User } from '../../api/users/types';

export const initUsersRoutes = () => {
  router.addRoute({ method: 'GET', url: 'api/users' }, () => users.getAll());
  router.addRoute({ method: 'GET', url: 'api/users/${userId}' }, ({ params }) => users.get(params));
  router.addRoute({ method: 'POST', url: 'api/users' }, ({ body }) => users.create(body as User));
  router.addRoute({ method: 'PUT', url: 'api/users/${userId}' }, ({ params, body }) =>
    users.update(params, body as User),
  );
  router.addRoute({ method: 'DELETE', url: 'api/users/${userId}' }, ({ params }) => users.delete(params));
};
