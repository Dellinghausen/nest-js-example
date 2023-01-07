import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { DomainModule } from '#/domain/domain.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } from './settings';
import { Logger } from './shared/utils/logger-config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/utils/all-exception.filter';

const logger: Logger = new Logger();

@Module({
  imports: [
    DomainModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: TYPEORM_HOST,
      port: TYPEORM_PORT ? parseInt(TYPEORM_PORT) : 5432,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      autoLoadEntities: true,
    }),
    logger.getConfig(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
