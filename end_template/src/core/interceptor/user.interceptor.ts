import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OPERATIONTYPE } from 'src/enum';
import { ApiErrCode, ApiException } from '../exceptions/api.exception';
export class RoleInterceptor implements NestInterceptor {
  constructor(private readonly requiredRole: OPERATIONTYPE) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const { user } = context.switchToHttp().getRequest();
    user.operationList = user?.operationList.split(',');
    if (user.operationList.includes(this.requiredRole)) {
      return next.handle();
    } else if (!user.operationList.includes(this.requiredRole)) {
      throw new ApiException(ApiErrCode.NO_PERMISSIN);
    }
  }
}
