// src/auth/guards/owner-or-admin.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { RequestWithUser } from '../types/request-with-user';
import { Role } from '../../../generated/prisma/client';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const targetId = request.params.id; // lấy :id từ URL

    if (!user) {
      throw new ForbiddenException('Không xác định được người dùng');
    }

    const isAdmin = user.role === Role.ADMIN;
    const isOwner = user.id === targetId;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException(
        'Bạn không có quyền thực hiện hành động này',
      );
    }

    return true;
  }
}
