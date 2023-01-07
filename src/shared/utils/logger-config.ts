import { ENVIRONMENT } from '#/settings';
import { LoggerModule } from 'nestjs-pino';
import { DynamicModule } from '@nestjs/common';
import { SensitiveInformationFilter } from './sensitive-information-filter';

export class Logger {
  public getConfig(): DynamicModule {
    return LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req(req) {
            req.body = filterLog(req.raw.body);
            return req;
          },
          res(res) {
            res.body = filterLog(res.raw.body);
            return res;
          },
        },
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: ENVIRONMENT !== 'production' ? true : false,
            minimumLevel: ENVIRONMENT !== 'production' ? 'debug' : 'info',
            translateTime: 'dd/mm/yyyy, h:MM:ss TT z',
          },
        },
      },
    });
  }
}

function filterLog(body: any): any {
  if (body) {
    const filter: SensitiveInformationFilter = new SensitiveInformationFilter();
    return filter.filter(body);
  } else {
    return body;
  }
}
