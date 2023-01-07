import { Users } from '#/infra/database/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRequestDTO } from '#/domain/auth/dto/request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  findOne(params: AuthRequestDTO): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        username: params.username,
        password: params.password,
      },
    });
  }
}
