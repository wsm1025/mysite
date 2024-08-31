import { PartialType } from '@nestjs/swagger';
import { CreateDictionaryDto } from './create-dictionary.dto';
import { ParentType, StatusType } from '../entities/dictionary.entity';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {
  status?: StatusType;
  dictionaryName?: string;
  dictionaryDesc?: string;
  parentId?: string;
  parentType?: ParentType;
  remark?: string;
}
