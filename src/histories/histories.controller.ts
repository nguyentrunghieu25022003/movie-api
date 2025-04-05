import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoriesService } from './histories.service';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historyService: HistoriesService) {}

  @Get(':userId')
  find(@Param('userId') userId: string) {
    return this.historyService.find(userId);
  }

  @Post(':userId')
  addToHistory(
    @Param('userId') userId: string,
    @Body() movie: CreateHistoryDto,
  ) {
    return this.historyService.addToHistory(userId, movie);
  }

  @Delete(':userId')
  clearHistory(@Param('userId') userId: string) {
    return this.historyService.clearHistory(userId);
  }
}
