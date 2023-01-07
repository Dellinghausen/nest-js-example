import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { AuthResponseDTO } from './domain/auth/dto/response.dto';
import { GenericResponseDTO } from './shared/dtos/generic-response.dto';
import { GetByCepResponseDTO } from './shared/dtos/get-by-cep/response.dto';
import { HttpResponseErrorDTO } from './shared/dtos/response-error.dto';

@Controller()
// To load general dtos on swagger
@ApiExtraModels(GenericResponseDTO, GetByCepResponseDTO, AuthResponseDTO, HttpResponseErrorDTO)
export class AppController {
  @Get()
  async healthcheck() {
    return { data: 'OK' };
  }
}
