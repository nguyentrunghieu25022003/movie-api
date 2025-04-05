import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        _id: { type: String, required: true },
        name: String,
        origin_name: String,
        poster_url: String,
        episode_current: String,
        slug: String,
        category: [String],
        country: [String],
        year: String,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  movie: Record<string, any>[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
