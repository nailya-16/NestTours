import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers(): string {
    return 'all users';
  }

  @Get(':id')
  getUserById(@Param() param): string {
    return 'user id is ' + param.id;
  }

  @Post()
  sendUser(): string {
    return 'user post data';
  }
  @Put()
  updateUsers(): string {
    return 'user put data';
  }

  @Delete()
  deleteUsers(): string {
    return 'all user delete date';
  }

  @Delete(':id')
  deleteUserById(@Param() param): string {
    return 'user delete is ' + param.id;
  }
}
