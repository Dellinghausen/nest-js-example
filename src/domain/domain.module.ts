import { Module } from '@nestjs/common';

import { AuthService } from './auth/auth.service';

import { AuthModule } from './auth/auth.module';
import { GetByCepController } from './controllers/get-by-cep.controller';
import { ViaCepModule } from '#/infra/viaCep/viaCep.module';

@Module({
  imports: [AuthModule, ViaCepModule],
  controllers: [GetByCepController],
  providers: [AuthService],
})
export class DomainModule {}
