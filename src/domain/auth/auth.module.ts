import { Users } from '#/infra/database/entities/users.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { jwtConstants } from './constants/constants';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { UsersService } from './users/users.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UsersService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
