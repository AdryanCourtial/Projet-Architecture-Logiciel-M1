import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/compte/domain/value-object/role.value-object';
import { Roles as RolesValue } from 'src/compte/domain/value-object/role.value-object';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RolesValue[]) => SetMetadata(ROLES_KEY, roles);
