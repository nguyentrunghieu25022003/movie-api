import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Main, MainDocument } from '../movie/schemas/movie.schema';
import { SearchMovieDto } from './dto/search-movie.dto';
import { buildSortQuery } from '../common/helpers/sort.helper';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Main.name) private movieModel: Model<MainDocument>,
  ) {}

  async searchMovies(filters: SearchMovieDto) {
    const skip = (filters.page - 1) * filters.limit;

    const query: Record<string, any> = {};

    if (filters.keyword) {
      query.$or = [
        { 'movie.name': { $regex: filters.keyword, $options: 'i' } },
        { 'movie.origin_name': { $regex: filters.keyword, $options: 'i' } },
      ];
    }

    if (filters.actor) {
      query['movie.actor'] = filters.actor;
    }

    if (filters.year) {
      query['movie.year'] = +filters.year;
    }

    const sortQuery = buildSortQuery(filters.sort_field, filters.sort_order);

    const [results, total] = await Promise.all([
      this.movieModel
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(filters.limit)
        .exec(),
      this.movieModel.countDocuments(query),
    ]);

    return {
      total: total,
      results: results,
    };
  }
}
