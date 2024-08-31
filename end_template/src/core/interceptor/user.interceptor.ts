import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoleEnum } from '../../modules/user/entities/user.entity';
import { ApiErrCode, ApiException } from '../exceptions/api.exception';

export class RoleInterceptor implements NestInterceptor {
  constructor(private readonly requiredRole: UserRoleEnum) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role === UserRoleEnum.ADMIN) {
      return next.handle();
    }
    if (user.role !== this.requiredRole) {
      throw new ApiException(ApiErrCode.NO_PERMISSIN);
    }
    return next.handle();
  }
}
