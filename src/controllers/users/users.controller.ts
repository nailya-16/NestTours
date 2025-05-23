import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../schemas/user";
import {UserDto} from "../../dto/user-dto";
import { AuthGuard } from '@nestjs/passport';
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
    sendUser(@Body() data: UserDto): Promise<User> {
      return this.userService.checkRegUser(data.login).then((queryRes: User[]) => {
        console.log('data reg', queryRes);
        if (queryRes.length === 0) {
          return this.userService.sendUser(data);
        } else {
            console.log('err - user already exists');
              throw new HttpException({
                status: HttpStatus.CONFLICT,
                errorText: 'Пользователь уже зарегистрирован',
              }, HttpStatus.CONFLICT);
          }
      });
       
    }
    
    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body() data: UserDto, @Param('login') login): any{
      return this.userService.login(data);
 
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
