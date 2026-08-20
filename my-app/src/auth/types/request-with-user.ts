import { Role } from '../../../generated/prisma/client';

export interface RequestWithUser {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}
