import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '#/domain/guards/local-auth.guard';

import { AuthRequestDTO } from './dto/request.dto';
import { AuthResponseDTO } from './dto/response.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseSchema } from '#/shared/utils/response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Auth to acess api',
  })
  @ApiBody({ type: AuthRequestDTO })
  @ApiResponse({
    schema: responseSchema('obj', AuthResponseDTO),
    status: 200,
  })
  @ApiResponse({
    schema: responseSchema('error'),
  })
  async login(@Request() req): Promise<AuthResponseDTO> {
    return this.authService.login(req.user);
  }
}
