// src/common/errors/error-messages.ts
import { CustomHttpError } from './custom-http-error';

export class ErrorMessages {
  static readonly MOVIE_NOT_FOUND = new CustomHttpError(404, 'Not found');
  static readonly UNAUTHORIZED = new CustomHttpError(
    403,
    'Unauthorized access',
  );
  static readonly BAD_REQUEST = new CustomHttpError(400, 'Bad request');
  static readonly INVALID_TOKEN = new CustomHttpError(
    401,
    'Invalid or expired token',
  );
  static readonly FORBIDDEN_ROLE = new CustomHttpError(
    403,
    'Access denied for your role',
  );
}
