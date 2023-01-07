import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetByCepRequestDTO {
  @ApiProperty({
    description: 'Postal code',
    type: String,
  })
  @IsNotEmpty()
  @Expose()
  postalCode: string;
}
