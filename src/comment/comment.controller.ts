import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('comments')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class CommentController {
  @Get()
  findAll() {
    return 'Hello';
  }
}
