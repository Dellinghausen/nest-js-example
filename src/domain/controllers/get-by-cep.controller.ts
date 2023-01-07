import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '#/domain/guards/jwt-auth.guard';
import { GetByCepRequestDTO } from '#/shared/dtos/get-by-cep/request.dto';
import { GetByCepResponseDTO } from '#/shared/dtos/get-by-cep/response.dto';
import { GetByCepService } from '#/infra/viaCep/services/get-by-cep.service';
import { getData } from '#/shared/utils/translator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseSchema } from '#/shared/utils/response';

@ApiTags('Consults')
@Controller('/consult-by-cep')
@ApiBearerAuth('JWT-AUTH')
export class GetByCepController {
  constructor(private readonly getByCepService: GetByCepService) {}

  @Get()
  @ApiOperation({
    summary: 'Consult address by CEP',
  })
  @ApiResponse({
    schema: responseSchema('obj', GetByCepResponseDTO),
    status: 200,
  })
  @ApiResponse({
    schema: responseSchema('error'),
  })
  @UseGuards(JwtAuthGuard)
  async list(@Query() param: GetByCepRequestDTO): Promise<GetByCepResponseDTO> {
    return getData(GetByCepResponseDTO, await this.getByCepService.get(getData(GetByCepRequestDTO, param)));
  }
}
