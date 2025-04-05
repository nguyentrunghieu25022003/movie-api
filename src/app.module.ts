import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { ScoreModule } from './score/score.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CrawlerModule } from './crawler/crawler.module';
import { NotificationModule } from './notification/notification.module';
import { FavoriteModule } from './favorite/favorite.module';
import { HistoriesModule } from './histories/histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    MovieModule,
    ScoreModule,
    CommentModule,
    AuthModule,
    UserModule,
    CrawlerModule,
    NotificationModule,
    FavoriteModule,
    HistoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
