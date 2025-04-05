import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Main, MainSchema } from './schemas/movie.schema';
import { SearchController } from '../search/search.controller';
import { SearchService } from '../search/search.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Main.name, schema: MainSchema }]),
  ],
  controllers: [MovieController, SearchController],
  providers: [MovieService, SearchService],
  exports: [MovieService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MovieController);
  }
}
