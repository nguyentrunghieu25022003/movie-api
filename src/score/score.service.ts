import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TotalScore, TotalScoreDocument } from '../score/schemas/score.schema';
import { ErrorMessages } from '../common/errors/error-message';
import { NotificationService } from '../notification/notification.service';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(TotalScore.name) private scoreModel: Model<TotalScoreDocument>,
    private readonly notificationService: NotificationService,
    private readonly movieService: MovieService,
  ) {}

  async getScore(id: string) {
    const result = await this.scoreModel
      .findOne({ movieId: new Types.ObjectId(id) })
      .exec();

    if (!result) {
      throw ErrorMessages.NOT_FOUND;
    }

    return {
      score: result,
    };
  }

  async vote(
    movieId: string,
    userId: string,
    status: 'like' | 'dislike',
  ): Promise<any> {
    const score = await this.scoreModel.findOne({ movieId });
    const data = await this.movieService.isExist(movieId);
    const point = status === 'like' ? 10 : -10;

    let result;

    if (!score) {
      result = await this.scoreModel.create({
        movieId,
        voteQuantity: 1,
        totalScore: point,
      });
    } else {
      score.voteQuantity += 1;
      score.totalScore += point;
      result = await score.save();
    }

    await this.notificationService.pushNotification(userId, {
      poster_url: data?.movie.poster_url,
      slug: data?.movie.slug,
      message: `You just expressed your feelings`,
      timestamp: new Date(),
      status: 'unread',
    });

    return result;
  }
}
