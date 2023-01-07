import { HttpException, Injectable } from '@nestjs/common';

import { getData } from '#/shared/utils/translator';
import { ViaCepService } from '../viaCep.service';
import { GetByCepRequestDTO } from '#/shared/dtos/get-by-cep/request.dto';
import { GetByCepResponseDTO } from '#/shared/dtos/get-by-cep/response.dto';

@Injectable()
export class GetByCepService {
  constructor(private readonly viaCepService: ViaCepService) {}

  async get(data: GetByCepRequestDTO): Promise<GetByCepResponseDTO> {
    try {
      return await this.viaCepService.request<GetByCepResponseDTO>({
        method: 'get',
        url: `/ws/${data.postalCode}/json/`,
        data: getData(GetByCepRequestDTO, data),
      });
    } catch (error: any) {
      const status = error.response?.status ? error.response.status : 500;
      throw new HttpException({ status, message: error.response.data }, status);
    }
  }
}
