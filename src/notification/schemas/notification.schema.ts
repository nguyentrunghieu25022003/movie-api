import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ _id: false })
export class Message {
  @Prop({ required: true })
  poster_url: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: () => new Date() })
  timestamp: Date;

  @Prop({ default: 'unread', enum: ['read', 'unread'] })
  status: 'read' | 'unread';
}

@Schema()
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: [Message], default: [] })
  messages: Message[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
