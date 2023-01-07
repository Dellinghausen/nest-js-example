import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Transform } from 'class-transformer';

export class GenericResponseDTO {
  @ApiProperty({
    description: 'Response status.',
    default: false,
    type: Boolean,
  })
  @Type(() => Boolean)
  @Expose()
  @Transform(({ value }) => value || false)
  success: boolean;

  @ApiProperty({
    description: 'Response sucess.',
    type: String,
  })
  @Expose()
  @Transform(({ value }) => value || '')
  message: string;
}
