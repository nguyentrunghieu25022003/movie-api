import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ScoreService } from './score.service';

@Controller('score')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('movies/:movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.scoreService.getScore(movieId);
  }
}
