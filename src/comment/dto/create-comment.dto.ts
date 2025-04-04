import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  text: string;
}
