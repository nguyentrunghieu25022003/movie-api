import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MainDocument = Main & Document;

// -------------------- EpisodeItem --------------------
@Schema({ _id: false })
export class EpisodeItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  link_embed: string;

  @Prop({ required: true })
  link_m3u8: string;
}
export const EpisodeItemSchema = SchemaFactory.createForClass(EpisodeItem);

// -------------------- Episode --------------------
@Schema({ _id: false })
export class Episode {
  @Prop({ required: true })
  server_name: string;

  @Prop({ type: [EpisodeItemSchema], required: true })
  server_data: EpisodeItem[];
}
export const EpisodeSchema = SchemaFactory.createForClass(Episode);

// -------------------- Category --------------------
@Schema({ _id: false })
export class Category {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

// -------------------- Country --------------------
@Schema({ _id: false })
export class Country {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;
}
export const CountrySchema = SchemaFactory.createForClass(Country);

// -------------------- TimeWrapper --------------------
@Schema({ _id: false })
export class TimeWrapper {
  @Prop({ required: true })
  time: Date;
}
export const TimeWrapperSchema = SchemaFactory.createForClass(TimeWrapper);

// -------------------- Movie --------------------
@Schema()
export class Movie {
  @Prop({
    type: TimeWrapperSchema,
    required: true,
    default: () => ({ time: new Date() }),
  })
  created: TimeWrapper;

  @Prop({
    type: TimeWrapperSchema,
    required: true,
    default: () => ({ time: new Date() }),
  })
  modified: TimeWrapper;

  @Prop({ required: true, default: () => new Types.ObjectId().toHexString() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  origin_name: string;

  @Prop()
  content: string;

  @Prop()
  type: string;

  @Prop()
  status: string;

  @Prop()
  poster_url: string;

  @Prop()
  thumb_url: string;

  @Prop({ default: false })
  is_copyright: boolean;

  @Prop({ default: false })
  sub_docquyen: boolean;

  @Prop({ default: false })
  chieurap: boolean;

  @Prop()
  trailer_url: string;

  @Prop()
  time: string;

  @Prop()
  episode_current: string;

  @Prop()
  episode_total: string;

  @Prop()
  quality: string;

  @Prop()
  lang: string;

  @Prop()
  notify: string;

  @Prop()
  showtimes: string;

  @Prop()
  year: number;

  @Prop()
  view: number;

  @Prop({ type: [String], default: [] })
  actor: string[];

  @Prop({ type: [String], default: [] })
  director: string[];

  @Prop({ type: [CategorySchema], default: [] })
  category: Category[];

  @Prop({ type: [CountrySchema], default: [] })
  country: Country[];
}
export const MovieSchema = SchemaFactory.createForClass(Movie);

// -------------------- Main --------------------
@Schema({ collection: 'movies' })
export class Main {
  @Prop({ required: true })
  status: boolean;

  @Prop()
  msg: string;

  @Prop({ type: MovieSchema, required: true })
  movie: Movie;

  @Prop({ type: [EpisodeSchema], required: true })
  episodes: Episode[];
}
export const MainSchema = SchemaFactory.createForClass(Main);
