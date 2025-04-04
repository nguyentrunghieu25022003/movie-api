import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userObj = user.toObject() as User;
        const { password, ...result } = userObj;
        return result;
      }
    }

    return null;
  }

  login(user: JwtPayload) {
    const payload = { email: user.email, sub: user.sub, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub, role: payload.role },
        { expiresIn: '15m' },
      );
      return { accessToken: newAccessToken };
    } catch {
      throw ErrorMessages.INVALID_TOKEN;
    }
  }
}
