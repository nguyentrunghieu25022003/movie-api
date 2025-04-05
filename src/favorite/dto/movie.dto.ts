// favorite/dto/movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class MovieDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  origin_name: string;

  @ApiProperty()
  @IsString()
  poster_url: string;

  @ApiProperty()
  @IsString()
  episode_current: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsArray()
  category: string[];

  @ApiProperty()
  @IsArray()
  country: string[];

  @ApiProperty()
  @IsString()
  year: string;
}
