import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ _id: false })
export class MovieHistory {
  @Prop({ required: true })
  origin_name: string;

  @Prop()
  poster_url: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  time: string;

  @Prop()
  year: string;

  @Prop()
  episode: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;
}

const MovieHistorySchema = SchemaFactory.createForClass(MovieHistory);

@Schema({ timestamps: true })
export class History {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [MovieHistorySchema], default: [] })
  movieList: MovieHistory[];
}

export const HistorySchema = SchemaFactory.createForClass(History);
