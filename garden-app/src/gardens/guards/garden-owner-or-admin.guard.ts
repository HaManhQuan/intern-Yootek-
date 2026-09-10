import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/auth/types/request-with-user';
@Injectable()
export class GardenOwnerOrAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const targetId = request.params.id as string;
    const garden = await this.prisma.garden.findUnique({
      where: { id: targetId },
    });
    return (
      garden?.userId === request.user!.id || request.user!.role === Role.ADMIN
    );
  }
}
