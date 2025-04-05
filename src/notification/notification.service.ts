import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorMessages } from '../common/errors/error-message';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private gateway: NotificationGateway,
  ) {}

  async findAll(id: string) {
    const results = await this.notificationModel.findOne({
      userId: new Types.ObjectId(id),
    });

    if (!results) {
      throw ErrorMessages.NOT_FOUND;
    }

    return results;
  }

  async pushNotification(userId: string, message: any) {
    const userObjectId = new Types.ObjectId(userId);
    const notification = await this.notificationModel.findOneAndUpdate(
      { userId: userObjectId },
      { $push: { messages: message } },
      { upsert: true, new: true },
    );

    this.gateway.sendNotification(userId, message);

    return notification;
  }
}
