import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HttpRequestDTO } from '#/shared/dtos/http-request.dto';
import { LoginResponseDTO } from '#/shared/dtos/login/response.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // IF NEED AUTH
  // async interceptorLogin(): Promise<void> {
  //   let token = await this.cacheManager.get('authToken');
  // //   if (!token) {
  //     const response = this.httpService.request<LoginResponseDTO>({
  //       method: 'post',
  //       url: '/oauth/access-token',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         // Authorization: `Basic ${BASIC_TOKEN}`,
  //       },
  //       params: {
  //         grant_type: 'client_credentials',
  //       },
  //     });
  //     const result = await response.toPromise();
  //     token = result.data.access_token;
  //     await this.cacheManager.set('authToken', token, { ttl: 3600 });
  //   }

  //   this.httpService.axiosRef.defaults.headers = {
  //     ...this.httpService.axiosRef.defaults.headers,
  //     access_token: token,
  //   };
  // }

  async request<T>(definitions: HttpRequestDTO): Promise<T> {
    // await this.interceptorLogin();
    const response = await this.httpService.request(definitions).toPromise();
    return response.data;
  }
}
