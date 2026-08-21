import { Request } from 'express';
import { Role } from '../../../generated/prisma/client';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}
