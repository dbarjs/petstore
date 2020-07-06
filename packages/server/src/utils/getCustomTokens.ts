import { Request, Response } from 'express';
import morgan from 'morgan';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

morgan.token('user-id', (request: Request, _response: Response): string => {
  try {
    const { authorization } = request.headers;
    if (authorization) {
      const [, token] = authorization?.split(' ');
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as TokenPayload;
      return sub;
    }
    return '';
  } catch {
    return '';
  }
});
