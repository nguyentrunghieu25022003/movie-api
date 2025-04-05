import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoteMovieDto {
  @ApiProperty({ enum: ['like', 'dislike'] })
  @IsIn(['like', 'dislike'])
  status: 'like' | 'dislike';
}
