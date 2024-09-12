import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonInfo } from './entities/common.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommonInfo]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../../', 'public'),
        filename: (_, file, callback) => {
          const fileName = `${
            randomUUID() + new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
