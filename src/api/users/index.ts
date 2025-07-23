import { usersStorage } from './storage';
import { User } from './types';

class Users {
  public create(user: User) {
    const createdUser = usersStorage.create(user);

    return {
      statusCode: 200,
      message: JSON.stringify(createdUser),
    };
  }

  public update(id: string, user: User) {
    const updatedUser = usersStorage.update(id, user);

    return {
      statusCode: 200,
      message: JSON.stringify(updatedUser),
    };
  }

  public get(id: string) {
    const user = usersStorage.get(id);

    return {
      statusCode: 200,
      message: JSON.stringify(user),
    };
  }

  public getAll() {
    const users = usersStorage.getAll();

    return {
      statusCode: 200,
      message: JSON.stringify(users),
    };
  }

  public delete(id: string) {
    const isDeleted = usersStorage.delete(id);

    return {
      statusCode: 200,
      message: JSON.stringify(isDeleted),
    };
  }
}

export const users = new Users();
