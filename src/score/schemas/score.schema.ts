import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TotalScoreDocument = TotalScore & Document;

@Schema()
export class TotalScore {
  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true, default: 0 })
  voteQuantity: number;

  @Prop({ required: true, default: 0 })
  totalScore: number;
}

export const TotalScoreSchema = SchemaFactory.createForClass(TotalScore);
