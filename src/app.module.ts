import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 5432,
      username: process.env.DATABASE_USER_NAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'restaurant_manage',
      entities: ['./dist/**/**.entity{.ts,.js}'],
      subscribers: ['./dist/**/**.subscriber{.ts,.js}'],
      synchronize: false,
      logging: true,
      migrationsRun: true,
      migrations: ['./dist/migrations/*.js'],
      cli: {
        migrationsDir: './migrations',
      },
    }),
    CategoryModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
