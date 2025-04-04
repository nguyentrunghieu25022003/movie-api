import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CommentService } from './comment.service';
import { ParamIdDto } from './dto/param-id.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(RolesGuard)
@UseInterceptors(CacheInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('')
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  @Get('movies/:movieId')
  findAllByMovieId(@Param('movieId') movieId: string) {
    return this.commentService.findAllByMovieId(movieId);
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.commentService.findAllByUserId(userId);
  }

  @Put(':id')
  update(
    @Param() params: ParamIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(params.id, updateCommentDto.text);
  }

  @Delete(':id')
  remove(@Param() params: ParamIdDto) {
    return this.commentService.remove(params.id);
  }
}
