import { USERROLRTYPE } from 'src/enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (roles: USERROLRTYPE[]) => SetMetadata(ROLES_KEY, roles);
