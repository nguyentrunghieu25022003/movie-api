import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { MovieInHistory } from '../interfaces/movie-in-history.interface';

export class CreateHistoryDto implements MovieInHistory {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  origin_name: string;

  @IsOptional()
  @IsString()
  poster_url?: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsNumber()
  episode?: number;
}
