import { getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { GenericResponseDTO } from '../dtos/generic-response.dto';

const dataTypes = {
  array: <T>(dataType: ClassConstructor<T>) => ({
    type: 'array',
    items: { $ref: getSchemaPath(dataType) },
  }),
  obj: <T>(dataType: ClassConstructor<T>) => ({
    $ref: getSchemaPath(dataType),
  }),
};

export const responseSchema = <T>(
  schemaType: 'obj' | 'array' | 'error',
  dataType?: ClassConstructor<T>
): {
  properties: {
    error?: any;
    data?: any;
  };
} => {
  return {
    properties:
      schemaType === 'error' ? { error: dataTypes.obj(GenericResponseDTO) } : { data: dataTypes[schemaType](dataType) },
  };
};
