import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Movie', required: true })
  userId: string;

  @Prop({ required: true })
  avatarUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Movie', required: true })
  movieId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
