import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

class UsersStorage {
  private users = new Map<string, User>();

  public create(user: User): User {
    const id = uuidv4();
    const newUser = { ...user, id };
    this.users.set(id, newUser);

    return newUser;
  }

  public update(id: string, user: Partial<User>): User {
    const oldUser = this.users.get(id);
    const newUser = { ...oldUser, ...user, hobbies: [...oldUser.hobbies, ...(user.hobbies || [])] };
    this.users.set(id, newUser);

    return newUser;
  }

  public get(id: string): User {
    return this.users.get(id);
  }

  public getAll(): User[] {
    return Array.from(this.users.values());
  }

  public delete(id: string): boolean {
    return this.users.delete(id);
  }
}

export const usersStorage = new UsersStorage();
