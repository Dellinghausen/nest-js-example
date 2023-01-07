import { ClassConstructor, plainToClass } from 'class-transformer';

export const getData = <T>(dataType: ClassConstructor<T>, data: any): T => {
  return plainToClass(dataType, data, { excludeExtraneousValues: true });
};
