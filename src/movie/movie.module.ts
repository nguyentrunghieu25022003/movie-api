import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Main, MainSchema } from './schemas/movie.schema';
import { TotalScore, TotalScoreSchema } from '../score/schemas/score.schema';
import { SearchController } from '../search/search.controller';
import { SearchService } from '../search/search.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Main.name, schema: MainSchema }]),
    MongooseModule.forFeature([
      { name: TotalScore.name, schema: TotalScoreSchema },
    ]),
  ],
  controllers: [MovieController, SearchController],
  providers: [MovieService, SearchService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MovieController);
  }
}
