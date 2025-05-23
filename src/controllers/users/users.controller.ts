import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../schemas/user";
import {UserDto} from "../../dto/user-dto";
//import RejectedValue = jest.RejectedValue;
 
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
 
 
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
 
 
    @Get(":id")
    async getUserById(@Param('id') id): Promise<User | null> {
        return this.userService.getUserById(id);
    }
 
    @Post()
    async sendUser(@Body() data: UserDto): Promise<User> {
 
      const queryRes = await this.userService.checkRegUser (data.login);
      console.log('data reg', queryRes);
      if (queryRes.length === 0) {
          return this.userService.sendUser (data);
      } else {
          console.log('err - user already exists');
          throw new Error('User  already exists');
      }
 
    }
 
    @Post(":login")
    async authUser(@Body() data: UserDto, @Param('login') login: string): Promise<User | boolean>  {
      const queryRes = await this.userService.checkAuthUser (login, data.psw);
      if (queryRes.length !== 0) {
          return true;
      } else {
          console.log('err - authentication failed');
          throw new Error('Authentication failed');
      }
 
    }
 
    @Put(":id")
    async updateUsers(@Param('id') id: string, @Body() data) : Promise<User | null> {
        return this.userService.updateUsers(id, data);
    }
 
    @Delete()
    deleteUsers(): Promise<User> {
        return this.userService.deleteUsers();
    }
 
 
    @Delete(":id")
    async deleteUserById(@Param('id') id): Promise<User | null> {
        return this.userService.deleteUserById(id);
    }
 
}
