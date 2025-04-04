import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { COOKIE } from '../common/constants/index';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  login(
    @Request() req: RequestWithUser,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.authService.login(req.user as JwtPayload);
    res.cookie('access_token', token.access_token, {
      httpOnly: COOKIE.HTTP_ONLY,
      secure: COOKIE.SECURE,
      sameSite: COOKIE.SAME_SITE,
      maxAge: COOKIE.MAX_AGE,
    });
    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  @Post('refresh')
  @ApiBody({ type: RefreshDto })
  refresh(@Body() { refreshToken }: RefreshDto) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
