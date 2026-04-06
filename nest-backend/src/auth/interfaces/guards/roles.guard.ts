import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from 'src/shared/infrastructure/database/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const email = request.session?.email;

    if (!email) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.prismaService.account.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `You need one of these roles: ${requiredRoles.join(', ')}. Your role: ${user.role}`
      );
    }

    return true;
  }
}
