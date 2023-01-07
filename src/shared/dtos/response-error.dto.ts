import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}

export class HttpResponseErrorDTO {
  @ApiProperty({
    description: 'Status code',
    type: String,
  })
  @Optional()
  @Expose()
  public statusCode?: number;

  @ApiProperty({
    description: 'Error message',
    type: String,
  })
  @Optional()
  @Expose()
  public message?: string;

  @ApiProperty({
    description: 'Path called',
    type: String,
  })
  @Optional()
  @Expose()
  public path?: string;

  @ApiProperty({
    description: 'Method called',
    type: String,
  })
  @Optional()
  @Expose()
  public method?: string;

  @ApiProperty({
    description: 'Time called',
    type: String,
  })
  @Optional()
  @Expose()
  public timeStamp?: Date;
}
