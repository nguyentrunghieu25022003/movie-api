// src/movie/dto/create-movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}

class CountryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}

export class CreateMovieDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  origin_name: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  poster_url: string;

  @ApiProperty()
  thumb_url: string;

  @ApiProperty()
  is_copyright: boolean;

  @ApiProperty()
  sub_docquyen: boolean;

  @ApiProperty()
  chieurap: boolean;

  @ApiProperty()
  trailer_url: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  episode_current: string;

  @ApiProperty()
  episode_total: string;

  @ApiProperty()
  quality: string;

  @ApiProperty()
  lang: string;

  @ApiProperty()
  notify: string;

  @ApiProperty()
  showtimes: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ type: [String] })
  actor: string[];

  @ApiProperty({ type: [String] })
  director: string[];

  @ApiProperty({ type: [CategoryDto] })
  category: CategoryDto[];

  @ApiProperty({ type: [CountryDto] })
  country: CountryDto[];
}
