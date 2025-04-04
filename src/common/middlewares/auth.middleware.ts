import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ErrorMessages } from '../errors/error-message';
import { JWT } from '../constants/index';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = (req.cookies as { access_token?: string })?.access_token;

    if (!token) {
      throw ErrorMessages.UNAUTHORIZED;
    }

    try {
      const secret = JWT.SECRET_KEY;
      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = decoded;
      next();
    } catch {
      throw ErrorMessages.INVALID_TOKEN;
    }
  }
}
