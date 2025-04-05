import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Main, MainDocument } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';
import { buildSortQuery } from '../common/helpers/sort';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Main.name) private movieModel: Model<MainDocument>,
  ) {}

  isExist(id: string) {
    return this.movieModel.findById(id).exec();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Main> {
    const main = new this.movieModel({
      status: true,
      msg: '',
      movie: createMovieDto,
      episodes: [],
    });
    return main.save();
  }

  async findAll(queryMovieDto: QueryMovieDto): Promise<{
    total: number;
    data: Main[];
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (queryMovieDto.page - 1) * queryMovieDto.limit;
    const sortQuery = buildSortQuery(
      queryMovieDto.sort_field,
      queryMovieDto.sort_order,
    );
    const [results, total] = await Promise.all([
      this.movieModel
        .find()
        .sort(sortQuery)
        .skip(skip)
        .limit(queryMovieDto.limit)
        .exec(),
      this.movieModel.countDocuments(),
    ]);

    const objData = {
      total,
      page: queryMovieDto.page,
      limit: queryMovieDto.limit,
      totalPages: Math.ceil(total / queryMovieDto.limit),
      data: results,
    };

    return objData;
  }

  async findOne(id: string) {
    const result = await this.movieModel.findById(id).exec();

    if (!result) {
      throw ErrorMessages.NOT_FOUND;
    }

    return {
      data: result,
    };
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const updated = await this.movieModel
      .findByIdAndUpdate(id, { movie: updateMovieDto }, { new: true })
      .exec();

    if (!updated) {
      throw ErrorMessages.NOT_FOUND;
    }

    return {
      data: updated,
    };
  }

  async remove(id: string) {
    const deleted = await this.movieModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw ErrorMessages.NOT_FOUND;
    }

    return {
      message: 'Movie deleted successfully',
    };
  }

  async getEpisodes(id: string) {
    const result = await this.movieModel.findById(id).exec();

    if (!result) {
      throw ErrorMessages.NOT_FOUND;
    }

    return {
      episodes: result.episodes,
    };
  }
}
