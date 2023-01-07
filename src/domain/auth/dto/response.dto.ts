import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthResponseDTO {
  @ApiProperty({
    description: 'Acess token',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  access_token: string;

  @ApiProperty({
    description: 'Time to expire in miliseconds',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Expose()
  expires_in: number;
}
