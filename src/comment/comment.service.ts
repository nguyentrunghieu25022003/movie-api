import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { ErrorMessages } from '../common/errors/error-message';
import { CreateCommentDto } from './dto/create-comment.dto';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const created = new this.commentModel(createCommentDto);
    return created.save();
  }

  async findAllByMovieId(id: string) {
    const result = await this.commentModel
      .find({ movieId: new Types.ObjectId(id) })
      .exec();

    if (!result) {
      throw ErrorMessages.MOVIE_NOT_FOUND;
    }

    return result;
  }

  async findAllByUserId(id: string) {
    const result = await this.commentModel
      .find({ userId: new Types.ObjectId(id) })
      .exec();

    if (!result) {
      throw ErrorMessages.MOVIE_NOT_FOUND;
    }

    return result;
  }

  async update(id: string, text: string) {
    const updated = await this.commentModel.findByIdAndUpdate(
      id,
      { text: text },
      { new: true },
    );
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.commentModel.findByIdAndDelete(id);
    return { message: 'Comment deleted successfully' };
  }
}
