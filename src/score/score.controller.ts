import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('score')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class ScoreController {
  @Get()
  findAll() {
    return 'Hello';
  }
}
