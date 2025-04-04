import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TotalScore, TotalScoreDocument } from '../score/schemas/score.schema';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(TotalScore.name) private totalScore: Model<TotalScoreDocument>,
  ) {}

  async getScore(id: string) {
    const result = await this.totalScore
      .findOne({ movieId: new Types.ObjectId(id) })
      .exec();

    if (!result) {
      throw ErrorMessages.MOVIE_NOT_FOUND;
    }

    return {
      score: result,
    };
  }
}
