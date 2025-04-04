import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ParamIdDto } from './dto/param-id.dto';
import { QueryMovieDto } from './dto/query-movie.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Movies')
@Controller('movies')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() queryMovieDto: QueryMovieDto) {
    return this.movieService.findAll(queryMovieDto);
  }

  @Get(':id')
  findOne(@Param() params: ParamIdDto) {
    return this.movieService.findOne(params.id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param() params: ParamIdDto, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(params.id, updateMovieDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param() params: ParamIdDto) {
    return this.movieService.remove(params.id);
  }

  @Get(':id/episodes')
  episodes(@Param() params: ParamIdDto) {
    return this.movieService.getEpisodes(params.id);
  }
}
