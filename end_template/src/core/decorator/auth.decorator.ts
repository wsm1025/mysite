import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../modules/auth/roles/roles.guard';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from '../../modules/auth/roles/roles.decorator';
import { USERROLRTYPE } from 'src/enum';

// applyDecorators 装饰器聚合  可以接受任意个装饰器，并且将它们应用于目标类或方法
export function Auth(roles: USERROLRTYPE[] = []) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiResponse({}),
    ApiUnauthorizedResponse({ description: '验证失败' }), // 返回401
    Roles(roles),
  );
}
