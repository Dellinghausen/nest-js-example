import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomHttpExceptionResponse, HttpExceptionResponse } from '../dtos/response-error.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as HttpExceptionResponse).message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Unknow internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    // const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.logger.error(errorMessage);
    // this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    message: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private readonly logger = new Logger();
}
