import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers(): string {
    return 'service all users';
  }

  getUserById(id: string): string {
    return 'service user id is ' + id;
  }

  sendUser(): string {
    return 'service user post data';
  }

  updateUsers(): string {
    return 'service user put data';
  }

  deleteUsers(): string {
    return 'service all user delete date';
  }

  deleteUserById(id: string): string {
    return 'service user delete is ' + id;
  }
}
