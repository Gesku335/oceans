import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { OrgRole } from '@ocean/shared';

/**
 * Guard that checks the current user is a member of the org specified
 * in the route param `orgId`. Attaches `orgMember` to the request.
 */
@Injectable()
export class OrgMemberGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { id: string } | undefined;
    if (!user) throw new ForbiddenException('Не авторизован');

    const orgId = req.params.orgId as string | undefined;
    if (!orgId) throw new ForbiddenException('orgId не указан');

    const member = await this.prisma.orgMember.findUnique({
      where: {
        orgId_userId: { orgId, userId: user.id },
      },
      include: { org: true },
    });

    if (!member) {
      throw new ForbiddenException('Вы не состоите в этой организации');
    }

    // Attach to request for downstream use
    req.orgMember = {
      orgId: member.orgId,
      userId: member.userId,
      role: member.role as OrgRole,
      org: member.org,
    };

    return true;
  }
}