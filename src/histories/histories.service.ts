import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ErrorMessages } from '../common/errors/error-message';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}

  async find(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const results = await this.historyModel.findOne({ userId: userObjectId });

    if (!results) {
      throw ErrorMessages.NOT_FOUND;
    }

    return results;
  }

  async addToHistory(userId: string, movie: CreateHistoryDto) {
    const userObjectId = new Types.ObjectId(userId);
    let history = await this.historyModel.findOne({ userId: userObjectId });

    if (!history) {
      history = new this.historyModel({
        userId: userObjectId,
        movieList: [movie],
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      history.movieList.push(movie as any);
    }

    return history.save();
  }

  async clearHistory(userId: string) {
    const result = await this.historyModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { movieList: [] },
      { new: true },
    );

    if (!result) {
      throw ErrorMessages.NOT_FOUND;
    }

    return result;
  }
}
