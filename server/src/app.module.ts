import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(__dirname, '../../.env'),
        path.resolve(__dirname, '../.env'),
        '.env',
      ],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri =
          configService.get<string>('MONGO_URL') ||
          configService.get<string>('MONGO_URI') ||
          configService.get<string>('MONGODB_URI') ||
          'mongodb://127.0.0.1:27017/BKA_PROTOTYPE';

        return {
          uri: mongoUri,
        };
      },
    }),

    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
