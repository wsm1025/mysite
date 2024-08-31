import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        // entities: [], // 数据表实体
        autoLoadEntities: true, // 自动加载数据表实体
        // entities: ['dist/**/*.entity{.ts,.js}'],
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', 'root'), // 密码
        database: configService.get('DB_DATABASE', 'test'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: configService.get('DB_SYNCHRONIZE', false), //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    AuthModule,
    UserModule,
    DictionaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
