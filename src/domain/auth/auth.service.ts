import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRequestDTO } from './dto/request.dto';
import { UsersService } from './users/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(params: AuthRequestDTO): Promise<any> {
    const user = await this.usersService.findOne(params);
    if (user && user.password === params.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthRequestDTO) {
    return {
      access_token: await this.jwtService.sign(user),
      expires_in: 3600,
    };
  }
}
