import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ParamIdDto } from './dto/param-id.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  findAll(@Param() params: ParamIdDto) {
    return this.notificationService.findAll(params.userId);
  }
}
