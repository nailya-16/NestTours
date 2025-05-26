import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private jwtService: JwtService) {
    console.log('userService run');
  }
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async sendUser(data: UserDto): Promise<User> {
    const userData = new this.userModel(data);
    return userData.save();
  }

  async updateUsers(id: string, body): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, body);
  }

  async deleteUsers(): Promise<any> {
    return this.userModel.deleteMany();
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, psw: string): Promise<User[] | null> {
    const usersArr = await this.userModel.find({login: login, psw: psw});
    return usersArr.length === 0 ? null : usersArr;
}

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({login: login});
  }

  async login(user: UserDto) {
    const payload = {login: user.login, psw: user.psw};
    const userFromDb = await this.userModel.find({login: user.login});
    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload),
    }
  }
}
