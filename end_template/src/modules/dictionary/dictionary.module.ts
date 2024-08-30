import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { Dictionary as dictionaryEntity } from './entities/dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([dictionaryEntity])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
