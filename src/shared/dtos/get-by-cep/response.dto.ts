import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetByCepResponseDTO {
  @ApiProperty({
    description: 'Postal code',
    type: String,
  })
  @Expose({ name: 'cep' })
  postalCode: string;

  @ApiProperty({
    description: 'Street',
    type: String,
  })
  @Expose({ name: 'logradouro' })
  street: string;

  @ApiProperty({
    description: 'Complement',
    type: String,
  })
  @Expose({ name: 'complemento' })
  complement: string;

  @ApiProperty({
    description: 'District/Neighborhood',
    type: String,
  })
  @Expose({ name: 'bairro' })
  district: string;

  @ApiProperty({
    description: 'City',
    type: String,
  })
  @Expose({ name: 'localidade' })
  city: string;

  @ApiProperty({
    description: 'IBGE code',
    type: String,
  })
  @Expose()
  ibge: string;

  @ApiProperty({
    description: 'IBGE code',
    type: String,
  })
  @Expose()
  gia: string;

  @Expose()
  ddd: string;

  @Expose()
  siafi: string;
}
