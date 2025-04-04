import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CrawlerService } from './crawler.service';
import { QueryMovieDto } from './dto/query-movie.dto';
import { GetMovieDto } from './dto/get-movie-detail.dto';

@Controller('')
@UseInterceptors(CacheInterceptor)
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}
  @Get('kkphim')
  findAll(@Query() queryMovieDto: QueryMovieDto) {
    return this.crawlerService.findAll(queryMovieDto.page);
  }

  @Get('kkphim/:name')
  findOne(@Param() getMovieDto: GetMovieDto) {
    return this.crawlerService.findOne(getMovieDto.name);
  }
}
