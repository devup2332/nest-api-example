import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSrv: ConfigService) => ({
        type: 'mysql',
        port: 3306,
        password: configSrv.get('DB_PASSWORD'),
        host: configSrv.get('DB_HOST'),
        username: configSrv.get('DB_USERNAME'),
        database: configSrv.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {},
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
