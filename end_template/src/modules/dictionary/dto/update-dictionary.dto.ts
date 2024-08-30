import { PartialType } from '@nestjs/swagger';
import { CreateDictionaryDto } from './create-dictionary.dto';
import { StatusType } from '../entities/dictionary.entity';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {
  status?: StatusType;
}
