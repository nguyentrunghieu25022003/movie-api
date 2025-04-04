import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TotalScore, TotalScoreSchema } from './schemas/score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TotalScore.name, schema: TotalScoreSchema },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
