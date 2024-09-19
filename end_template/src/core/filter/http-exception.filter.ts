import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
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
      // 数据库失败
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: `数据库操作失败，请稍后重试,${exception.message}`,
      });
    } else {
      // 其他异常
      response.status(status).json({
        code: status,
        msg:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message.join(',')
            : exceptionResponse.message || exception.message,
      });
    }
  }
}
