import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OPERATIONTYPE, USERROLRTYPE } from 'src/enum';
import { ApiErrCode, ApiException } from '../exceptions/api.exception';
export class RoleInterceptor implements NestInterceptor {
  constructor(private readonly requiredRole: OPERATIONTYPE) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const { user } = context.switchToHttp().getRequest();
    user.opreration = user.opreration.split(',');
    if (user.role === USERROLRTYPE.ADMIN) {
      return next.handle();
    } else if (user.opreration.includes(this.requiredRole)) {
      return next.handle();
    }

    if (!user.opreration.includes(this.requiredRole)) {
      throw new ApiException(ApiErrCode.NO_PERMISSIN);
    }
    return next.handle();
  }
}
