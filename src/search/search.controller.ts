import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchMovieDto } from './dto/search-movie.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  search(@Query() searchMovieDto: SearchMovieDto) {
    return this.searchService.searchMovies(searchMovieDto);
  }
}
