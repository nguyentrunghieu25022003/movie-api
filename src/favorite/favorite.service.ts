import { Injectable } from '@nestjs/common';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorMessages } from '../common/errors/error-message';
import { FavoriteMovie } from './interfaces/movie-favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async addToFavorite(userId: string, movie: FavoriteMovie) {
    const userObjectId = new Types.ObjectId(userId);
    let favorite = await this.favoriteModel.findOne({ userId: userObjectId });

    const newMovie: FavoriteMovie = {
      ...movie,
      addedAt: new Date(),
    };

    if (!favorite) {
      favorite = new this.favoriteModel({
        userId: userObjectId,
        movie: [newMovie],
      });
    } else {
      const movies = favorite.movie as FavoriteMovie[];

      const index = movies.findIndex((m: FavoriteMovie) => m._id === movie._id);

      if (index === -1) {
        movies.push(newMovie);
      } else {
        const old = movies[index];
        movies[index] = { ...old, ...movie, addedAt: old.addedAt };
      }

      favorite.movie = movies;
    }

    return favorite.save();
  }

  async findOne(id: string) {
    const results = await this.favoriteModel.findOne({
      userId: new Types.ObjectId(id),
    });

    if (!results) {
      throw ErrorMessages.NOT_FOUND;
    }
    return results;
  }

  remove(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
