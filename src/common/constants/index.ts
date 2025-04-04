export const JWT = {
  ACCESS_TOKEN_COOKIE: 'access_token',
  SECRET_KEY: process.env.JWT_SECRET_KEY || 'defaultSecret',
  EXPIRES_IN: '1h',
};

export const COOKIE = {
  MAX_AGE: 1000 * 60 * 60,
  HTTP_ONLY: true,
  SECURE: process.env.NODE_ENV === 'production',
  SAME_SITE: 'lax' as const,
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const HEADERS = {
  AUTHORIZATION: 'authorization',
};

export const API_PREFIX = '/api';
