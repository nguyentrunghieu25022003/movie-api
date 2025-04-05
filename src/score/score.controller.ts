import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ScoreService } from './score.service';
import { VoteMovieDto } from './dto/vote-movie.dto';

@Controller('score')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('movies/:movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.scoreService.getScore(movieId);
  }

  @Post('vote/movies/:movieId/:userId')
  @ApiBody({ type: VoteMovieDto })
  vote(
    @Param('movieId') movieId: string,
    @Param('userId') userId: string,
    @Body() voteMovieDto: VoteMovieDto,
  ) {
    return this.scoreService.vote(movieId, userId, voteMovieDto.status);
  }
}
