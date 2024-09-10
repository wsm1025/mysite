import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response 对象
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Database query failed' };
    // 获取路由参数
    const method = request.method; // HTTP 方法
    const url = request.url; // 请求的 URL
    const params = request.params; // 路由参数
    const query = request.query; // 查询参数
    const body = request.body; // 请求体
    // 记录日志
    this.logger.error(
      `HTTP Status: ${status} Error Message: ${
        exception instanceof HttpException ? exception.message : exception
      }`,
    );
    this.logger.error(
      `Request Method: ${method}, URL: ${url}, Route Params: ${JSON.stringify(
        params,
      )}, Query Params: ${JSON.stringify(
        query,
      )}, Request Body: ${JSON.stringify(body)}`,
    );
    if (exception instanceof HttpException && exception.stack) {
      this.logger.error(`Stack Trace: ${exception.stack}`);
    } else if (exception instanceof QueryFailedError) {
      this.logger.error(`Query Failed Error: ${exception.message}`);
    }

    // 处理异常响应
    if (exception instanceof ApiException) {
      // 业务 API 异常
      response.status(status).json({
        code: exception.getErrCode(),
        msg: exception.getErrMsg(),
      });
    } else if (exception instanceof UnauthorizedException) {
      // 授权异常 未登录
      response.status(status).json({
        code: status,
        msg:
          exceptionResponse.message === 'Unauthorized'
            ? '请登录'
            : exceptionResponse.message,
      });
    } else if (exception instanceof ForbiddenException) {
      // 授权异常 无权限
      response.status(status).json({
        code: status,
        msg:
          exceptionResponse.message === 'Forbidden resource'
            ? '当前用户没有权限'
            : exceptionResponse.message,
      });
    } else if (exception instanceof QueryFailedError) {
      // 数据库查询失败
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: `数据库查询失败，请稍后重试`,
      });
    } else {
      // 其他异常
      response.status(status).json({
        code: status,
        msg:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : exceptionResponse.message?.join(',') || exception.message,
      });
    }
  }
}
