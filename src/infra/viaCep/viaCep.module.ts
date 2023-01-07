import { VIA_CEP_URL } from '#/settings';
import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetByCepService } from './services/get-by-cep.service';
import { ViaCepService } from './viaCep.service';

const services = [GetByCepService];

@Module({
  imports: [
    HttpModule.register({
      baseURL: VIA_CEP_URL,
    }),
    CacheModule.register(),
  ],
  providers: [ViaCepService, ...services],
  exports: services,
})
export class ViaCepModule {}
