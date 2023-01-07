import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDTO {
  @ApiProperty({
    description: 'Username to acess API',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  username: string;

  @ApiProperty({
    description: 'Password to acess api',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  password: string;
}
