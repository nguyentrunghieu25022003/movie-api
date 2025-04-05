import { Controller, Get, Param, Delete, Body, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { ParamIdDto } from './dto/param-id.dto';
import { MovieDto } from './dto/movie.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':userId')
  @ApiBody({ type: MovieDto })
  async addToFavorite(@Param() params: ParamIdDto, @Body() movie: MovieDto) {
    return this.favoriteService.addToFavorite(params.userId, movie);
  }
  @Get(':userId')
  findOne(@Param() params: ParamIdDto) {
    return this.favoriteService.findOne(params.userId);
  }

  @Delete(':userId')
  remove(@Param() params: ParamIdDto) {
    return this.favoriteService.remove(params.userId);
  }
}
